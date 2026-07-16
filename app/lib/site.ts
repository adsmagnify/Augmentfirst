/**
 * Canonical site origin used for sitemap, robots, and metadata.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://augmentfirst.com).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  // Vercel provides this on preview/production deploys
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "https://augmentfirst.com";
}

export const SITE_NAME = "AugmentFirst";
export const SITE_DESCRIPTION =
  "For banks, fintechs, and regulated firms whose data foundation was never built to be trusted. Senior-led assessment with Vijay Kanojia, not another dashboard.";
