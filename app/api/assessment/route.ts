import { NextResponse } from "next/server";
import { sendLeadEmail, sendConfirmationEmail } from "@/app/lib/mailer";
import { renderLeadEmail, renderMessageEmail } from "@/app/lib/emailTemplate";
import {
  firstAssessmentError,
  normalizeAssessmentInput,
  validateAssessment,
} from "@/app/lib/assessmentValidation";

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const data = normalizeAssessmentInput(raw as Record<string, unknown>);
    const fieldErrors = validateAssessment(data);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: firstAssessmentError(fieldErrors) ?? "Invalid form data.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const { html } = renderLeadEmail({
      heading: "New Senior Data Assessment Request",
      intro: `${data.fullName} requested a senior data assessment via the AugmentFirst website.`,
      rows: [
        { label: "Full Name", value: data.fullName },
        { label: "Work Email", value: data.workEmail },
        { label: "Phone", value: data.phone || "—" },
        { label: "Company", value: data.company },
        { label: "Job Title", value: data.jobTitle },
        { label: "Situation", value: data.situation },
        { label: "Company Size", value: data.companySize },
        { label: "Driver", value: data.driver },
      ],
    });

    await sendLeadEmail({
      subject: `New Senior Data Assessment Request: ${data.fullName}`,
      replyTo: data.workEmail,
      html,
    });

    try {
      const { html: confirmationHtml } = renderMessageEmail({
        heading: `Thanks, ${data.fullName}. We've got your request`,
        paragraphs: [
          `Thank you for requesting a Senior Data Assessment from AugmentFirst.`,
          `Augment First team will review what you've shared and be in touch shortly with next steps.`,
        ],
      });

      await sendConfirmationEmail({
        to: data.workEmail,
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
