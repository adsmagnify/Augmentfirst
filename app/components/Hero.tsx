export function Hero() {
  return (
    <section className="relative flex min-h-[min(100svh-64px,720px)] items-center justify-center overflow-hidden sm:min-h-[calc(100svh-72px)]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-glow absolute -top-24 left-1/2 h-[280px] w-[min(100vw,520px)] -translate-x-1/2 rounded-full bg-[var(--color-brass)]/15 blur-[90px] sm:h-[420px] sm:w-[720px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(100,130,180,0.08)] blur-[80px] sm:h-[380px] sm:w-[380px] sm:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(240,235,227,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 40%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[880px] px-4 py-12 text-center sm:px-6 sm:py-20">
        <h1 className="animate-rise font-serif text-[clamp(1.55rem,6.5vw,2.75rem)] font-medium leading-[1.22] text-[var(--color-ink)]">
          When your board asks for the numbers, can everyone in the room agree
          on them?
        </h1>

        <div className="animate-line mx-auto mt-6 h-px w-16 bg-[var(--color-brass)] sm:mt-8 sm:w-20" />

        <p className="animate-rise-delay-1 mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[var(--color-muted)] sm:mt-7 sm:text-[18px]">
          That silence is not a reporting problem. It is a trust problem, and
          it usually starts deeper than any dashboard can reach.
        </p>

        <div className="animate-rise-delay-2 mx-auto mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <a href="#assessment" className="btn-primary sm:min-w-[220px]">
            Request a Senior Assessment
          </a>
          <a href="#book-a-call" className="btn-secondary sm:min-w-[220px]">
            Book 30 minutes with Vijay
          </a>
        </div>
      </div>
    </section>
  );
}
