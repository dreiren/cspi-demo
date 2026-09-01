/**
 * Shared contact-form validation. Used by the client form and POST /api/contact
 * so the same rules apply even if the browser is bypassed.
 *
 * Production delivery: set CONTACT_WEBHOOK_URL (server-only HTTPS endpoint).
 * This module never persists PII to disk or localStorage.
 */

export const HONEYPOT_FIELD = "website" as const;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  email: { max: 254 },
  phone: { max: 22 },
  message: { min: 10, max: 2000 },
} as const;

/** Reject oversized JSON bodies before parsing nested junk. */
export const MAX_CONTACT_JSON_BYTES = 8_192;

export type ContactField = "name" | "company" | "email" | "phone" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactInput = {
  name: unknown;
  company?: unknown;
  email: unknown;
  phone?: unknown;
  message: unknown;
  website?: unknown;
};

export type SanitizedContact = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; value: SanitizedContact }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_COMPACT = /^\+?[0-9]{7,15}$/;

export function isValidEmail(value: string): boolean {
  if (value.length < 3 || value.length > CONTACT_LIMITS.email.max) return false;
  if (value.includes("..") || value.startsWith(".") || value.endsWith(".")) return false;
  const at = value.lastIndexOf("@");
  if (at < 1) return false;
  const domain = value.slice(at + 1);
  if (!domain.includes(".") || domain.startsWith("-") || domain.endsWith("-")) return false;
  return EMAIL_PATTERN.test(value);
}

/** Optional phone: empty is valid. PH-friendly (+63 / 0…) and general international. */
export function isValidPhone(value: string): boolean {
  if (!value) return true;
  if (value.length > CONTACT_LIMITS.phone.max) return false;
  const compact = value.replace(/[\s().-]/g, "");
  return PHONE_COMPACT.test(compact);
}

function stripControls(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.charCodeAt(0);
    const allowWhitespace = code === 9 || code === 10 || code === 13;
    if (!allowWhitespace && (code < 32 || code === 127)) continue;
    result += char;
  }
  return result;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeLine(value: unknown): string {
  return stripControls(asString(value)).replace(/\s+/g, " ").trim();
}

function normalizeMessage(value: unknown): string {
  return stripControls(asString(value).replace(/\r\n/g, "\n")).trim();
}

export function readContactInput(body: unknown): ContactInput | null {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  const record = body as Record<string, unknown>;
  return {
    name: record.name,
    company: record.company,
    email: record.email,
    phone: record.phone,
    message: record.message,
    website: record[HONEYPOT_FIELD],
  };
}

function isHoneypotFilled(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value !== "string") return true;
  return value.trim().length > 0;
}

export function validateContactPayload(input: ContactInput): ContactValidationResult {
  if (isHoneypotFilled(input.website)) {
    return { ok: true, honeypot: true };
  }

  const name = normalizeLine(input.name);
  const company = normalizeLine(input.company);
  const email = normalizeLine(input.email).toLowerCase();
  const phone = normalizeLine(input.phone);
  const message = normalizeMessage(input.message);

  const errors: ContactFieldErrors = {};

  if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Enter your name (${CONTACT_LIMITS.name.min}–${CONTACT_LIMITS.name.max} characters).`;
  }

  if (company.length > CONTACT_LIMITS.company.max) {
    errors.company = `Company can be at most ${CONTACT_LIMITS.company.max} characters.`;
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = "Enter a valid phone number (digits, spaces, +, (), or hyphens).";
  }

  if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Enter a message of at least ${CONTACT_LIMITS.message.min} characters.`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message can be at most ${CONTACT_LIMITS.message.max.toLocaleString()} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    honeypot: false,
    value: { name, company, email, phone, message },
  };
}

export function payloadExceedsLimit(byteLength: number): boolean {
  return byteLength > MAX_CONTACT_JSON_BYTES;
}
