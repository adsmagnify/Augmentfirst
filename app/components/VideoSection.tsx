"use client";

import { useState } from "react";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <h2 className="font-serif text-[clamp(1.45rem,3vw,1.95rem)] text-[var(--color-ink)]">
          How we actually approach this
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-[var(--color-muted)]">
          Ninety seconds on fixing trust at the source, not decorating the
          symptoms.
        </p>

        <div
          className="relative mx-auto mt-10 aspect-video w-full overflow-hidden border border-[var(--color-hairline)]"
          style={{
            background:
              "linear-gradient(145deg, #151b26 0%, #080b12 55%, #121018 100%)",
          }}
        >
          {playing ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--color-muted)] animate-slide-up">
              <span className="text-sm">
                Drop your video file in and wire this player up to it.
              </span>
              <button
                onClick={() => setPlaying(false)}
                className="btn-secondary !py-2 !px-4 text-sm"
              >
                Back to preview
              </button>
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/35"
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ink)] text-[#0a0c10] shadow-lg transition hover:scale-105">
                <span className="absolute inset-0 rounded-full bg-[var(--color-brass)]/25 animate-pulse-gentle" />
                <svg
                  className="relative ml-1"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
