import { escapeHtml } from "./escapeHtml";
import { getSiteUrl } from "./site";

/**
 * Absolute logo URL for HTML emails.
 * Never use localhost — mail clients cannot load it.
 */
function getEmailLogoUrl() {
  const fromEnv = process.env.EMAIL_LOGO_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const site = getSiteUrl();
  const isLocal =
    /localhost|127\.0\.0\.1/i.test(site) || site.startsWith("http://");

  const base = isLocal ? "https://lp.augmentfirst.com" : site;
  return `${base}/augment_first_logo.png`;
}

function emailLogoHeader() {
  const logoUrl = getEmailLogoUrl();
  const siteUrl = getSiteUrl().includes("localhost")
    ? "https://lp.augmentfirst.com"
    : getSiteUrl();

  // Logo art is dark navy on black — wrap in white so it reads in email clients
  return `
    <div style="background:#0a0c10;padding:16px 24px;">
      <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;display:inline-block;">
        <span style="display:inline-block;background:#ffffff;padding:8px 12px;border-radius:6px;line-height:0;">
          <img
            src="${escapeHtml(logoUrl)}"
            alt="AugmentFirst"
            width="180"
            height="32"
            style="display:block;height:32px;width:auto;max-width:180px;border:0;outline:none;text-decoration:none;"
          />
        </span>
      </a>
    </div>`;
}

export function renderLeadEmail({
  heading,
  intro,
  rows,
  cta,
}: {
  heading: string;
  intro: string;
  rows: { label: string; value: string }[];
  cta?: { label: string; url: string };
}) {
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;font-size:13px;font-weight:600;color:#555;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;font-size:14px;color:#111;">${escapeHtml(row.value)}</td>
        </tr>`
    )
    .join("");

  const ctaHtml = cta
    ? `
      <div style="margin-top:24px;text-align:center;">
        <a href="${escapeHtml(cta.url)}" style="display:inline-block;background:#c9a227;color:#0a0c10;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:6px;">
          ${escapeHtml(cta.label)}
        </a>
        <p style="margin:12px 0 0;font-size:12px;color:#888;line-height:1.5;">
          Or copy this link:<br/>
          <a href="${escapeHtml(cta.url)}" style="color:#555;word-break:break-all;">${escapeHtml(cta.url)}</a>
        </p>
      </div>`
    : "";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">
        ${emailLogoHeader()}
        <div style="padding:24px;">
          <h2 style="margin:0 0 8px;font-size:18px;color:#111;">${escapeHtml(heading)}</h2>
          <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.5;">${escapeHtml(intro)}</p>
          <table style="width:100%;border-collapse:collapse;">
            ${tableRows}
          </table>
          ${ctaHtml}
        </div>
      </div>
    </div>
  `;

  return { html };
}

export function renderMessageEmail({
  heading,
  paragraphs,
  cta,
}: {
  heading: string;
  paragraphs: string[];
  cta?: { label: string; url: string };
}) {
  const paragraphHtml = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-size:14px;color:#333;line-height:1.6;">${escapeHtml(p)}</p>`
    )
    .join("");

  const ctaHtml = cta
    ? `
      <div style="margin:20px 0 8px;text-align:center;">
        <a href="${escapeHtml(cta.url)}" style="display:inline-block;background:#2D8CFF;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:6px;">
          ${escapeHtml(cta.label)}
        </a>
        <p style="margin:12px 0 0;font-size:12px;color:#888;line-height:1.5;word-break:break-all;">
          ${escapeHtml(cta.url)}
        </p>
      </div>`
    : "";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">
        ${emailLogoHeader()}
        <div style="padding:24px;">
          <h2 style="margin:0 0 16px;font-size:18px;color:#111;">${escapeHtml(heading)}</h2>
          ${paragraphHtml}
          ${ctaHtml}
          <p style="margin:24px 0 0;font-size:13px;color:#999;">Vijay Kanojia, Founder &amp; Principal Consultant, AugmentFirst</p>
        </div>
      </div>
    </div>
  `;

  return { html };
}
