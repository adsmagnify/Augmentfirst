/**
 * Shared Microsoft Graph helpers (mail + calendar).
 */

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function getGraphAccessToken(): Promise<string> {
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

export function getSenderMailbox() {
  const sender = process.env.MS_SENDER_EMAIL?.trim();
  if (!sender) {
    throw new Error("Missing MS_SENDER_EMAIL environment variable.");
  }
  return sender;
}
