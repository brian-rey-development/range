import { Heading } from "@range/ui";

import { PRINCIPLES } from "../../core/content/copy";
import { Container } from "../../shared/container";

export function PrinciplesSection() {
  return (
    <section id="principles" className="scroll-mt-16 py-12 md:py-16">
      <Container className="flex flex-col gap-8">
        <Heading as="h2">{PRINCIPLES.title}</Heading>
        <ul className="grid gap-8 md:grid-cols-3">
          {PRINCIPLES.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 border-t border-line pt-4">
              <Heading as="h3">{item.title}</Heading>
              <p className="text-body text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-3xl text-small text-ink-3">{PRINCIPLES.limit}</p>
      </Container>
    </section>
  );
}
