"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { GlowNode } from "../components/graphics/GlowNode";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { contactSection } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-(--color-line) bg-white px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-ink-faint) transition-colors focus:border-(--color-accent) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30";

export function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-label="Contact us" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* calmer, simplified visual — the network settles as the story concludes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(105,205,223,0.08),transparent_70%)]"
      />
      <svg className="absolute inset-x-0 bottom-0 h-40 w-full opacity-60" viewBox="0 0 800 100" aria-hidden="true" focusable="false">
        <path
          d="M0 70 C 200 20, 400 90, 800 40"
          fill="none"
          stroke="#46a0b9"
          strokeWidth="1"
          strokeDasharray="4 10"
          opacity="0.35"
          style={!prefersReducedMotion ? { animation: "dash-flow 22s linear infinite" } : undefined}
        />
        <GlowNode x={400} y={60} tone="accent" size={3.5} animate={!prefersReducedMotion} />
      </svg>

      <Container className="relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow={contactSection.eyebrow}
            heading={contactSection.heading}
            description={contactSection.description}
            tone="dark"
          />

          <Reveal delay={0.15}>
            <dl className="mt-10 flex flex-col gap-5">
              {contactSection.details.map((detail) => (
                <div key={detail.label} className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-line) text-(--color-secondary)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-ink-faint)">
                      {detail.label}
                    </dt>
                    <dd className="text-sm font-medium text-(--color-ink)">{detail.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-ink-faint)">
                [Social Links]
              </p>
              <div className="mt-3 flex gap-3">
                {contactSection.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink-soft) transition-colors hover:border-(--color-accent) hover:text-(--color-secondary)"
                  >
                    <span className="text-[10px] font-bold uppercase">{social.label.slice(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-6 shadow-[var(--shadow-soft)] sm:p-8"
            aria-live="polite"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-accent)/15 text-(--color-secondary-dark)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-(--color-primary)">Thank you</h3>
                <p className="max-w-xs text-sm text-(--color-ink-soft)">
                  Your inquiry placeholder has been submitted. Replace this confirmation with a real submission
                  handler when connecting the form.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-(--color-primary)">
                    {contactSection.formFields.name}
                  </label>
                  <input id="contact-name" name="name" type="text" required autoComplete="name" className={inputClasses} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-semibold text-(--color-primary)">
                    {contactSection.formFields.company}
                  </label>
                  <input id="contact-company" name="company" type="text" autoComplete="organization" className={inputClasses} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-(--color-primary)">
                    {contactSection.formFields.email}
                  </label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClasses} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-(--color-primary)">
                    {contactSection.formFields.phone}
                  </label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-(--color-primary)">
                    {contactSection.formFields.message}
                  </label>
                  <textarea id="contact-message" name="message" required rows={5} className={`${inputClasses} resize-none`} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                    {contactSection.cta}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
