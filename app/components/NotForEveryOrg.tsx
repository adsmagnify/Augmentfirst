export function NotForEveryOrg() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h2 className="font-serif text-[clamp(1.4rem,3vw,1.85rem)] text-[var(--color-ink)]">
          This isn&apos;t for every organisation.
        </h2>
        <div className="mx-auto mt-4 h-px w-14 bg-[var(--color-brass)]/70" />
        <p className="mt-5 text-[15.5px] leading-relaxed text-[var(--color-muted)]">
         Built for financial services and regulated firms where a board, regulator,
          or investor is asking questions your data can't fully answer.
        </p>
      </div>
    </section>
  );
}
