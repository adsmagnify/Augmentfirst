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

export function BookingWidget({ className = "" }: { className?: string }) {
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
    <div
      className={`rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-6 sm:p-7 ${className}`}
    >
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
              const isToday = isSameDay(date, today);
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={[
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition duration-200",
                    disabled
                      ? "cursor-not-allowed text-white/20"
                      : selected
                        ? "bg-gradient-to-br from-[var(--color-gold)] to-amber-500 font-semibold text-white shadow-[0_4px_12px_rgba(217,150,37,0.35)] scale-105"
                        : isToday
                          ? "border border-[var(--color-gold)] text-[var(--color-gold)] font-medium"
                          : "text-[var(--color-ink)] hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:border-l sm:border-white/10 sm:pl-6 max-h-[240px] overflow-y-auto custom-scrollbar">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={[
                "rounded-xl border py-2.5 text-[13.5px] font-medium transition duration-200",
                selectedTime === t
                  ? "border-[var(--color-gold)] bg-gradient-to-r from-[var(--color-gold)] to-amber-500 text-white shadow-[0_4px_12px_rgba(217,150,37,0.25)]"
                  : "border-white/10 bg-white/[0.02] text-[var(--color-ink)] hover:border-[var(--color-gold)] hover:bg-white/[0.05]",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--color-gold)] to-amber-500 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_15px_rgba(217,150,37,0.3)] transition duration-200 hover:shadow-[0_6px_20px_rgba(217,150,37,0.4)] hover:-translate-y-0.5 active:translate-y-0">
          Confirm {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
          at {selectedTime}
        </button>
      )}
    </div>
  );
}
