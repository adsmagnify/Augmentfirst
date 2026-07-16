let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Missing MS_TENANT_ID, MS_CLIENT_ID, or MS_CLIENT_SECRET environment variables."
    );
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Failed to get Microsoft Graph access token: ${detail}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

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
  const sender = process.env.MS_SENDER_EMAIL;
  if (!sender) {
    throw new Error("Missing MS_SENDER_EMAIL environment variable.");
  }

  const token = await getAccessToken();

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
  const sender = process.env.MS_SENDER_EMAIL;
  if (!sender) {
    throw new Error("Missing MS_SENDER_EMAIL environment variable.");
  }

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
