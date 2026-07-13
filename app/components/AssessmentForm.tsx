"use client";

import { useState, type FormEvent } from "react";

const SITUATIONS = [
  "We can't trace a figure back to its source",
  "Different teams report different numbers",
  "An audit or regulator flagged our data",
  "Staff spend too long manually reconciling data",
  "Something else",
];

const COMPANY_SIZES = [
  "Under 200 employees",
  "200–1,000 employees",
  "1,000–5,000 employees",
  "5,000+ employees",
];

const DRIVERS = [
  "Board or investor request",
  "Upcoming audit or regulatory review",
  "New risk or compliance requirement",
  "Ongoing operational pain",
  "Other",
];

export function AssessmentForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-10 text-center shadow-[0_20px_45px_-25px_rgba(0,0,0,0.6)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-[var(--color-ink)]">
          Request received
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Thanks — we&apos;ll be in touch shortly with your video and next
          steps.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-6 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.6)] sm:p-7"
          : "rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-7 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.6)] sm:p-9"
      }
    >
      <div className={compact ? "text-left" : "text-center"}>
        <h2
          className={
            compact
              ? "font-serif text-[20px] font-semibold leading-tight text-[var(--color-ink)]"
              : "font-serif text-[26px] font-semibold leading-tight text-[var(--color-ink)] sm:text-[28px]"
          }
        >
          Request Your Senior Data Assessment
        </h2>
        <div className={compact ? "mt-3 h-[3px] w-12 bg-[var(--color-gold)]" : "mx-auto mt-4 h-[3px] w-14 bg-[var(--color-gold)]"} />
      </div>

      <form className={compact ? "mt-6" : "mt-8"} onSubmit={handleSubmit}>
        <div
          className={
            compact
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          <div className={compact ? "grid grid-cols-2 gap-4" : "contents"}>
            <Field label="Full Name" htmlFor="fullName">
              <input id="fullName" name="fullName" type="text" required className="input" />
            </Field>
            <Field label="Work Email" htmlFor="workEmail">
              <input id="workEmail" name="workEmail" type="email" required className="input" />
            </Field>
          </div>
          <Field label="Company" htmlFor="company">
            <input id="company" name="company" type="text" required className="input" />
          </Field>
          <Field label="Job Title" htmlFor="jobTitle">
            <input id="jobTitle" name="jobTitle" type="text" required className="input" />
          </Field>

          <Field label="Which of these is closest to your situation?" htmlFor="situation">
            <select id="situation" name="situation" required defaultValue="" className="input">
              <option value="" disabled>
                Select an option
              </option>
              {SITUATIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Company size" htmlFor="companySize">
            <select id="companySize" name="companySize" required defaultValue="" className="input">
              <option value="" disabled>
                Select an option
              </option>
              {COMPANY_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What's driving this now?" htmlFor="driver">
            <select id="driver" name="driver" required defaultValue="" className="input">
              <option value="" disabled>
                Select an option
              </option>
              {DRIVERS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>

          <div className={compact ? "" : "flex flex-col justify-end gap-2"}>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-[var(--color-gold)] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[var(--color-gold-deep)] disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Watch the Video"}
            </button>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[var(--color-muted)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Your information is confidential. No spam.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink)]"
      >
        {label}
        <span className="text-[var(--color-gold)]">*</span>
      </label>
      {children}
    </div>
  );
}
