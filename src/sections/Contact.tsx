"use client";

import { useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { GlowNode } from "../components/graphics/GlowNode";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { contactSection } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  CONTACT_LIMITS,
  CONTACT_MAILTO_ADDRESS,
  HONEYPOT_FIELD,
  openMailtoUrl,
  planContactSubmit,
  type ContactField,
  type ContactFieldErrors,
} from "../lib/contact";
import { safeAnchorProps } from "../lib/links";

const inputClasses =
  "scheme-light w-full rounded-[var(--radius-sm)] border bg-white px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-ink-faint) transition-colors focus:outline-none focus:ring-2";
const inputOkClasses =
  "border-(--color-line) focus:border-(--color-accent) focus:ring-(--color-accent)/30";
const inputInvalidClasses =
  "border-(--color-danger) focus:border-(--color-danger) focus:ring-(--color-danger)/25";

const FIELD_ORDER: ContactField[] = ["name", "company", "email", "phone", "message"];

function fieldClass(invalid: boolean): string {
  return `${inputClasses} ${invalid ? inputInvalidClasses : inputOkClasses}`;
}

const MAILTO_ERROR = `We could not open your email app. Email ${CONTACT_MAILTO_ADDRESS} directly, or try again.`;

function SubmitSpinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function waitForLoaderPaint(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame !== "function") {
      resolve();
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function TextField({ id, name, label, error, required, optional, className, ...rest }: TextFieldProps) {
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  return (
    <div className="sm:col-span-1">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-(--color-primary)">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-(--color-danger)">
            {" "}
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ml-1 font-normal text-(--color-ink-faint)">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        aria-required={required || undefined}
        className={className ?? fieldClass(invalid)}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-(--color-danger)">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type AreaFieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

function AreaField({ id, name, label, error, required, className, ...rest }: AreaFieldProps) {
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-(--color-primary)">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-(--color-danger)">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        name={name}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        aria-required={required || undefined}
        className={className ?? `${fieldClass(invalid)} resize-none`}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-(--color-danger)">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sendingLock = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const focusFirstError = (next: ContactFieldErrors) => {
    const first = FIELD_ORDER.find((field) => next[field]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
    }
  };

  const failSend = (message: string) => {
    sendingLock.current = false;
    setSubmitting(false);
    setFormError(message);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingLock.current || submitting) return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get(HONEYPOT_FIELD) ?? ""),
    };

    const plan = planContactSubmit(payload);
    if (plan.status === "invalid") {
      setErrors(plan.errors);
      setFormError(null);
      focusFirstError(plan.errors);
      return;
    }

    sendingLock.current = true;
    setErrors({});
    setFormError(null);
    setSubmitting(true);

    if (plan.status === "honeypot") {
      setSubmitted(true);
      return;
    }

    try {
      await waitForLoaderPaint();
      if (!openMailtoUrl(plan.url)) {
        failSend(MAILTO_ERROR);
        return;
      }
      setSubmitted(true);
    } catch {
      failSend(MAILTO_ERROR);
    }
  };

  return (
    <section id="contact" aria-label="Contact us" className="relative overflow-hidden bg-(--color-surface) py-24 sm:py-32">
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

          <Reveal delay={0.12} preset="fadeUp">
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

          <Reveal delay={0.22} preset="fadeUp">
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-ink-faint)">
                [Social Links]
              </p>
              <div className="mt-3 flex gap-3">
                {contactSection.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    {...safeAnchorProps(social.href)}
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

        <Reveal delay={0.08} preset="fadeRight">
          <ParallaxLayer speed={-12}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center" aria-live="polite">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-accent)/15 text-(--color-secondary-dark)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-(--color-primary)">Thank you</h3>
                <p className="max-w-xs text-sm text-(--color-ink-soft)">
                  Your email app should open with this inquiry. Send that message and we will follow
                  up using the contact details you provided.
                </p>
              </div>
            ) : (
              <>
                <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Company website</label>
                  <input
                    id="contact-website"
                    name={HONEYPOT_FIELD}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  id="contact-name"
                  name="name"
                  label={contactSection.formFields.name}
                  error={errors.name}
                  required
                  type="text"
                  autoComplete="name"
                  minLength={CONTACT_LIMITS.name.min}
                  maxLength={CONTACT_LIMITS.name.max}
                  disabled={submitting}
                  onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
                />
                <TextField
                  id="contact-company"
                  name="company"
                  label={contactSection.formFields.company}
                  error={errors.company}
                  optional
                  type="text"
                  autoComplete="organization"
                  maxLength={CONTACT_LIMITS.company.max}
                  disabled={submitting}
                  onChange={() => setErrors((current) => ({ ...current, company: undefined }))}
                />
                <TextField
                  id="contact-email"
                  name="email"
                  label={contactSection.formFields.email}
                  error={errors.email}
                  required
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={CONTACT_LIMITS.email.max}
                  disabled={submitting}
                  onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
                />
                <TextField
                  id="contact-phone"
                  name="phone"
                  label={contactSection.formFields.phone}
                  error={errors.phone}
                  optional
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={CONTACT_LIMITS.phone.max}
                  disabled={submitting}
                  onChange={() => setErrors((current) => ({ ...current, phone: undefined }))}
                />
                <AreaField
                  id="contact-message"
                  name="message"
                  label={contactSection.formFields.message}
                  error={errors.message}
                  required
                  rows={5}
                  minLength={CONTACT_LIMITS.message.min}
                  maxLength={CONTACT_LIMITS.message.max}
                  autoComplete="off"
                  disabled={submitting}
                  onChange={() => setErrors((current) => ({ ...current, message: undefined }))}
                />
                {formError ? (
                  <p id="contact-form-error" role="alert" className="sm:col-span-2 text-sm text-(--color-danger)">
                    {formError}
                  </p>
                ) : null}
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={submitting}
                    aria-busy={submitting || undefined}
                    aria-live="polite"
                    aria-describedby={formError ? "contact-form-error" : undefined}
                  >
                    {submitting ? (
                      <>
                        <SubmitSpinner />
                        Sending…
                      </>
                    ) : (
                      contactSection.cta
                    )}
                  </Button>
                </div>
              </div>
              </>
            )}
          </form>
          </ParallaxLayer>
        </Reveal>
      </Container>
    </section>
  );
}
