import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getBooking } from "@/app/lib/bookings";

export const metadata: Metadata = {
  title: "Booking confirmation",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ status?: string; id?: string }>;
};

const COPY: Record<
  string,
  { title: string; body: string; tone: "ok" | "warn" | "error" }
> = {
  confirmed: {
    title: "Slot confirmed",
    body: "The strategy call is confirmed. A confirmation email with a unique Zoom link has been sent to the requester, and the event is on the Microsoft 365 calendar.",
    tone: "ok",
  },
  already: {
    title: "Already confirmed",
    body: "This booking was already confirmed. Meeting details are shown below if available.",
    tone: "ok",
  },
  expired: {
    title: "Request expired",
    body: "This booking request was not confirmed within 48 hours, so the hold has expired and the slot is available again.",
    tone: "warn",
  },
  invalid: {
    title: "Invalid link",
    body: "This confirmation link is invalid or has expired. Ask the requester to submit again if needed.",
    tone: "error",
  },
  missing: {
    title: "Booking not found",
    body: "We could not find this booking. It may have been removed or the link is incorrect.",
    tone: "error",
  },
  error: {
    title: "Something went wrong",
    body: "We could not confirm this booking right now. Please try again in a moment.",
    tone: "error",
  },
};

export default async function BookingConfirmResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status && COPY[params.status] ? params.status : "error";
  const copy = COPY[status];

  const booking =
    params.id && (status === "confirmed" || status === "already")
      ? await getBooking(params.id)
      : null;

  const meetingUrl = booking?.meetingUrl ?? null;

  return (
    <div className="page-atmosphere flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-lg text-center animate-rise">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brass)]">
            Admin
          </p>
          <h1 className="mt-3 font-serif text-[clamp(1.6rem,4vw,2.2rem)] text-[var(--color-ink)]">
            {copy.title}
          </h1>
          <div className="mx-auto mt-5 h-px w-14 bg-[var(--color-brass)]" />
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
            {copy.body}
          </p>

          {booking && (
            <div className="mx-auto mt-8 max-w-md rounded-xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-5 text-left">
              <p className="text-[13px] text-[var(--color-muted)]">Guest</p>
              <p className="mt-1 text-[14px] text-[var(--color-ink)]">
                {booking.fullName}
                {booking.company ? ` · ${booking.company}` : ""}
              </p>
              <p className="mt-4 text-[13px] text-[var(--color-muted)]">Slot</p>
              <p className="mt-1 text-[14px] text-[var(--color-ink)]">
                {booking.displayDate} at {booking.time} (UK)
              </p>
              {meetingUrl && (
                <>
                  <p className="mt-4 text-[13px] text-[var(--color-muted)]">Zoom</p>
                  <a
                    href={meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#2D8CFF] px-4 py-3 text-[14px] font-semibold text-white transition hover:brightness-110"
                  >
                    Open Zoom meeting
                  </a>
                  <p className="mt-2 break-all text-[11px] text-[var(--color-muted)]">
                    {meetingUrl}
                  </p>
                </>
              )}
              {!meetingUrl && (status === "confirmed" || status === "already") && (
                <div className="mt-4 space-y-3 text-left text-[13px] leading-relaxed text-[var(--color-muted)]">
                  <p>
                    No Zoom link yet. On localhost, set Zoom vars in{" "}
                    <code className="text-[12px]">.env.local</code> (not Vercel),
                    add meeting write scopes on the Zoom app, activate it, restart{" "}
                    <code className="text-[12px]">npm run dev</code>, then open this
                    confirm link again.
                  </p>
                  <p>
                    Required:{" "}
                    <code className="text-[12px]">ZOOM_ACCOUNT_ID</code>,{" "}
                    <code className="text-[12px]">ZOOM_CLIENT_ID</code>,{" "}
                    <code className="text-[12px]">ZOOM_CLIENT_SECRET</code>,{" "}
                    <code className="text-[12px]">ZOOM_HOST_EMAIL</code>. Scopes:{" "}
                    <code className="text-[12px]">meeting:write:meeting</code> and{" "}
                    <code className="text-[12px]">meeting:write:meeting:admin</code>.
                  </p>
                  {booking.meetingSetupError && (
                    <p className="break-words rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-3 text-[12px] text-[var(--color-ink)]">
                      {booking.meetingSetupError}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <Link
            href="/"
            className="mt-10 inline-block text-[14px] text-[var(--color-muted)] transition hover:text-[var(--color-brass)]"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
