const VIDEO_SRC =
  process.env.NEXT_PUBLIC_VSL_VIDEO_URL?.trim() || "/vijay_video.mp4";

export function VideoSection() {
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
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
