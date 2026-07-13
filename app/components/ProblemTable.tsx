const ROWS = [
  {
    icon: "stack",
    problem: "Data is missing, duplicated, or inconsistent",
    change: "By tracing the issue back to where it starts and fixing it there",
  },
  {
    icon: "search",
    problem: "A figure can't be traced back to its source for an audit or regulator",
    change: "By mapping the full lineage from source to report, the way a regulator expects",
  },
  {
    icon: "people",
    problem: "Different departments report different numbers",
    change: "By connecting every team to one shared source, so there's nothing left to disagree on",
  },
  {
    icon: "doc",
    problem: "Staff spend hours manually moving data into spreadsheets",
    change: "By removing the manual step at the source, not adding another tool on top of it",
  },
  {
    icon: "shield",
    problem: "Controls for risk management take too long to run",
    change: "By automating the control steps while keeping the audit trail intact",
  },
];

function RowIcon({ name }: { name: string }) {
  const common = { stroke: "var(--color-gold)", strokeWidth: 1.7, fill: "none" as const };
  switch (name) {
    case "stack":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" strokeLinecap="round" />
          <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
        </svg>
      );
    case "people":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
          <circle cx="8.5" cy="8" r="3" />
          <path d="M2.5 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M15.5 13.2c2.6.2 4.5 2.1 4.5 4.8" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
          <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6M9 8h3" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProblemTable() {
  return (
    <div>
      <h2 className="font-serif text-[20px] font-semibold text-[var(--color-ink)] sm:text-[22px]">
        Which of these is closest to what you&apos;re dealing with?
      </h2>

      <div className="mt-5 overflow-hidden rounded-xl border border-[var(--color-hairline)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[440px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-gold)] bg-[var(--color-panel-soft)] text-white">
                <th className="w-1/2 px-4 py-3 text-[12px] font-semibold">
                  The Problem
                </th>
                <th className="w-1/2 px-4 py-3 text-[12px] font-semibold">
                  How It Changes
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.problem}
                  className={i !== ROWS.length - 1 ? "border-b border-[var(--color-hairline)]" : ""}
                >
                  <td className="bg-[var(--color-bg)] px-4 py-3.5 align-top">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 [&_svg]:h-4 [&_svg]:w-4">
                        <RowIcon name={row.icon} />
                      </span>
                      <span className="text-[12.5px] leading-snug text-[var(--color-ink)]">
                        {row.problem}
                      </span>
                    </div>
                  </td>
                  <td className="bg-[var(--color-panel)] px-4 py-3.5 align-top text-[12.5px] font-medium leading-snug text-[var(--color-ink)]">
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-[var(--color-muted)]">
        Different starting points. Same senior-led approach: find the actual
        cause, fix it there, not on the surface.
      </p>

      <button className="mt-5 rounded-lg bg-[var(--color-gold)] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--color-gold-deep)]">
        See what&apos;s actually happening in your data
      </button>
    </div>
  );
}
