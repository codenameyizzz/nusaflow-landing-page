export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[12px] font-medium uppercase leading-[1.33] tracking-[0.6px] text-mid-gray">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-[-0.75px] text-ink sm:text-[36px] sm:leading-[1.11] sm:tracking-[-0.9px]">
        {title}
      </h2>
      {copy ? <p className="mt-4 max-w-2xl text-base leading-[1.5] text-mid-gray">{copy}</p> : null}
    </div>
  );
}
