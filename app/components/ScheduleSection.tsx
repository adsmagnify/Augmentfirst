import { BookingWidget } from "./BookingWidget";

export function ScheduleSection() {
  return (
    <section id="book-a-call" className="mx-auto max-w-[1200px] px-6 py-16 scroll-mt-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <h2 className="font-serif text-[28px] font-semibold leading-tight text-[var(--color-ink)] sm:text-[32px]">
            Ready to find out what&apos;s actually broken?
          </h2>
          <div className="mt-5 h-[3px] w-14 bg-[var(--color-gold)]" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[var(--color-muted)]">
            For CDAOs, Data Directors, Risk, Compliance, and Audit leaders —
            thirty minutes, direct with Vijay.
          </p>
        </div>

        <BookingWidget className="shadow-[0_20px_45px_-28px_rgba(0,0,0,0.6)]" />
      </div>
    </section>
  );
}
