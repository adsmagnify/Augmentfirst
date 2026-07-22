import { getGraphAccessToken, getSenderMailbox } from "@/app/lib/graphAuth";

const DURATION_MINUTES = 30;

/** Parse "10:00 AM" / "2:00 PM" into 24h hours + minutes. */
export function parseDisplayTime(time: string): { hours: number; minutes: number } {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }
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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Build local datetime string (no offset) for Graph Europe/London. */
export function buildSlotDateTimes(dateKey: string, time: string) {
  const { hours, minutes } = parseDisplayTime(time);
  const [y, m, d] = dateKey.split("-").map(Number);
  if (!y || !m || !d) throw new Error(`Invalid dateKey: ${dateKey}`);

  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + DURATION_MINUTES;
  const endH = Math.floor(endMinutes / 60);
  const endM = endMinutes % 60;

  return {
    start: `${y}-${pad(m)}-${pad(d)}T${pad(hours)}:${pad(minutes)}:00`,
    end: `${y}-${pad(m)}-${pad(d)}T${pad(endH)}:${pad(endM)}:00`,
    timeZone: "Europe/London",
  };
}

export type CreatedCalendarMeeting = {
  eventId: string;
  meetingUrl: string;
  webLink: string | null;
};

/**
 * Put a Zoom join link on the company Microsoft 365 calendar and invite the guest.
 * Requires Entra Application permission Calendars.ReadWrite (+ Mail.Send for mail).
 */
export async function createStrategyCallEvent(input: {
  fullName: string;
  email: string;
  company: string;
  dateKey: string;
  time: string;
  displayDate: string;
  meetingUrl: string;
}): Promise<CreatedCalendarMeeting> {
  const mailbox = getSenderMailbox();
  const token = await getGraphAccessToken();
  const { start, end, timeZone } = buildSlotDateTimes(input.dateKey, input.time);
  const meetingUrl = input.meetingUrl;

  const subject = `Strategy Call — ${input.fullName}${
    input.company ? ` (${input.company})` : ""
  }`;

  const bodyContent = `
    <p>30-minute strategy call booked via the AugmentFirst website.</p>
    <p><strong>Guest:</strong> ${escapeXml(input.fullName)} &lt;${escapeXml(input.email)}&gt;</p>
    <p><strong>Company:</strong> ${escapeXml(input.company || "—")}</p>
    <p><strong>Slot:</strong> ${escapeXml(input.displayDate)} at ${escapeXml(input.time)} (UK time)</p>
    <p><strong>Join Zoom:</strong> <a href="${escapeXml(meetingUrl)}">${escapeXml(meetingUrl)}</a></p>
  `;

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: `outlook.timezone="${timeZone}"`,
      },
      body: JSON.stringify({
        subject,
        body: {
          contentType: "HTML",
          content: bodyContent,
        },
        start: { dateTime: start, timeZone },
        end: { dateTime: end, timeZone },
        location: {
          displayName: "Zoom Meeting",
          locationUri: meetingUrl,
        },
        attendees: [
          {
            emailAddress: {
              address: input.email,
              name: input.fullName,
            },
            type: "required",
          },
        ],
        allowNewTimeProposals: false,
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Microsoft Graph create calendar event failed (${res.status}): ${detail}`
    );
  }

  const data = (await res.json()) as {
    id?: string;
    webLink?: string;
  };

  return {
    eventId: data.id ?? "",
    meetingUrl,
    webLink: data.webLink ?? null,
  };
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
