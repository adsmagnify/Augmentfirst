/** Shared assessment form validation (client + API). */

export const ASSESSMENT_SITUATIONS = [
  "We can't trace a figure back to its source",
  "Different teams report different numbers",
  "An audit or regulator flagged our data",
  "Staff spend too long manually reconciling data",
  "Something else",
] as const;

export const ASSESSMENT_COMPANY_SIZES = [
  "Under 200 employees",
  "200–1,000 employees",
  "1,000–5,000 employees",
  "5,000+ employees",
] as const;

export const ASSESSMENT_DRIVERS = [
  "Board or investor request",
  "Upcoming audit or regulatory review",
  "New risk or compliance requirement",
  "Ongoing operational pain",
  "Other",
] as const;

const NAME_RE = /^[A-Za-z][A-Za-z .'\-]{1,78}$/;
const EMAIL_RE =
  /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const EMAIL_LOCAL_DIGITS_ONLY_RE = /^\d+@/;

/** Returns an error message, or null if the email is valid. */
export function validateWorkEmail(email: string): string | null {
  const value = email.trim().toLowerCase();
  if (!value) return "Work email is required.";
  if (/^\d/.test(value)) return "Email cannot start with a number.";
  if (EMAIL_LOCAL_DIGITS_ONLY_RE.test(value)) {
    return "Email cannot be only numbers.";
  }
  if (!EMAIL_RE.test(value) || value.length > 254) {
    return "Enter a valid work email address.";
  }
  return null;
}
/** International phone: optional +, digits/spaces/dashes/parentheses, 7–20 digits total */
const PHONE_RE = /^\+?[\d\s().\-]{7,25}$/;
const DIGITS_RE = /\d/g;
const COMPANY_RE = /^[A-Za-z0-9][A-Za-z0-9 .,&'\-/()]{1,118}$/;
const TITLE_RE = /^[A-Za-z][A-Za-z0-9 .,&'\-/()]{1,98}$/;

export type AssessmentPayload = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  jobTitle: string;
  situation: string;
  companySize: string;
  driver: string;
};

export type AssessmentFieldErrors = Partial<
  Record<keyof AssessmentPayload, string>
>;

function digitCount(value: string) {
  return (value.match(DIGITS_RE) ?? []).length;
}

export function normalizeAssessmentInput(
  raw: Record<string, unknown>
): AssessmentPayload {
  return {
    fullName: String(raw.fullName ?? "").trim().replace(/\s+/g, " "),
    workEmail: String(raw.workEmail ?? "").trim().toLowerCase(),
    phone: String(raw.phone ?? "").trim().replace(/\s+/g, " "),
    company: String(raw.company ?? "").trim().replace(/\s+/g, " "),
    jobTitle: String(raw.jobTitle ?? "").trim().replace(/\s+/g, " "),
    situation: String(raw.situation ?? "").trim(),
    companySize: String(raw.companySize ?? "").trim(),
    driver: String(raw.driver ?? "").trim(),
  };
}

export function validateAssessment(
  input: AssessmentPayload
): AssessmentFieldErrors {
  const errors: AssessmentFieldErrors = {};

  if (!input.fullName) {
    errors.fullName = "Full name is required.";
  } else if (!NAME_RE.test(input.fullName)) {
    errors.fullName =
      "Enter a valid full name (letters, spaces, hyphens, or apostrophes).";
  }

  if (!input.workEmail) {
    errors.workEmail = "Work email is required.";
  } else {
    const emailError = validateWorkEmail(input.workEmail);
    if (emailError) errors.workEmail = emailError;
  }

  if (input.phone) {
    const digits = digitCount(input.phone);
    if (!PHONE_RE.test(input.phone) || digits < 7 || digits > 15) {
      errors.phone =
        "Enter a valid phone number (7–15 digits; spaces or + allowed).";
    }
  }

  if (!input.company) {
    errors.company = "Company is required.";
  } else if (!COMPANY_RE.test(input.company)) {
    errors.company = "Enter a valid company name.";
  }

  if (!input.jobTitle) {
    errors.jobTitle = "Job title is required.";
  } else if (!TITLE_RE.test(input.jobTitle)) {
    errors.jobTitle = "Enter a valid job title.";
  }

  if (!input.situation) {
    errors.situation = "Please select your situation.";
  } else if (
    !(ASSESSMENT_SITUATIONS as readonly string[]).includes(input.situation)
  ) {
    errors.situation = "Please select a valid situation.";
  }

  if (!input.companySize) {
    errors.companySize = "Please select company size.";
  } else if (
    !(ASSESSMENT_COMPANY_SIZES as readonly string[]).includes(input.companySize)
  ) {
    errors.companySize = "Please select a valid company size.";
  }

  if (!input.driver) {
    errors.driver = "Please select what is driving this.";
  } else if (!(ASSESSMENT_DRIVERS as readonly string[]).includes(input.driver)) {
    errors.driver = "Please select a valid driver.";
  }

  return errors;
}

export function firstAssessmentError(
  errors: AssessmentFieldErrors
): string | null {
  const order: (keyof AssessmentPayload)[] = [
    "fullName",
    "workEmail",
    "phone",
    "company",
    "jobTitle",
    "situation",
    "companySize",
    "driver",
  ];
  for (const key of order) {
    if (errors[key]) return errors[key] ?? null;
  }
  return null;
}
