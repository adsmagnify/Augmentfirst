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
  const status = await processBookingConfirm(token);
  redirect(`/booking/confirm-result?status=${status}`);
}
