import { Container } from "../components/Container";
import { LogoMark } from "../components/LogoMark";
import { Reveal } from "../components/Reveal";
import { SocialLinks } from "../components/SocialLinks";
import { contactSection, servicePillars, footer, navLinks, siteMeta } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-(--color-band-deep) pt-20 pb-10 text-(--color-on-band-muted)">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-accent)/40 to-transparent"
      />

      <Container>
        <Reveal preset="fadeUp">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <LogoMark tone="light" showLegalName />
            <p className="mt-5 text-sm leading-relaxed text-(--color-on-band-dim)">{footer.description}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-on-band-faint)">{footer.navHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-(--color-on-band-soft) transition-colors hover:text-(--color-accent)">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-on-band-faint)">{footer.servicesHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {servicePillars.map((pillar) => (
                <li key={pillar.id}>
                  <a href="#services" className="text-sm text-(--color-on-band-soft) transition-colors hover:text-(--color-accent)">
                    {pillar.shortName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-on-band-faint)">{footer.contactHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-(--color-on-band-soft)">
              {contactSection.details.map((detail) => (
                <li key={detail.label}>{detail.value}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-on-band-faint)">
              {footer.socialHeading}
            </h3>
            <SocialLinks tone="light" className="mt-4" />
          </div>
        </div>
        </Reveal>

        <Reveal delay={0.12} preset="fadeIn">
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-(--color-glass-border) pt-6 text-xs text-(--color-on-band-faint) sm:flex-row">
          <p>{footer.copyright(year)}</p>
          <p className="text-(--color-on-band-faint)">{siteMeta.tagline}</p>
        </div>
        </Reveal>
      </Container>
    </footer>
  );
}
