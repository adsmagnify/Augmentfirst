"use client";

import { useMemo, useState } from "react";

const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday = 0 ... Sunday = 6
  const leadingBlanks = (first.getDay() + 6) % 7;

  const cells: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function ScheduleSection() {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const cells = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goToMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  }

  function isPast(date: Date) {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d < new Date(new Date().setHours(0, 0, 0, 0));
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
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

        <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.6)] sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h3 className="font-serif text-[17px] font-semibold text-[var(--color-ink)]">
              Select a Date &amp; Time
            </h3>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-[var(--color-muted)]">
              India Standard Time (IST)
              <svg width="10" height="10" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[1.35fr_1fr]">
            <div>
              <div className="flex items-center justify-between">
                <button
                  aria-label="Previous month"
                  onClick={() => goToMonth(-1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-panel-soft)]"
                >
                  ‹
                </button>
                <span className="text-[14px] font-semibold text-[var(--color-ink)]">
                  {monthLabel}
                </span>
                <button
                  aria-label="Next month"
                  onClick={() => goToMonth(1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-panel-soft)]"
                >
                  ›
                </button>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
                {DAY_LABELS.map((d) => (
                  <span key={d} className="text-[10.5px] font-semibold text-[var(--color-muted)]">
                    {d}
                  </span>
                ))}

                {cells.map((date, i) => {
                  if (!date) return <span key={i} />;
                  const disabled = isPast(date);
                  const selected = isSameDay(date, selectedDate);
                  return (
                    <button
                      key={i}
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      className={[
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition",
                        disabled
                          ? "cursor-not-allowed text-[var(--color-hairline)]"
                          : selected
                            ? "bg-[var(--color-gold)] font-semibold text-white"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-panel-soft)]",
                      ].join(" ")}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:border-l sm:border-[var(--color-hairline)] sm:pl-6">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={[
                    "rounded-lg border py-2.5 text-[13.5px] font-medium transition",
                    selectedTime === t
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                      : "border-[var(--color-hairline)] text-[var(--color-ink)] hover:border-[var(--color-gold)]",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && selectedTime && (
            <button className="mt-6 w-full rounded-lg bg-[var(--color-gold)] py-3 text-[14.5px] font-semibold text-white transition hover:opacity-90">
              Confirm {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
              at {selectedTime}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
