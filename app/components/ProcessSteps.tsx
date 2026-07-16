const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Find where trust actually breaks, before anyone suggests another tool.",
  },
  {
    n: "02",
    title: "Design",
    desc: "A plan shaped around your systems, controls, and the questions you must answer.",
  },
  {
    n: "03",
    title: "Deliver",
    desc: "Fix the root cause at the source, with lineage and accountability intact.",
  },
  {
    n: "04",
    title: "Drive Outcomes",
    desc: "One trusted number the board, audit, and operations can stand behind.",
  },
];

export function ProcessSteps() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-y border-[var(--color-hairline)] bg-[var(--color-panel)]/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[1000px] px-6">
        <h2 className="text-center font-serif text-[clamp(1.45rem,3vw,1.95rem)] text-[var(--color-ink)]">
          What happens when you work with us
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-[var(--color-muted)]">
          A senior-led path from uncertainty to a foundation you can defend.
        </p>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step) => (
            <li key={step.title} className="relative text-left sm:text-center lg:text-left">
              <span className="font-serif text-[2rem] leading-none text-[var(--color-brass)]/50">
                {step.n}
              </span>
              <h3 className="mt-3 font-serif text-[1.2rem] text-[var(--color-ink)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
