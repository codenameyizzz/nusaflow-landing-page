import { Progress } from "@/components/ui/progress";

export function StatBlock({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div>
      <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
        {label}
      </p>
      <p className="mt-2 text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] text-ink sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
        {value}
      </p>
      <Progress value={progress} className="mt-4 h-2" />
    </div>
  );
}
