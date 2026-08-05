import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-mid-gray flex h-10 w-full rounded-[18px] border border-transparent bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-hairline focus-visible:bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
