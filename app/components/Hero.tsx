export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-84px)] items-center justify-center overflow-hidden py-12">
      {/* Premium Radial Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute top-1/4 h-[350px] w-[500px] rounded-full bg-[var(--color-gold)]/10 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 h-[250px] w-[250px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-[920px] px-6 py-12 text-center animate-slide-up">
        <h1 className="font-serif text-[42px] font-semibold leading-[1.18] text-[var(--color-gold)] sm:text-[54px] lg:text-[62px]">
          When your board asks for the numbers, can everyone in the room
          agree on them?
        </h1>

        <div className="mx-auto mt-8 h-[3px] w-16 bg-[var(--color-gold)]" />

        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-semibold text-[var(--color-ink)] sm:text-[20px]">
          Vijay Kanojia — Founder &amp; Principal Consultant,
          <br />
          18+ years in financial services data transformation
        </p>

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] sm:text-[18px]">
          A data foundation that was never built to be trusted.
          <br />
          AugmentFirst fixes it at the source — senior-led, not another
          dashboard.
        </p>
      </div>
    </section>
  );
}
