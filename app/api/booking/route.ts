import { NextResponse } from "next/server";
import { sendLeadEmail, sendConfirmationEmail } from "@/app/lib/mailer";
import { renderLeadEmail, renderMessageEmail } from "@/app/lib/emailTemplate";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fullName = String(data.fullName ?? "").trim();
    const email = String(data.email ?? "").trim();
    const requestedDate = String(data.requestedDate ?? "");
    const requestedTime = String(data.requestedTime ?? "");

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    const { html } = renderLeadEmail({
      heading: "New Strategy Call Booking",
      intro: `${fullName} booked a 30 minute strategy call via the AugmentFirst website.`,
      rows: [
        { label: "Full Name", value: fullName },
        { label: "Email", value: email },
        { label: "Company", value: String(data.company ?? "") },
        { label: "Requested Date", value: requestedDate },
        { label: "Requested Time", value: requestedTime },
      ],
    });

    await sendLeadEmail({
      subject: `New Strategy Call Booking — ${fullName}`,
      replyTo: email,
      html,
    });

    try {
      const { html: confirmationHtml } = renderMessageEmail({
        heading: `You're booked, ${fullName}`,
        paragraphs: [
          `Thank you for booking a 30 minute strategy call with Vijay Kanojia.`,
          `Requested slot: ${requestedDate} at ${requestedTime} (India Standard Time).`,
          `Augment First team will be in touch shortly to confirm this slot.`,
        ],
      });

      await sendConfirmationEmail({
        to: email,
        subject: "Your strategy call request with AugmentFirst",
        html: confirmationHtml,
      });
    } catch (err) {
      console.error("Failed to send booking confirmation email:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send booking email:", err);
    return NextResponse.json(
      { error: "Failed to send the request. Please try again shortly." },
      { status: 500 }
    );
  }
}
