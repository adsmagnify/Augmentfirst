import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";

export function isKvConfigured() {
  return Boolean(
    process.env.KV_REST_API_URL?.trim() && process.env.KV_REST_API_TOKEN?.trim()
  );
}

export const HOLD_MS = 48 * 60 * 60 * 1000; // 48 hours

export type BookingStatus = "pending" | "confirmed";

export type Booking = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  dateKey: string; // YYYY-MM-DD
  time: string; // e.g. "9:00 AM"
  displayDate: string;
  status: BookingStatus;
  createdAt: number;
  confirmedAt?: number;
};

export type UnavailableSlot = { dateKey: string; time: string };

function bookingKey(id: string) {
  return `booking:${id}`;
}

function slotKey(dateKey: string, time: string) {
  return `slot:${dateKey}:${time}`;
}

function indexKey() {
  return "bookings:index";
}

export function isHoldActive(booking: Booking, now = Date.now()) {
  if (booking.status === "confirmed") return true;
  if (booking.status === "pending") {
    return now - booking.createdAt < HOLD_MS;
  }
  return false;
}

export async function getBooking(id: string): Promise<Booking | null> {
  const data = await kv.get<Booking>(bookingKey(id));
  return data ?? null;
}

export async function isSlotAvailable(dateKey: string, time: string) {
  const id = await kv.get<string>(slotKey(dateKey, time));
  if (!id) return true;

  const booking = await getBooking(id);
  if (!booking) {
    await kv.del(slotKey(dateKey, time));
    return true;
  }

  if (isHoldActive(booking)) return false;

  // Stale pending hold — free the slot
  if (booking.status === "pending") {
    await kv.del(slotKey(dateKey, time));
  }
  return true;
}

export async function createPendingBooking(input: {
  fullName: string;
  email: string;
  company: string;
  dateKey: string;
  time: string;
  displayDate: string;
}): Promise<{ ok: true; booking: Booking } | { ok: false; error: string }> {
  const available = await isSlotAvailable(input.dateKey, input.time);
  if (!available) {
    return { ok: false, error: "That slot is no longer available. Please choose another time." };
  }

  const id = randomUUID();
  const booking: Booking = {
    id,
    fullName: input.fullName,
    email: input.email,
    company: input.company,
    dateKey: input.dateKey,
    time: input.time,
    displayDate: input.displayDate,
    status: "pending",
    createdAt: Date.now(),
  };

  // Atomic-ish: set slot only if not exists, then store booking
  const set = await kv.set(slotKey(input.dateKey, input.time), id, {
    nx: true,
    ex: Math.ceil(HOLD_MS / 1000) + 3600, // TTL slightly past hold window
  });

  if (set === null) {
    // Race: someone else took it
    return { ok: false, error: "That slot is no longer available. Please choose another time." };
  }

  await kv.set(bookingKey(id), booking);
  await kv.sadd(indexKey(), id);

  return { ok: true, booking };
}

export async function confirmBooking(id: string): Promise<
  | { ok: true; booking: Booking; alreadyConfirmed?: boolean }
  | { ok: false; error: string }
> {
  const booking = await getBooking(id);
  if (!booking) {
    return { ok: false, error: "Booking not found." };
  }

  if (booking.status === "confirmed") {
    return { ok: true, booking, alreadyConfirmed: true };
  }

  if (!isHoldActive(booking)) {
    return {
      ok: false,
      error: "This booking request has expired (not confirmed within 48 hours).",
    };
  }

  const confirmed: Booking = {
    ...booking,
    status: "confirmed",
    confirmedAt: Date.now(),
  };

  await kv.set(bookingKey(id), confirmed);
  // Keep slot key without short TTL so confirmed stays blocked
  await kv.set(slotKey(booking.dateKey, booking.time), id);

  return { ok: true, booking: confirmed };
}

export async function listUnavailableSlots(): Promise<UnavailableSlot[]> {
  const ids = (await kv.smembers(indexKey())) as string[];
  if (!ids?.length) return [];

  const unavailable: UnavailableSlot[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    const booking = await getBooking(id);
    if (!booking) {
      await kv.srem(indexKey(), id);
      continue;
    }

    if (!isHoldActive(booking)) {
      if (booking.status === "pending") {
        // Clean stale slot pointer if it still points here
        const current = await kv.get<string>(slotKey(booking.dateKey, booking.time));
        if (current === id) {
          await kv.del(slotKey(booking.dateKey, booking.time));
        }
      }
      continue;
    }

    const key = `${booking.dateKey}|${booking.time}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unavailable.push({ dateKey: booking.dateKey, time: booking.time });
  }

  return unavailable;
}
