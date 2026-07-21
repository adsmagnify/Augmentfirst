import { NextResponse } from "next/server";
import { listUnavailableSlots } from "@/app/lib/bookings";

export async function GET() {
  try {
    const slots = await listUnavailableSlots();
    return NextResponse.json(
      { slots },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("Failed to list unavailable slots:", err);
    // Fail open so the calendar still works if KV is misconfigured
    return NextResponse.json({ slots: [] });
  }
}
