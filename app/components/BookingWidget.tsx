"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

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

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formattedDate = selectedDate?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          company,
          requestedDate: formattedDate,
          requestedTime: selectedTime,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      router.push("/thank-you?from=booking");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setError("Something went wrong sending your request. Please try again, or email Vijay directly.");
    }
  }

  if (showForm) {
    return (
      <div className={`border border-[var(--color-hairline)] bg-[var(--color-panel)] p-6 sm:p-7 rounded-2xl ${className}`}>
        <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-5">
          <button 
            type="button"
            onClick={() => setShowForm(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
            aria-label="Back to calendar"
          >
            ←
          </button>
          <div>
            <h3 className="font-serif text-[16px] text-white font-semibold">Confirm Call Details</h3>
            <p className="text-[12px] text-[var(--color-muted)] mt-0.5">
              {selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {selectedTime}
            </p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookingName" className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink)]">
              Full Name <span className="text-[var(--color-gold)]">*</span>
            </label>
            <input
              id="bookingName"
              type="text"
              required
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label htmlFor="bookingEmail" className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink)]">
              Work Email <span className="text-[var(--color-gold)]">*</span>
            </label>
            <input
              id="bookingEmail"
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@company.com"
            />
          </div>

          <div>
            <label htmlFor="bookingCompany" className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink)]">
              Company <span className="text-[var(--color-gold)]">*</span>
            </label>
            <input
              id="bookingCompany"
              type="text"
              required
              className="input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full mt-2 cursor-pointer font-semibold py-3"
          >
            {submitting ? "Booking..." : "Schedule Strategy Call"}
          </button>

          {error && (
            <p className="text-center text-[13px] text-red-400">{error}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div
      className={`border border-[var(--color-hairline)] bg-[var(--color-panel)] p-4 sm:p-7 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-serif text-[16px] text-[var(--color-ink)] sm:text-[17px]">
          Select a Date &amp; Time
        </h3>
        <span className="text-[12.5px] text-[var(--color-muted)]">
          UK Time (GMT/BST)
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-[1.35fr_1fr] sm:gap-6">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => goToMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-panel-soft)]"
            >
              ‹
            </button>
            <span className="text-[13px] font-semibold text-[var(--color-ink)] sm:text-[14px]">
              {monthLabel}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => goToMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-panel-soft)]"
            >
              ›
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-x-0.5 gap-y-1.5 text-center sm:gap-y-2">
            {DAY_LABELS.map((d) => (
              <span key={d} className="text-[10px] font-semibold text-[var(--color-muted)] sm:text-[10.5px]">
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
                  type="button"
                  key={i}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={[
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[12.5px] transition duration-200 sm:text-[13px]",
                    disabled
                      ? "cursor-not-allowed text-white/20"
                      : selected
                        ? "bg-[var(--color-brass)] font-semibold text-[#0a0c10] scale-105"
                        : isToday
                          ? "border border-[var(--color-brass)] text-[var(--color-brass)] font-medium"
                          : "text-[var(--color-ink)] hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex max-h-[200px] flex-col gap-2 overflow-y-auto custom-scrollbar sm:max-h-[240px] sm:border-l sm:border-white/10 sm:pl-6">
          {TIME_SLOTS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setSelectedTime(t)}
              className={[
                "rounded-xl border py-2.5 text-[13.5px] font-medium transition duration-200",
                selectedTime === t
                  ? "border-[var(--color-brass)] bg-[var(--color-brass)] text-[#0a0c10]"
                  : "border-white/10 bg-white/[0.02] text-[var(--color-ink)] hover:border-[var(--color-brass)] hover:bg-white/[0.05]",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="btn-primary mt-5 w-full cursor-pointer sm:mt-6"
        >
          Confirm {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
          at {selectedTime}
        </button>
      )}
    </div>
  );
}
