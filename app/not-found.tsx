import { redirect } from "next/navigation";

/** Fallback: never leave users on a 404 page. */
export default function NotFound() {
  redirect("/");
}
