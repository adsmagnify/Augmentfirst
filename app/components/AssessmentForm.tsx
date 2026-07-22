"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ASSESSMENT_COMPANY_SIZES,
  ASSESSMENT_DRIVERS,
  ASSESSMENT_SITUATIONS,
  firstAssessmentError,
  normalizeAssessmentInput,
  validateAssessment,
  type AssessmentFieldErrors,
} from "@/app/lib/assessmentValidation";

export function AssessmentForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AssessmentFieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = normalizeAssessmentInput(
      Object.fromEntries(formData.entries()) as Record<string, unknown>
    );
    const errors = validateAssessment(data);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      setError(firstAssessmentError(errors));
      return;
    }

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: AssessmentFieldErrors;
      };

      if (!res.ok) {
        if (body.fieldErrors) setFieldErrors(body.fieldErrors);
        throw new Error(body.error || "Request failed");
      }

      router.push("/thank-you?from=assessment");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setError(
        err instanceof Error && err.message && err.message !== "Request failed"
          ? err.message
          : "Something went wrong sending your request. Please try again, or email Vijay directly."
      );
    }
  }

  function clearFieldError(name: keyof AssessmentFieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
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

      <form className="mt-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              htmlFor="fullName"
              error={fieldErrors.fullName}
            >
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                maxLength={80}
                pattern="[A-Za-z][A-Za-z .'\-]{1,78}"
                title="Letters, spaces, hyphens, or apostrophes"
                className={inputClass(fieldErrors.fullName)}
                placeholder="Your name"
                onChange={() => clearFieldError("fullName")}
              />
            </Field>
            <Field
              label="Work Email"
              htmlFor="workEmail"
              error={fieldErrors.workEmail}
            >
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                pattern="[A-Za-z][A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+"
                title="Email must start with a letter and cannot be only numbers"
                className={inputClass(fieldErrors.workEmail)}
                placeholder="you@company.com"
                onChange={() => clearFieldError("workEmail")}
              />
            </Field>
          </div>

          <Field label="Phone Number" htmlFor="phone" required={false} error={fieldErrors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={25}
              inputMode="tel"
              pattern="\+?[\d\s().\-]{7,25}"
              title="7–15 digits; spaces or + allowed"
              className={inputClass(fieldErrors.phone)}
              placeholder="+44 7784 419 117"
              onChange={() => clearFieldError("phone")}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Company" htmlFor="company" error={fieldErrors.company}>
              <input
                id="company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                maxLength={120}
                pattern="[A-Za-z0-9][A-Za-z0-9 .,&'\-/()]{1,118}"
                title="Enter a valid company name"
                className={inputClass(fieldErrors.company)}
                onChange={() => clearFieldError("company")}
              />
            </Field>
            <Field
              label="Job Title"
              htmlFor="jobTitle"
              error={fieldErrors.jobTitle}
            >
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                autoComplete="organization-title"
                maxLength={100}
                pattern="[A-Za-z][A-Za-z0-9 .,&'\-/()]{1,98}"
                title="Enter a valid job title"
                className={inputClass(fieldErrors.jobTitle)}
                onChange={() => clearFieldError("jobTitle")}
              />
            </Field>
          </div>

          <Field
            label="Which of these is closest to your situation?"
            htmlFor="situation"
            error={fieldErrors.situation}
          >
            <select
              id="situation"
              name="situation"
              required
              defaultValue=""
              className={inputClass(fieldErrors.situation)}
              onChange={() => clearFieldError("situation")}
            >
              <option value="" disabled>
                Select an option
              </option>
              {ASSESSMENT_SITUATIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Company size"
              htmlFor="companySize"
              error={fieldErrors.companySize}
            >
              <select
                id="companySize"
                name="companySize"
                required
                defaultValue=""
                className={inputClass(fieldErrors.companySize)}
                onChange={() => clearFieldError("companySize")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {ASSESSMENT_COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="What's driving this now?"
              htmlFor="driver"
              error={fieldErrors.driver}
            >
              <select
                id="driver"
                name="driver"
                required
                defaultValue=""
                className={inputClass(fieldErrors.driver)}
                onChange={() => clearFieldError("driver")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {ASSESSMENT_DRIVERS.map((d) => (
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

function inputClass(error?: string) {
  return error
    ? "input border-red-400/70 focus:border-red-400"
    : "input";
}

function Field({
  label,
  htmlFor,
  required = true,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink)]"
      >
        {label}
        {required ? <span className="text-[var(--color-brass)]">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
