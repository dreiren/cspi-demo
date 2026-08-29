import { ClientLogoPlaceholder } from "../components/ClientLogoPlaceholder";
import { Container } from "../components/Container";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { clientsSection } from "../data/content";
import { STAGGER } from "../lib/motion";

export function Clients() {
  const organizations = clientsSection.organizations;

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

        <div aria-hidden="true" className="relative mx-auto mt-14 hidden max-w-3xl sm:block">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-gradient-to-r from-transparent via-(--color-secondary)/40 to-transparent" />
          <div className="flex justify-between px-16">
            {organizations.map((org) => (
              <span key={org.id} className="h-[7px] w-[7px] rounded-full bg-(--color-accent)/60" />
            ))}
          </div>
        </div>

        <RevealGroup stagger={STAGGER} delay={0.1} className="mx-auto mt-8 grid max-w-3xl gap-4 sm:mt-4 sm:grid-cols-3">
          {organizations.map((org) => (
            <RevealItem key={org.id} preset="scaleIn">
              <ClientLogoPlaceholder name={org.name} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} preset="fadeIn">
          <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-(--color-ink-faint)">
            Logos shown as placeholders pending approved artwork and usage guidelines from each organization.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
