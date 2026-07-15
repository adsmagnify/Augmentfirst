export function PainSection() {
  return (
    <section className="relative border-y border-[var(--color-hairline)] bg-[var(--color-panel)]/40 py-16 sm:py-20">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.15rem)] leading-snug text-[var(--color-ink)]">
          You already know this feeling.
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-brass)]/70" />
        <p className="mt-7 text-[16px] leading-[1.75] text-[var(--color-muted)] sm:text-[17px]">
          Finance has one figure. Risk has another. Operations has a third. The
          audit trail goes cold somewhere between a spreadsheet and a source
          system. Staff stay late reconciling what should have been trusted in
          the first place — while the next board pack, regulator ask, or
          investor diligence sits on the calendar.
        </p>
        <p className="mt-5 text-[16px] leading-[1.75] text-[var(--color-ink)]/90 sm:text-[17px]">
          The cost is not just inefficiency. It is the quiet erosion of
          confidence — in your numbers, your controls, and the room you walk
          into.
        </p>
      </div>
    </section>
  );
}
