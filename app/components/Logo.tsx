import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/augment_first_logo.png"
      alt="AugmentFirst"
      width={227}
      height={40}
      className="h-9 w-auto"
      priority
    />
  );
}
