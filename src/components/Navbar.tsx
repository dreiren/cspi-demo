import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";
import { Button } from "./Button";
import { Container } from "./Container";
import { LogoMark } from "./LogoMark";

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const scrolled = useScrolled(40);
  const activeSection = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSolid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isSolid
          ? "bg-(--color-primary-dark)/85 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <LogoMark tone="light" />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-(--color-accent) transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" size="md">
            Contact CIDUS
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`grid overflow-hidden bg-(--color-primary-dark)/97 backdrop-blur-md transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-medium ${
                  activeSection === link.id ? "bg-white/10 text-white" : "text-white/70"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" variant="primary" size="md" className="mt-3 w-full" onClick={() => setMenuOpen(false)}>
              Contact CIDUS
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
