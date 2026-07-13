const STEPS = [
  {
    n: 1,
    title: "Discover",
    desc: "Find where trust breaks down",
    icon: "search",
  },
  {
    n: 2,
    title: "Design",
    desc: "Build a plan for your systems",
    icon: "doc",
  },
  {
    n: 3,
    title: "Deliver",
    desc: "Fix the root cause",
    icon: "gear",
  },
  {
    n: 4,
    title: "Drive Outcomes",
    desc: "One trusted number",
    icon: "check",
  },
];

function StepIcon({ name }: { name: string }) {
  const common = { stroke: "var(--color-ink)", strokeWidth: 1.7, fill: "none" as const };
  switch (name) {
    case "search":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
          <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6M9 8h3" strokeLinecap="round" />
        </svg>
      );
    case "gear":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path
            d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4M17.8 17.8l-1.4-1.4M7.6 7.6L6.2 6.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProcessSteps() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16">
      <h2 className="text-center font-serif text-[22px] font-semibold text-[var(--color-ink)] sm:text-[24px]">
        What happens when you work with us
      </h2>

      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex items-center gap-4 sm:contents">
            <div className="flex w-40 flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-panel)]">
                <span className="absolute -top-1.5 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-gold)] text-[12px] font-bold text-white">
                  {step.n}
                </span>
                <StepIcon name={step.icon} />
              </div>
              <div className="mt-3 font-serif text-[16px] font-semibold text-[var(--color-ink)]">
                {step.title}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-[var(--color-muted)]">
                {step.desc}
              </p>
            </div>

            {i < STEPS.length - 1 && (
              <span className="hidden shrink-0 pt-9 text-[var(--color-hairline)] sm:block">
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                  <path
                    d="M1 8h24M20 2l6 6-6 6"
                    stroke="var(--color-gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
