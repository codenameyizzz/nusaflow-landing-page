import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function PageFrame({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-hairline pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[1.11] tracking-[-0.9px] sm:text-[48px] sm:leading-[1.1] sm:tracking-[-2.4px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.5] text-mid-gray">{copy}</p>
        </div>
      </section>
      {children}
    </>
  );
}
