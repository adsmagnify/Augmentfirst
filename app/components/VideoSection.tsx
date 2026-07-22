"use client";

import { useRef, useState } from "react";

const THUMBNAIL = "/Vijay_VSL_Thumbnail.png";
const VIDEO_SRC = "/vijay_video.mp4";

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
    if (videoRef.current?.ended) return;
    setPlaying(false);
  }

  function handleEnded() {
    setPlaying(false);
    const video = videoRef.current;
    if (video) video.currentTime = 0;
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
            src={VIDEO_SRC}
            poster={THUMBNAIL}
            playsInline
            preload="none"
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
              className="absolute inset-0 z-10 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMBNAIL}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
