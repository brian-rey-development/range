import { HOW_IT_WORKS } from "../../core/content/copy";
import { Section } from "../../shared/section";
import { SectionHeading } from "../../shared/section-heading";

type StepProps = {
  readonly number: number;
  readonly title: string;
  readonly body: string;
};

function Step({ number, title, body }: StepProps) {
  return (
    <li className="grid items-baseline gap-x-12 gap-y-3 rounded-lg bg-surface-raised p-6 shadow-card md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <h3 className="flex items-baseline gap-4 text-title-2 text-ink">
        <span className="figures text-num text-accent-text">{number}</span>
        {title}
      </h3>
      <p className="max-w-prose text-copy text-ink-2">{body}</p>
    </li>
  );
}

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" tone="sunken" className="flex flex-col gap-8">
      <SectionHeading title={HOW_IT_WORKS.title} />
      <ol className="flex flex-col gap-4">
        {HOW_IT_WORKS.items.map((item, index) => (
          <Step key={item.title} number={index + 1} title={item.title} body={item.body} />
        ))}
      </ol>
      <p className="max-w-3xl text-note text-ink-2">{HOW_IT_WORKS.limit}</p>
    </Section>
  );
}
