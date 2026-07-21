import { confirmBooking } from "@/app/lib/bookings";
import { verifyConfirmToken } from "@/app/lib/bookingToken";
import { sendConfirmationEmail } from "@/app/lib/mailer";
import { renderMessageEmail } from "@/app/lib/emailTemplate";

export type ConfirmStatus =
  | "confirmed"
  | "already"
  | "expired"
  | "invalid"
  | "missing"
  | "error";

/** Process an admin confirm token and optionally email the requester. */
export async function processBookingConfirm(
  token: string
): Promise<ConfirmStatus> {
  const bookingId = verifyConfirmToken(token);
  if (!bookingId) return "invalid";

  try {
    const result = await confirmBooking(bookingId);

    if (!result.ok) {
      if (result.error.includes("expired")) return "expired";
      return "missing";
    }

    if (result.alreadyConfirmed) return "already";

    const { booking } = result;

    try {
      const { html } = renderMessageEmail({
        heading: `You're confirmed, ${booking.fullName}`,
        paragraphs: [
          `Your 30 minute strategy call with Vijay Kanojia is confirmed.`,
          `Confirmed slot: ${booking.displayDate} at ${booking.time} (UK time, GMT/BST).`,
          `We'll be in touch if anything else is needed ahead of the call. Looking forward to speaking with you.`,
        ],
      });

      await sendConfirmationEmail({
        to: booking.email,
        subject: "Your strategy call is confirmed — AugmentFirst",
        html,
      });
    } catch (err) {
      console.error("Failed to send booking success email:", err);
    }

    return "confirmed";
  } catch (err) {
    console.error("Failed to confirm booking:", err);
    return "error";
  }
}
