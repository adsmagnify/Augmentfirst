import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Booking confirmation",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

const COPY: Record<
  string,
  { title: string; body: string; tone: "ok" | "warn" | "error" }
> = {
  confirmed: {
    title: "Slot confirmed",
    body: "The strategy call is confirmed. A confirmation email has been sent to the requester.",
    tone: "ok",
  },
  already: {
    title: "Already confirmed",
    body: "This booking was already confirmed. No further action is needed.",
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
