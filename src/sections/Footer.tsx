import { Container } from "../components/Container";
import { LogoMark } from "../components/LogoMark";
import { Reveal } from "../components/Reveal";
import { contactSection, footer, navLinks, serviceGroups } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-(--color-primary-dark) pt-20 pb-10 text-white/70">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-accent)/40 to-transparent"
      />

      <Container>
        <Reveal preset="fadeUp">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <LogoMark tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/55">{footer.description}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{footer.navHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-white/65 transition-colors hover:text-(--color-accent)">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{footer.servicesHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceGroups.map((group) => (
                <li key={group.id}>
                  <a href="#services" className="text-sm text-white/65 transition-colors hover:text-(--color-accent)">
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{footer.contactHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/65">
              {contactSection.details.map((detail) => (
                <li key={detail.label}>{detail.value}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
              {footer.socialHeading}
            </h3>
            <ul className="mt-4 flex gap-3">
              {contactSection.socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[10px] font-bold uppercase transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
                  >
                    {social.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>

        <Reveal delay={0.12} preset="fadeIn">
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>{footer.copyright(year)}</p>
          <p className="text-white/30">Design system built for easy content replacement.</p>
        </div>
        </Reveal>
      </Container>
    </footer>
  );
}
