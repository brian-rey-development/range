import { APP_NAME, APP_TAGLINE } from "@/core/config/app";
import { Heading } from "@range/ui";

export function LandingPage() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-3xl content-center gap-3 p-8">
      <Heading as="h1" size="display">
        {APP_NAME}
      </Heading>
      <p className="text-body text-ink-2">{APP_TAGLINE}</p>
    </main>
  );
}
