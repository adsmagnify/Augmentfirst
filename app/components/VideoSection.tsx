"use client";

import { useState } from "react";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 text-center">
      <h2 className="font-serif text-[24px] font-semibold text-[var(--color-ink)] sm:text-[28px]">
        How we actually approach this (90 seconds)
      </h2>

      <div
        className="relative mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] group"
        style={{
          background:
            "linear-gradient(135deg, #101013 0%, #030303 100%)",
        }}
      >
        {playing ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/80 animate-slide-up">
            <span className="text-sm">
              Drop your video file in and wire this player up to it.
            </span>
            <button
              onClick={() => setPlaying(false)}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Back to preview
            </button>
          </div>
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition duration-300 hover:bg-black/40"
          >
            {/* Pulsing Play Button */}
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition duration-300 group-hover:scale-105 group-hover:bg-white">
              <span className="absolute inset-0 rounded-full bg-[var(--color-gold)]/20 animate-ping opacity-75" />
              <svg className="ml-1.5 transition-transform duration-300 group-hover:scale-110" width="24" height="24" viewBox="0 0 24 24" fill="var(--color-gold)">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        {!playing && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/50 to-transparent px-5 py-4 text-left text-white/90">
            <span className="text-xs tabular-nums">0:00 / 1:30</span>
            <span className="ml-auto flex items-center gap-4 text-white/70">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 9v6h4l5 5V4L8 9H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 9h3l4-4v14l-4-4H4V9z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
