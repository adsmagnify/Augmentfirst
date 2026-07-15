"use client";

import { Logo } from "./Logo";

const COMPANY_LINKS = ["Home", "About", "Services", "Industries", "How We Work"];
const TERMS_LINKS = ["Privacy Policy", "Contact"];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-black pt-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <h4 className="text-[15px] font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[14px] font-medium text-white transition hover:text-[var(--color-gold)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-white">Terms &amp; Policies</h4>
            <ul className="mt-4 space-y-3">
              {TERMS_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[14px] font-medium text-white transition hover:text-[var(--color-gold)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-white">Follow Us</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[14px] font-medium text-white transition hover:text-[var(--color-gold)]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-white">Contact Info</h4>
            <div className="mt-4 space-y-3 text-[14px] leading-snug text-[var(--color-muted)]">
              <p>
                128 City Road, London,
                <br />
                EC1V 2NX, United Kingdom
              </p>
              <a
                href="tel:+4407784419117"
                className="block font-semibold text-white transition hover:text-[var(--color-gold)]"
              >
                +44 07784419117
              </a>
              <a
                href="mailto:Vijay.Kanojia@augmentfirst.com"
                className="block transition hover:text-[var(--color-gold)]"
              >
                Vijay.Kanojia@augmentfirst.com
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-[var(--color-hairline)] pt-6 text-[12px] leading-relaxed text-[var(--color-muted)]">
          AugmentFirst provides independent consulting and advisory services.
          Information on this website is for general business purposes only
          and does not constitute legal, financial, tax, or regulatory
          advice. Results may vary depending on implementation and
          organisational factors.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 border-t border-[var(--color-hairline)] py-6 sm:flex-row sm:justify-between">
          <Logo />
          <p className="text-[13px] text-[var(--color-muted)]">
            ©2026 AugmentFirst. All rights reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-hairline)] text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
