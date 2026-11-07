type SectionHeadingProps = {
  readonly title: string;
  readonly lead?: string;
};

export function SectionHeading({ title, lead }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-section text-balance text-ink">{title}</h2>
      {lead ? <p className="max-w-xl text-lead text-ink-2">{lead}</p> : null}
    </div>
  );
}
