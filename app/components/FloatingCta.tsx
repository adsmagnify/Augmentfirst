"use client";

import { useState } from "react";
import Image from "next/image";
import { BookingWidget } from "./BookingWidget";

export function FloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex max-w-[calc(100vw-1.5rem)] items-center gap-2.5 rounded-full border border-black/10 bg-white p-1.5 pr-3 text-left shadow-[0_12px_40px_-8px_rgba(0,0,0,0.28)] transition hover:border-[var(--color-brass)] hover:scale-[1.02] cursor-pointer sm:gap-3 sm:p-2 sm:pr-5"
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-black/10 sm:h-10 sm:w-10">
            <Image
              src="/vijay1_avatar.png"
              alt="Vijay Kanojia"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-brass)] sm:text-[10px]">
              Vijay Kanojia · Online
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-[#16233f] sm:text-[13px]">
              <span className="truncate">Book Your Free Strategy Call</span>
              <svg
                className="hidden shrink-0 sm:block"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
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
        <div className="flex max-h-[min(92dvh,720px)] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] shadow-[0_20px_50px_rgba(0,0,0,0.65)] animate-slide-up sm:w-[420px]">
          <div className="relative flex shrink-0 items-center gap-3 border-b border-[var(--color-hairline)] p-3 pr-12 sm:p-4">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 sm:h-10 sm:w-10">
              <Image
                src="/vijay1_avatar.png"
                alt="Vijay Kanojia"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-[13px] font-semibold leading-tight text-[var(--color-ink)] sm:text-[14px]">
                Book Your Free Strategy Call
              </h2>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-[var(--color-muted)]">
                Direct with Vijay, for data, risk, compliance, and audit leaders.
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

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[var(--color-bg)]/40 p-2 custom-scrollbar">
            <BookingWidget className="border-0 bg-transparent p-3 shadow-none sm:p-5" />
          </div>
        </div>
      )}
    </div>
  );
}
