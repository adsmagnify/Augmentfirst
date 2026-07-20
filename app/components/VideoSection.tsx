"use client";

import { useRef, useState } from "react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    try {
      setPlaying(true);
      await video.play();
    } catch {
      setPlaying(false);
    }
  }

  function handlePause() {
    setPlaying(false);
  }

  function handleEnded() {
    setPlaying(false);
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
        <h2 className="font-serif text-[clamp(1.45rem,3vw,1.95rem)] text-[var(--color-ink)]">
          How we actually approach this
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-[var(--color-muted)]">
          Ninety seconds on fixing trust at the source, not decorating the
          symptoms.
        </p>

        <div className="relative mx-auto mt-10 aspect-video w-full overflow-hidden border border-[var(--color-hairline)] bg-[#0a0c10]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/vijay_video.mp4"
            playsInline
            preload="metadata"
            controls={playing}
            onPause={handlePause}
            onEnded={handleEnded}
            onPlay={() => setPlaying(true)}
          />

          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/25 to-black/20 transition hover:from-black/60 hover:via-black/35 hover:to-black/25 cursor-pointer"
            >
              <span className="relative block h-[72px] w-[72px] transition duration-300 hover:scale-105 sm:h-20 sm:w-20">
                <span className="absolute inset-[-10%] rounded-full bg-[var(--color-brass)]/25 blur-lg animate-pulse-gentle" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/play-button.svg"
                  alt=""
                  width={160}
                  height={160}
                  className="relative h-full w-full object-contain"
                  draggable={false}
                />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
