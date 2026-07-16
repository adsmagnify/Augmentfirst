export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-glow absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--color-brass)]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[rgba(100,130,180,0.08)] blur-[100px]" />
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

      <div className="relative mx-auto max-w-[880px] px-6 py-16 text-center sm:py-20">
        <h1 className="animate-rise font-serif text-[clamp(1.75rem,4.4vw,2.75rem)] font-medium leading-[1.22] text-[var(--color-ink)]">
          When your board asks for the numbers, can everyone in the room agree
          on them?
        </h1>

        <div className="animate-line mx-auto mt-8 h-px w-20 bg-[var(--color-brass)]" />

        <p className="animate-rise-delay-1 mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] sm:text-[18px]">
          That silence is not a reporting problem. It is a trust problem, and
          it usually starts deeper than any dashboard can reach.
        </p>

        <div className="animate-rise-delay-2 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#assessment" className="btn-primary min-w-[220px]">
            Request a Senior Assessment
          </a>
          <a href="#book-a-call" className="btn-secondary min-w-[220px]">
            Book 30 minutes with Vijay
          </a>
        </div>
      </div>
    </section>
  );
}
