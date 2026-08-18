import { ClientLogoPlaceholder } from "../components/ClientLogoPlaceholder";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { clientsSection } from "../data/content";

export function Clients() {
  const placeholders = Array.from({ length: clientsSection.placeholderCount }, (_, i) => i + 1);

  return (
    <section id="clients" aria-label="Clients" className="relative overflow-hidden bg-(--color-surface-soft) py-24 sm:py-28">
      <Container className="relative">
        <SectionHeading
          eyebrow={clientsSection.eyebrow}
          heading={clientsSection.heading}
          description={clientsSection.description}
          tone="dark"
          align="center"
          className="mx-auto"
        />

        {/* decorative connector representing the network expanding to connect organizations */}
        <div aria-hidden="true" className="relative mx-auto mt-14 hidden max-w-4xl sm:block">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-gradient-to-r from-transparent via-(--color-secondary)/40 to-transparent" />
          <div className="flex justify-between px-6">
            {placeholders.map((n) => (
              <span key={n} className="h-[7px] w-[7px] rounded-full bg-(--color-accent)/60" />
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-4 sm:grid-cols-3 lg:grid-cols-6">
            {placeholders.map((n) => (
              <ClientLogoPlaceholder key={n} index={n} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
