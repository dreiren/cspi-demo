import { Container } from "../components/Container";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ServiceIcon } from "../components/graphics/ServiceIcon";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { services, servicesSection } from "../data/content";

const icons: Record<string, "infrastructure" | "network" | "data"> = {
  "it-infrastructure": "infrastructure",
  "network-solutions": "network",
  "data-solutions": "data",
};

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="relative overflow-hidden bg-(--color-primary) py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#0a2444_0%,#0c2d54_45%,#0e3563_100%)]"
      />
      <ParallaxLayer speed={14} className="absolute inset-0">
        <GridOverlay opacity={0.22} />
      </ParallaxLayer>

      <Container className="relative">
        <SectionHeading
          eyebrow={servicesSection.eyebrow}
          heading={servicesSection.heading}
          description={servicesSection.description}
          tone="light"
        />

        <div className="relative mt-16 flex flex-col">
          {/* connecting spine */}
          <div
            aria-hidden="true"
            className="absolute left-7 top-10 bottom-24 hidden w-px bg-gradient-to-b from-(--color-accent)/60 via-(--color-secondary)/40 to-(--color-accent)/60 sm:block"
          />

          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.12} className="relative mb-10 last:mb-0">
              <div className="grid gap-5 sm:grid-cols-[3.5rem_1fr] sm:gap-8">
                <div className="hidden sm:flex sm:justify-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-(--color-accent)/50 bg-(--color-primary) text-(--color-accent) shadow-[var(--shadow-glow)]">
                    <ServiceIcon name={icons[service.id]} />
                  </span>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-(--color-accent)/40 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/40 text-(--color-accent) sm:hidden">
                        <ServiceIcon name={icons[service.id]} className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-bold text-white sm:text-2xl">{service.name}</h3>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)/70">
                      {service.index}
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-white/65 sm:text-base">
                    {service.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.name} supporting areas`}>
                    {service.supportingAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Outcome banner: services converge into one connected environment */}
        <Reveal delay={0.3}>
          <div className="relative mx-auto mt-4 flex max-w-2xl flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-(--color-accent)/30 bg-gradient-to-b from-(--color-accent)/12 to-transparent px-8 py-8 text-center">
            <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" className="text-(--color-accent)/70">
              <path d="M10 0V22M10 22L4 16M10 22L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-accent)">
              {servicesSection.outcome}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
