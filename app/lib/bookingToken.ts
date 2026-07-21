import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function getSecret() {
  const secret = process.env.BOOKING_CONFIRM_SECRET?.trim();
  if (!secret) {
    throw new Error("Missing BOOKING_CONFIRM_SECRET environment variable.");
  }
  return secret;
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Create a signed confirm token for a booking id (valid 48h). */
export function createConfirmToken(bookingId: string) {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${bookingId}.${exp}`;
  const sig = signPayload(payload);
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

/** Verify token; returns bookingId or null if invalid/expired. */
export function verifyConfirmToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(".");
    if (parts.length !== 3) return null;

    const [bookingId, expStr, sig] = parts;
    const exp = Number(expStr);
    if (!bookingId || !sig || !Number.isFinite(exp)) return null;
    if (Date.now() > exp) return null;

    const payload = `${bookingId}.${expStr}`;
    const expected = signPayload(payload);

    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    return bookingId;
  } catch {
    return null;
  }
}
