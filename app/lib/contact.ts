/** Shared contact details for CTAs across the site */
export const PHONE_DISPLAY = "+44 7784 419 117";
export const PHONE_E164 = "+447784419117";
export const WHATSAPP_NUMBER = "447784419117";

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
