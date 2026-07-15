import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-white">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <Logo />
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+4407784419117"
            className="hidden items-center gap-2 text-[13.5px] font-semibold text-[#16233f] transition hover:text-[var(--color-brass)] sm:flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20.5c0 .6-.4 1-1 1C10.6 21.5 2.5 13.4 2.5 3.5c0-.6.4-1 1-1H7.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            +44 07784419117
          </a>
          <a
            href="#assessment"
            className="rounded-md bg-[var(--color-brass)] px-4 py-2.5 text-[13px] font-semibold text-[#0a0c10] transition hover:bg-[var(--color-brass-deep)]"
          >
            Request Assessment
          </a>
        </div>
      </div>
    </header>
  );
}
