export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-84px)] items-center">
      <div className="relative mx-auto max-w-[920px] px-6 py-12 text-center">
        <h1 className="font-serif text-[42px] font-semibold leading-[1.18] text-[var(--color-ink)] sm:text-[54px] lg:text-[62px]">
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
