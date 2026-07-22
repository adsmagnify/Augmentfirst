import {
  confirmBooking,
  updateBookingMeeting,
  type Booking,
} from "@/app/lib/bookings";
import { verifyConfirmToken } from "@/app/lib/bookingToken";
import { createStrategyCallEvent } from "@/app/lib/msCalendar";
import { createZoomMeeting } from "@/app/lib/zoom";
import { sendConfirmationEmail } from "@/app/lib/mailer";
import { renderMessageEmail } from "@/app/lib/emailTemplate";

export type ConfirmStatus =
  | "confirmed"
  | "already"
  | "expired"
  | "invalid"
  | "missing"
  | "error";

export type ConfirmResult = {
  status: ConfirmStatus;
  bookingId?: string;
  booking?: Booking;
};

/** Process an admin confirm token: Zoom link + M365 calendar + user email. */
export async function processBookingConfirm(
  token: string
): Promise<ConfirmResult> {
  const bookingId = verifyConfirmToken(token);
  if (!bookingId) return { status: "invalid" };

  try {
    const result = await confirmBooking(bookingId);

    if (!result.ok) {
      if (result.error.includes("expired")) {
        return { status: "expired", bookingId };
      }
      return { status: "missing", bookingId };
    }

    let booking = result.booking;
    const alreadyConfirmed = Boolean(result.alreadyConfirmed);
    let meetingUrl: string | null = booking.meetingUrl ?? null;
    let createdMeetingThisRun = false;

    try {
      if (!meetingUrl) {
        const zoom = await createZoomMeeting({
          fullName: booking.fullName,
          email: booking.email,
          company: booking.company,
          dateKey: booking.dateKey,
          time: booking.time,
          displayDate: booking.displayDate,
        });
        meetingUrl = zoom.joinUrl;
        createdMeetingThisRun = true;

        let calendarEventId = booking.calendarEventId ?? null;
        let setupError: string | null = null;

        if (!calendarEventId) {
          try {
            const cal = await createStrategyCallEvent({
              fullName: booking.fullName,
              email: booking.email,
              company: booking.company,
              dateKey: booking.dateKey,
              time: booking.time,
              displayDate: booking.displayDate,
              meetingUrl: zoom.joinUrl,
            });
            calendarEventId = cal.eventId || null;
          } catch (calErr) {
            setupError =
              calErr instanceof Error ? calErr.message : String(calErr);
            console.error("M365 calendar create failed (Zoom link kept):", calErr);
          }
        }

        const updated = await updateBookingMeeting(booking.id, {
          meetingUrl: zoom.joinUrl,
          calendarEventId,
          meetingSetupError: setupError,
        });
        if (updated) booking = updated;
      } else if (!booking.calendarEventId) {
        // Have Zoom link already; backfill calendar only
        try {
          const cal = await createStrategyCallEvent({
            fullName: booking.fullName,
            email: booking.email,
            company: booking.company,
            dateKey: booking.dateKey,
            time: booking.time,
            displayDate: booking.displayDate,
            meetingUrl,
          });
          const updated = await updateBookingMeeting(booking.id, {
            meetingUrl,
            calendarEventId: cal.eventId || null,
            meetingSetupError: null,
          });
          if (updated) booking = updated;
        } catch (calErr) {
          console.error("M365 calendar backfill failed:", calErr);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Failed to create Zoom meeting / calendar booking:", err);
      const updated = await updateBookingMeeting(booking.id, {
        meetingUrl: booking.meetingUrl ?? null,
        calendarEventId: booking.calendarEventId ?? null,
        meetingSetupError: message,
      });
      if (updated) booking = updated;
    }

    if (!alreadyConfirmed || (createdMeetingThisRun && meetingUrl)) {
      try {
        const paragraphs = [
          `Your 30 minute strategy call with Vijay Kanojia is confirmed.`,
          `Confirmed slot: ${booking.displayDate} at ${booking.time} (UK time, GMT/BST).`,
        ];

        if (meetingUrl) {
          paragraphs.push(
            `Join on Zoom using the button below. This slot is also on Vijay's calendar, and you should receive a calendar invite.`
          );
        } else {
          paragraphs.push(
            `If you do not see a meeting link yet, AugmentFirst will follow up shortly.`
          );
        }

        paragraphs.push(`Look forward to speaking with you.`);

        const { html } = renderMessageEmail({
          heading: `You're confirmed, ${booking.fullName}`,
          paragraphs,
          cta: meetingUrl
            ? { label: "Join Zoom meeting", url: meetingUrl }
            : undefined,
        });

        await sendConfirmationEmail({
          to: booking.email,
          subject: "Your strategy call is confirmed — AugmentFirst",
          html,
        });
      } catch (err) {
        console.error("Failed to send booking success email:", err);
      }
    }

    return {
      status: alreadyConfirmed ? "already" : "confirmed",
      bookingId,
      booking,
    };
  } catch (err) {
    console.error("Failed to confirm booking:", err);
    return { status: "error", bookingId };
  }
}
