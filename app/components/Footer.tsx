import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-black py-9">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <Logo />

        <p className="text-[13.5px] leading-snug text-[var(--color-muted)]">
          Senior-led data transformation for
          <br className="hidden sm:block" /> regulated industries.
        </p>

        <p className="text-[13px] text-[var(--color-muted)]">
          © 2025 AugmentFirst. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
