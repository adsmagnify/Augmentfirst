import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="AugmentFirst home">
      <Image
        src="/augment_first_logo.png"
        alt="AugmentFirst"
        width={227}
        height={40}
        className="h-9 w-auto"
        priority
      />
    </Link>
  );
}
