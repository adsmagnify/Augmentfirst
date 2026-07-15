import { BookingWidget } from "./BookingWidget";

export function ScheduleSection() {
  return (
    <section id="book-a-call" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brass)]">
              Direct with Vijay
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3.5vw,2.35rem)] leading-tight text-[var(--color-ink)]">
              Ready to find out what&apos;s actually broken?
            </h2>
            <div className="mt-5 h-px w-14 bg-[var(--color-brass)]" />
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-[var(--color-muted)]">
              For CDAOs, Data Directors, Risk, Compliance, and Audit leaders —
              thirty focused minutes. No pitch deck theatre. Just a clear read
              on where trust is failing in your data foundation.
            </p>
            <p className="mt-5 text-[14px] text-[var(--color-ink)]/85">
              Vijay Kanojia — Founder &amp; Principal Consultant
              <br />
              <span className="text-[var(--color-muted)]">
                18+ years in financial services data transformation
              </span>
            </p>
          </div>

          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
