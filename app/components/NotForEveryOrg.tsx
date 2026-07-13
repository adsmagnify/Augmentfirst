export function NotForEveryOrg() {
  return (
    <section className="mx-auto max-w-[1200px] px-6">
      <div className="flex flex-col items-start gap-5 rounded-2xl bg-[var(--color-panel)] p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
        <div className="flex shrink-0 items-center gap-5 sm:gap-8">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M12 3l9 5H3z"
              stroke="var(--color-gold)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M3 21h18" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="hidden h-16 w-[3px] shrink-0 bg-[var(--color-gold)] sm:block" />
        </div>

        <div>
          <h3 className="font-serif text-[20px] font-semibold text-[var(--color-ink)] sm:text-[22px]">
            This isn&apos;t for every organisation.
          </h3>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[var(--color-muted)]">
            Built for banks, fintechs, and regulated firms where a board,
            regulator, or investor is asking questions your data can&apos;t
            fully answer.
          </p>
        </div>
      </div>
    </section>
  );
}
