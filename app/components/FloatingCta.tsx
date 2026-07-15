"use client";

import { useState } from "react";
import Image from "next/image";
import { BookingWidget } from "./BookingWidget";

export function FloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Minimized Pill Badge */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full border border-black/10 bg-white p-2 pr-5 text-left text-[#16233f] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:border-[var(--color-gold)] hover:bg-slate-50 group cursor-pointer"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-black/15">
            <Image
              src="/vijay1_avatar.png"
              alt="Vijay Kanojia"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
              Vijay Kanojia — Online
            </div>
            <div className="text-[13px] font-semibold text-slate-800 group-hover:text-[#16233f] flex items-center gap-1.5">
              Book Your 30 Minute Strategy Call
              <svg
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
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

      {/* Expanded CTA Window */}
      {open && (
        <div className="w-[calc(100vw-32px)] sm:w-[460px] rounded-2xl border border-white/10 bg-[#0d0d0f]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-lg overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="relative border-b border-white/5 bg-white/[0.02] p-4 pr-12 flex items-center gap-3">
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
              <h2 className="text-[14px] font-bold text-white leading-tight">
                Book Your 30 Minute Strategy Call
              </h2>
              <p className="text-[11px] text-[var(--color-muted)] font-medium mt-0.5">
                For CDAOs, Data Directors, Risk, Compliance, and Audit leaders — direct with Vijay.
              </p>
            </div>

            {/* Minimize / Close Button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Minimize booking window"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition duration-200 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 12H6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Booking Widget Wrapper */}
          <div className="p-2 bg-black/40">
            <BookingWidget className="border-0 bg-transparent p-4 sm:p-5 shadow-none" />
          </div>
        </div>
      )}
    </div>
  );
}
