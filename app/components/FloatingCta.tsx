"use client";

import { useState } from "react";
import Image from "next/image";
import { BookingWidget } from "./BookingWidget";

export function FloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full border border-black/10 bg-white p-2 pr-5 text-left shadow-[0_12px_40px_-8px_rgba(0,0,0,0.28)] transition hover:border-[var(--color-brass)] hover:scale-[1.02] cursor-pointer"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-black/10">
            <Image
              src="/vijay1_avatar.png"
              alt="Vijay Kanojia"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-brass)]">
              Vijay Kanojia — Online
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-[#16233f]">
              Book Your Free Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
      )}

      {open && (
        <div className="w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] shadow-[0_20px_50px_rgba(0,0,0,0.65)] animate-slide-up sm:w-[460px]">
          <div className="relative flex items-center gap-3 border-b border-[var(--color-hairline)] p-4 pr-12">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10">
              <Image
                src="/vijay1_avatar.png"
                alt="Vijay Kanojia"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold leading-tight text-[var(--color-ink)]">
                Book Your Free Strategy Call
              </h2>
              <p className="mt-0.5 text-[11px] text-[var(--color-muted)]">
                Direct with Vijay — for data, risk, compliance, and audit leaders.
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Minimize booking window"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-muted)] transition hover:text-[var(--color-ink)] cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M18 12H6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="bg-[var(--color-bg)]/40 p-2">
            <BookingWidget className="border-0 bg-transparent p-4 shadow-none sm:p-5" />
          </div>
        </div>
      )}
    </div>
  );
}
