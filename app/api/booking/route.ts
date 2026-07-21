import { NextResponse } from "next/server";
import { createPendingBooking, isKvConfigured } from "@/app/lib/bookings";
import { createConfirmToken } from "@/app/lib/bookingToken";
import { sendLeadEmail, sendConfirmationEmail } from "@/app/lib/mailer";
import { renderLeadEmail, renderMessageEmail } from "@/app/lib/emailTemplate";
import { getSiteUrl } from "@/app/lib/site";

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fullName = String(data.fullName ?? "").trim();
    const email = String(data.email ?? "").trim();
    const company = String(data.company ?? "").trim();
    const dateKey = String(data.dateKey ?? "").trim();
    const time = String(data.requestedTime ?? data.time ?? "").trim();
    const displayDate = String(data.requestedDate ?? "").trim();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    if (!dateKey || !DATE_KEY_RE.test(dateKey) || !time) {
      return NextResponse.json(
        { error: "A valid date and time slot are required." },
        { status: 400 }
      );
    }

    if (!isKvConfigured()) {
      return NextResponse.json(
        {
          error:
            "Booking storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN (Upstash Redis) to your environment.",
        },
        { status: 503 }
      );
    }

    if (!process.env.BOOKING_CONFIRM_SECRET?.trim()) {
      return NextResponse.json(
        {
          error:
            "Booking confirm secret is missing. Add BOOKING_CONFIRM_SECRET to your environment.",
        },
        { status: 503 }
      );
    }

    const created = await createPendingBooking({
      fullName,
      email,
      company,
      dateKey,
      time,
      displayDate: displayDate || dateKey,
    });

    if (!created.ok) {
      return NextResponse.json({ error: created.error }, { status: 409 });
    }

    const { booking } = created;
    const token = createConfirmToken(booking.id);
    const confirmUrl = `${getSiteUrl()}/booking/confirm?token=${encodeURIComponent(token)}`;

    const { html: adminHtml } = renderLeadEmail({
      heading: "New Strategy Call Request",
      intro: `${fullName} requested a 30 minute strategy call. Click the button below to confirm the slot. Until then the slot is held for 48 hours.`,
      rows: [
        { label: "Full Name", value: fullName },
        { label: "Email", value: email },
        { label: "Company", value: company },
        { label: "Requested Date", value: booking.displayDate },
        { label: "Requested Time", value: `${time} (UK time)` },
        { label: "Date key", value: dateKey },
      ],
      cta: {
        label: "Confirm this slot",
        url: confirmUrl,
      },
    });

    await sendLeadEmail({
      subject: `New Strategy Call Booking: ${fullName}`,
      replyTo: email,
      html: adminHtml,
    });

    try {
      const { html: receiptHtml } = renderMessageEmail({
        heading: `We've received your request, ${fullName}`,
        paragraphs: [
          `Thank you for requesting a 30 minute strategy call with Vijay Kanojia.`,
          `Requested slot: ${booking.displayDate} at ${time} (UK time, GMT/BST).`,
          `This slot is temporarily held while we review your request. You will receive a confirmation email once the slot is approved.`,
          `If the slot cannot be confirmed within 48 hours, it will be released and you can request another time.`,
        ],
      });

      await sendConfirmationEmail({
        to: email,
        subject: "We've received your strategy call request",
        html: receiptHtml,
      });
    } catch (err) {
      console.error("Failed to send booking receipt email:", err);
    }

    return NextResponse.json({ ok: true, bookingId: booking.id });
  } catch (err) {
    console.error("Failed to process booking request:", err);

    const message = err instanceof Error ? err.message : String(err);
    let error = "Failed to send the request. Please try again shortly.";

    if (
      /KV_REST_API|UPSTASH|@vercel\/kv|ERRMAXMEMORY|WRONGPASS|Unauthorized|401|ENOTFOUND|fetch failed/i.test(
        message
      )
    ) {
      error =
        "Booking storage failed. Check KV_REST_API_URL and KV_REST_API_TOKEN (Upstash Redis).";
    } else if (/BOOKING_CONFIRM_SECRET/i.test(message)) {
      error =
        "Booking confirm secret is missing. Add BOOKING_CONFIRM_SECRET to your environment.";
    } else if (
      /MS_TENANT_ID|MS_CLIENT_ID|MS_CLIENT_SECRET|MS_SENDER_EMAIL|Microsoft Graph|AADSTS|invalid_client|sendMail/i.test(
        message
      )
    ) {
      error =
        "Email sending failed. Check Microsoft Graph credentials (MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER_EMAIL).";
    }

    return NextResponse.json(
      {
        error,
        details: message,
      },
      { status: 500 }
    );
  }
}
