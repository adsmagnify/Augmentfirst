const ROWS = [
  {
    icon: "stack",
    problem: "Data is missing, duplicated, or inconsistent",
    change: "Trace the break to its source, fix the gaps and prevent adding another layer.",
  },
  {
    icon: "search",
    problem: "A figure can't be traced for an audit or regulator",
    change: "Map full lineage from source to report the way a regulator expects to see it.",
  },
  {
    icon: "people",
    problem: "Different departments report different numbers",
    change: "Connect every team to one shared source, so disagreement has nowhere to hide.",
  },
  {
    icon: "doc",
    problem: "Staff spend hours moving data into spreadsheets",
    change: "Remove the manual step at the source instead of adding another tool.",
  },
  {
    icon: "shield",
    problem: "Risk controls take too long to run",
    change: "Automate the control path while keeping the audit trail intact.",
  },
];

function RowIcon({ name }: { name: string }) {
  const common = { stroke: "var(--color-brass)", strokeWidth: 1.6, fill: "none" as const };
  switch (name) {
    case "stack":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...common} aria-hidden>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" strokeLinecap="round" />
          <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...common} aria-hidden>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.35-4.35" strokeLinecap="round" />
        </svg>
      );
    case "people":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...common} aria-hidden>
          <circle cx="8.5" cy="8" r="3" />
          <path d="M2.5 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M15.5 13.2c2.6.2 4.5 2.1 4.5 4.8" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6M9 8h3" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...common} aria-hidden>
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
      <h2 className="font-serif text-[clamp(1.45rem,3vw,1.9rem)] leading-snug text-[var(--color-ink)]">
        Which of these is closest to what you&apos;re dealing with?
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
        Recognition comes first. If one of these lands, you already know the
        conversation you need, not another vendor pitch.
      </p>

      <ul className="mt-8 space-y-0 border-t border-[var(--color-hairline)]">
        {ROWS.map((row) => (
          <li
            key={row.problem}
            className="group grid gap-2 border-b border-[var(--color-hairline)] py-5 transition sm:grid-cols-[1fr_1fr] sm:gap-8"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 opacity-80 transition group-hover:opacity-100">
                <RowIcon name={row.icon} />
              </span>
              <p className="text-[14.5px] font-medium leading-snug text-[var(--color-ink)] transition group-hover:text-[var(--color-brass)]">
                {row.problem}
              </p>
            </div>
            <p className="pl-8 text-[14px] leading-snug text-[var(--color-muted)] sm:pl-0">
              {row.change}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-[var(--color-muted)]">
        Different starting points. Same senior-led approach: find the actual
        cause, fix it there, not on the surface.
      </p>
    </div>
  );
}
