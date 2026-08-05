import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-ink" aria-label="NusaFlow home">
      <span className="flex h-9 w-11 items-center justify-center overflow-hidden rounded-[18px] bg-ink">
        <img
          src="/nusaflow-logo.png"
          alt=""
          className="h-full w-full object-contain p-1.5"
          aria-hidden="true"
        />
      </span>
      <span className="text-sm font-semibold tracking-[-0.01em]">NusaFlow</span>
    </Link>
  );
}
