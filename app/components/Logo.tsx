import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="AugmentFirst home" className="min-w-0 shrink">
      <Image
        src="/augment_first_logo.png"
        alt="AugmentFirst"
        width={227}
        height={40}
        className="h-7 w-auto max-w-[min(100%,160px)] sm:h-9 sm:max-w-none"
        priority
      />
    </Link>
  );
}
