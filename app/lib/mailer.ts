import { getGraphAccessToken, getSenderMailbox } from "@/app/lib/graphAuth";

async function sendViaGraph({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const sender = getSenderMailbox();
  const token = await getGraphAccessToken();

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: to } }],
          ...(replyTo
            ? { replyTo: [{ emailAddress: { address: replyTo } }] }
            : {}),
        },
        saveToSentItems: true,
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Microsoft Graph sendMail failed (${res.status}): ${detail}`);
  }
}

// Internal notification to Vijay's mailbox about a new lead, with Reply-To
// set to the submitter so replying goes straight to them.
export async function sendLeadEmail({
  subject,
  replyTo,
  html,
}: {
  subject: string;
  replyTo?: string;
  html: string;
}) {
  const sender = getSenderMailbox();
  await sendViaGraph({ to: sender, subject, html, replyTo });
}

// Thank-you / confirmation email sent to the person who submitted the form.
export async function sendConfirmationEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await sendViaGraph({ to, subject, html });
}
