import { NextResponse } from "next/server";
import { sendLeadEmail, sendConfirmationEmail } from "@/app/lib/mailer";
import { renderLeadEmail, renderMessageEmail } from "@/app/lib/emailTemplate";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fullName = String(data.fullName ?? "").trim();
    const workEmail = String(data.workEmail ?? "").trim();

    if (!fullName || !workEmail) {
      return NextResponse.json(
        { error: "Full name and work email are required." },
        { status: 400 }
      );
    }

    const { html } = renderLeadEmail({
      heading: "New Senior Data Assessment Request",
      intro: `${fullName} requested a senior data assessment via the AugmentFirst website.`,
      rows: [
        { label: "Full Name", value: fullName },
        { label: "Work Email", value: workEmail },
        { label: "Company", value: String(data.company ?? "") },
        { label: "Job Title", value: String(data.jobTitle ?? "") },
        { label: "Situation", value: String(data.situation ?? "") },
        { label: "Company Size", value: String(data.companySize ?? "") },
        { label: "Driver", value: String(data.driver ?? "") },
      ],
    });

    await sendLeadEmail({
      subject: `New Senior Data Assessment Request: ${fullName}`,
      replyTo: workEmail,
      html,
    });

    try {
      const { html: confirmationHtml } = renderMessageEmail({
        heading: `Thanks, ${fullName}. We've got your request`,
        paragraphs: [
          `Thank you for requesting a Senior Data Assessment from AugmentFirst.`,
          `Augment First team will review what you've shared and be in touch shortly with next steps.`,
        ],
      });

      await sendConfirmationEmail({
        to: workEmail,
        subject: "We've received your Senior Data Assessment request",
        html: confirmationHtml,
      });
    } catch (err) {
      console.error("Failed to send assessment confirmation email:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send assessment email:", err);
    return NextResponse.json(
      { error: "Failed to send the request. Please try again shortly." },
      { status: 500 }
    );
  }
}
