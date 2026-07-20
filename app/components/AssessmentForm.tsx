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
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setError("Something went wrong sending your request. Please try again, or email Vijay directly.");
    }
  }

  if (submitted) {
    return (
      <div className="border border-[var(--color-hairline)] bg-[var(--color-panel)] p-8 text-center sm:p-10">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brass)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="#0a0c10"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-[var(--color-ink)]">
          We&apos;ve got your request
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Augment First team will be in touch shortly with next steps for your
          senior data assessment.
        </p>
      </div>
    );
  }

  return (
    <div
      id="assessment-form"
      className={
        compact
          ? "border border-[var(--color-hairline)] bg-[var(--color-panel)] p-4 sm:p-7"
          : "border border-[var(--color-hairline)] bg-[var(--color-panel)] p-5 sm:p-9"
      }
    >
      <div className="text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brass)]">
          Lead with clarity
        </p>
        <h2
          className={
            compact
              ? "mt-2 font-serif text-[20px] leading-tight text-[var(--color-ink)] sm:text-[22px]"
              : "mt-2 font-serif text-[24px] leading-tight text-[var(--color-ink)] sm:text-[28px]"
          }
        >
          Request your Senior Data Assessment
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
          Thirty minutes of senior attention on what&apos;s actually broken,
          before you buy another tool.
        </p>
        <div className="mt-4 h-px w-12 bg-[var(--color-brass)]" />
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="fullName">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                className="input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Work Email" htmlFor="workEmail">
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                required
                autoComplete="email"
                className="input"
                placeholder="you@company.com"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Company" htmlFor="company">
              <input
                id="company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                className="input"
              />
            </Field>
            <Field label="Job Title" htmlFor="jobTitle">
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                autoComplete="organization-title"
                className="input"
              />
            </Field>
          </div>

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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Company size" htmlFor="companySize">
              <select
                id="companySize"
                name="companySize"
                required
                defaultValue=""
                className="input"
              >
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
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-1 w-full disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Request My Assessment"}
          </button>

          {error && (
            <p className="text-center text-[13px] text-red-400">{error}</p>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--color-muted)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect
              x="5"
              y="11"
              width="14"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Confidential. No spam. Built for regulated firms.
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
        <span className="text-[var(--color-brass)]">*</span>
      </label>
      {children}
    </div>
  );
}
