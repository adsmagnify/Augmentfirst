import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <Logo />
      </div>
    </header>
  );
}
