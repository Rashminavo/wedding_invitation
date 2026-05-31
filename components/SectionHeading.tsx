import { Leaf } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-moss">
        <Leaf className="h-4 w-4" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 leading-7 text-ink/68">{description}</p> : null}
    </div>
  );
}
