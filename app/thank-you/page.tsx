import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { PHONE_DISPLAY, PHONE_E164 } from "@/app/lib/contact";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "We've received your request. Call Vijay if you'd like to speak sooner.",
  robots: {
    index: false,
    follow: false,
  },
};

type ThankYouPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const from = params.from === "booking" ? "booking" : "assessment";

  const headline =
    from === "booking"
      ? "Your strategy call request is in."
      : "We've got your assessment request.";

  const supporting =
    from === "booking"
      ? "AugmentFirst will confirm your slot shortly. If you want to talk sooner, call Vijay directly."
      : "AugmentFirst will review what you shared and follow up with next steps. Prefer a quicker reply? Call Vijay.";

  return (
    <div className="page-atmosphere flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="w-full max-w-xl text-center animate-rise">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brass)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="#0a0c10"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brass)]">
            Thank you
          </p>
          <h1 className="mt-3 font-serif text-[clamp(1.7rem,4.5vw,2.4rem)] leading-tight text-[var(--color-ink)]">
            {headline}
          </h1>
          <div className="mx-auto mt-5 h-px w-14 bg-[var(--color-brass)]" />
          <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-[var(--color-muted)]">
            {supporting}
          </p>

          <div className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-3">
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-[var(--color-brass)] px-5 py-3.5 text-[15px] font-semibold text-[#0a0c10] transition hover:bg-[var(--color-brass-deep)]"
            >
              <PhoneIcon />
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/"
              className="pt-2 text-[14px] text-[var(--color-muted)] transition hover:text-[var(--color-brass)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20.5c0 .6-.4 1-1 1C10.6 21.5 2.5 13.4 2.5 3.5c0-.6.4-1 1-1H7.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
