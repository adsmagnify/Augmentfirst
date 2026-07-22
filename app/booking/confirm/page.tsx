import { redirect } from "next/navigation";
import { processBookingConfirm } from "@/app/lib/confirmBooking";

export const metadata = {
  title: "Confirming booking",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

/** Admin email CTA lands here — confirms the slot then shows the result page. */
export default async function BookingConfirmPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token ?? "";
  const result = await processBookingConfirm(token);

  const qs = new URLSearchParams({ status: result.status });
  if (result.bookingId) qs.set("id", result.bookingId);

  redirect(`/booking/confirm-result?${qs.toString()}`);
}
