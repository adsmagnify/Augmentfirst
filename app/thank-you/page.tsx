import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getWhatsAppUrl } from "@/app/lib/contact";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "We've received your request. Message Vijay on WhatsApp if you'd like to speak sooner.",
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
      ? "AugmentFirst will confirm your slot shortly. If you want to talk sooner, message Vijay directly on WhatsApp."
      : "AugmentFirst will review what you shared and follow up with next steps. Prefer a quicker reply? Reach Vijay on WhatsApp.";

  const whatsappMessage =
    from === "booking"
      ? "Hi Vijay, I've just requested a strategy call on the AugmentFirst site and would like to connect."
      : "Hi Vijay, I've just submitted a Senior Data Assessment request on the AugmentFirst site and would like to connect.";

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
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-[#0a0c10] transition hover:brightness-95"
            >
              <WhatsAppIcon />
              Message on WhatsApp
            </a>
            <Link href="/" className="pt-2 text-[14px] text-[var(--color-muted)] transition hover:text-[var(--color-brass)]">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44zM12.07 21.15h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.89 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}
