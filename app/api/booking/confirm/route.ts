import { NextResponse } from "next/server";
import { processBookingConfirm } from "@/app/lib/confirmBooking";
import { getSiteUrl } from "@/app/lib/site";

/** Kept for older emails; prefer /booking/confirm in new messages. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const status = await processBookingConfirm(token);
  return NextResponse.redirect(
    `${getSiteUrl()}/booking/confirm-result?status=${status}`
  );
}
