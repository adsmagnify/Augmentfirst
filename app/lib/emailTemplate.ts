import { escapeHtml } from "./escapeHtml";

export function renderLeadEmail({
  heading,
  intro,
  rows,
}: {
  heading: string;
  intro: string;
  rows: { label: string; value: string }[];
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

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">
        <div style="background:#0a0c10;padding:20px 24px;">
          <span style="color:#c9a227;font-size:15px;font-weight:700;letter-spacing:0.02em;">AugmentFirst</span>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 8px;font-size:18px;color:#111;">${escapeHtml(heading)}</h2>
          <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.5;">${escapeHtml(intro)}</p>
          <table style="width:100%;border-collapse:collapse;">
            ${tableRows}
          </table>
        </div>
      </div>
    </div>
  `;

  return { html };
}

export function renderMessageEmail({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  const paragraphHtml = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-size:14px;color:#333;line-height:1.6;">${escapeHtml(p)}</p>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">
        <div style="background:#0a0c10;padding:20px 24px;">
          <span style="color:#c9a227;font-size:15px;font-weight:700;letter-spacing:0.02em;">AugmentFirst</span>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 16px;font-size:18px;color:#111;">${escapeHtml(heading)}</h2>
          ${paragraphHtml}
          <p style="margin:24px 0 0;font-size:13px;color:#999;">Vijay Kanojia, Founder &amp; Principal Consultant, AugmentFirst · London</p>
        </div>
      </div>
    </div>
  `;

  return { html };
}
