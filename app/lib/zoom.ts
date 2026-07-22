/**
 * Zoom Server-to-Server OAuth — creates a unique meeting per booking.
 *
 * Env:
 * - ZOOM_ACCOUNT_ID
 * - ZOOM_CLIENT_ID
 * - ZOOM_CLIENT_SECRET
 * - ZOOM_HOST_EMAIL (must be the Zoom login email on this account —
 *   often a personal Gmail, not necessarily the Microsoft 365 address)
 */

let cachedToken: { value: string; expiresAt: number } | null = null;

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Create a Zoom Server-to-Server OAuth app at marketplace.zoom.us and set the env vars.`
    );
  }
  return value;
}

export async function getZoomAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const accountId = requireEnv("ZOOM_ACCOUNT_ID");
  const clientId = requireEnv("ZOOM_CLIENT_ID");
  const clientSecret = requireEnv("ZOOM_CLIENT_SECRET");

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: accountId,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Zoom OAuth token failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Parse "10:00 AM" into 24h parts. */
function parseDisplayTime(time: string): { hours: number; minutes: number } {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) throw new Error(`Invalid time format: ${time}`);
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }
  return { hours, minutes };
}

function buildZoomStartLocal(dateKey: string, time: string) {
  const { hours, minutes } = parseDisplayTime(time);
  const [y, m, d] = dateKey.split("-").map(Number);
  if (!y || !m || !d) throw new Error(`Invalid dateKey: ${dateKey}`);
  return `${y}-${pad(m)}-${pad(d)}T${pad(hours)}:${pad(minutes)}:00`;
}

type ZoomUser = { id: string; email: string; status?: string };

async function listZoomUsers(token: string): Promise<ZoomUser[]> {
  const res = await fetch(
    "https://api.zoom.us/v2/users?status=active&page_size=30",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Zoom list users failed (${res.status}): ${detail}. ` +
        `Add scope user:read:list_users:admin (or user:read:admin), save, activate, restart dev server.`
    );
  }

  const data = (await res.json()) as {
    users?: { id?: string; email?: string; status?: string }[];
  };

  return (data.users ?? [])
    .filter((u): u is { id: string; email: string; status?: string } =>
      Boolean(u.id && u.email)
    )
    .map((u) => ({ id: u.id, email: u.email, status: u.status }));
}

/**
 * Resolve a Zoom user id to host meetings.
 * ZOOM_HOST_EMAIL must match a real Zoom user on this account
 * (check zoom.us profile — often not the Microsoft 365 address).
 */
async function resolveZoomHostId(token: string): Promise<{
  hostId: string;
  hostEmail: string;
}> {
  const configured = process.env.ZOOM_HOST_EMAIL?.trim() ?? "";
  const users = await listZoomUsers(token);

  if (!users.length) {
    throw new Error(
      "No active Zoom users found on this account. Sign into zoom.us with the account that owns the Server-to-Server app."
    );
  }

  if (configured) {
    const match = users.find(
      (u) => u.email.toLowerCase() === configured.toLowerCase()
    );
    if (match) {
      return { hostId: match.id, hostEmail: match.email };
    }

    const emails = users.map((u) => u.email).join(", ");
    throw new Error(
      `ZOOM_HOST_EMAIL="${configured}" is not a Zoom user on this account. ` +
        `Use the exact Zoom login email. Users on this account: ${emails}`
    );
  }

  // Default: first active user (typical for a free single-user Zoom account)
  return { hostId: users[0].id, hostEmail: users[0].email };
}

export type CreatedZoomMeeting = {
  meetingId: string;
  joinUrl: string;
  startUrl: string | null;
  password: string | null;
};

/**
 * Create a unique scheduled Zoom meeting for this booking slot.
 */
export async function createZoomMeeting(input: {
  fullName: string;
  email: string;
  company: string;
  dateKey: string;
  time: string;
  displayDate: string;
}): Promise<CreatedZoomMeeting> {
  const token = await getZoomAccessToken();
  const { hostId, hostEmail } = await resolveZoomHostId(token);
  const startTime = buildZoomStartLocal(input.dateKey, input.time);

  const topic = `Strategy Call — ${input.fullName}${
    input.company ? ` (${input.company})` : ""
  }`;

  const res = await fetch(
    `https://api.zoom.us/v2/users/${encodeURIComponent(hostId)}/meetings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        type: 2, // scheduled
        start_time: startTime,
        duration: 30,
        timezone: "Europe/London",
        agenda: `AugmentFirst strategy call with ${input.fullName} <${input.email}> on ${input.displayDate} at ${input.time} (UK). Host: ${hostEmail}.`,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          waiting_room: true,
          mute_upon_entry: true,
          approval_type: 2,
          audio: "voip",
        },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Zoom create meeting failed (${res.status}): ${detail}. ` +
        `Host resolved as ${hostEmail}. Check meeting write scopes and that the app is activated.`
    );
  }

  const data = (await res.json()) as {
    id?: number | string;
    join_url?: string;
    start_url?: string;
    password?: string;
  };

  if (!data.join_url) {
    throw new Error("Zoom meeting created but no join_url was returned.");
  }

  return {
    meetingId: String(data.id ?? ""),
    joinUrl: data.join_url,
    startUrl: data.start_url ?? null,
    password: data.password ?? null,
  };
}
