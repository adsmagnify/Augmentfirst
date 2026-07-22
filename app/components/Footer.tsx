"use client";

import { Logo } from "./Logo";
import { PHONE_DISPLAY, PHONE_E164 } from "@/app/lib/contact";

const COMPANY_LINKS = [
  { label: "Assessment", href: "/#assessment" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "Book a call", href: "/#book-a-call" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[#06080e] pt-12 sm:pt-14">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded-md bg-white px-3 py-2">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[var(--color-muted)]">
              Senior-led data foundation work for banks, financial services,
              fintechs, and regulated firms. Fixing trust at the source
            </p>
            <a
              href="https://www.linkedin.com/in/vijay-kanojia-13823814/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#0A66C2] px-2.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#004182]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Vijay Kanojia on LinkedIn
            </a>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[14px] text-[var(--color-muted)] transition hover:text-[var(--color-brass)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">
              Contact
            </h4>
            <div className="mt-4 space-y-3 text-[14px] leading-snug text-[var(--color-muted)]">
              <p>
                128 City Road, London,
                <br />
                EC1V 2NX, United Kingdom
              </p>
              <a
                href={`tel:${PHONE_E164}`}
                className="block font-medium text-[var(--color-ink)] transition hover:text-[var(--color-brass)]"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:Vijay.Kanojia@augmentfirst.com"
                className="block break-all transition hover:text-[var(--color-brass)]"
              >
                Vijay.Kanojia@augmentfirst.com
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-[var(--color-hairline)] pt-6 text-[12px] leading-relaxed text-[var(--color-muted)]">
          AugmentFirst provides independent consulting and advisory services.
          Information on this website is for general business purposes only and
          does not constitute legal, financial, tax, or regulatory advice.
          Results may vary depending on implementation and organisational
          factors.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 border-t border-[var(--color-hairline)] py-6 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-[var(--color-muted)]">
            ©2026 AugmentFirst. All rights reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-ink)] transition hover:border-[var(--color-brass)] hover:text-[var(--color-brass)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
