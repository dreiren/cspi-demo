import { describe, expect, it } from "vitest";
import {
  CONTACT_LIMITS,
  MAX_CONTACT_JSON_BYTES,
  isValidEmail,
  isValidPhone,
  payloadExceedsLimit,
  readContactInput,
  validateContactPayload,
} from "./contact";

const validBase = {
  name: "Jane Doe",
  company: "Acme PH",
  email: "jane.doe@example.com",
  phone: "+63 917 123 4567",
  message: "We need structured cabling for a new office floor.",
  website: "",
};

describe("isValidEmail", () => {
  it("accepts ordinary addresses", () => {
    expect(isValidEmail("team@cidus.example")).toBe(true);
    expect(isValidEmail("first.last+tag@sub.domain.com")).toBe(true);
  });

  it("rejects missing, spaced, or malformed values", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("name@domain")).toBe(false);
    expect(isValidEmail("jane doe@example.com")).toBe(false);
    expect(isValidEmail("jane@example..com")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("treats empty as valid (optional field)", () => {
    expect(isValidPhone("")).toBe(true);
  });

  it("accepts PH-friendly and international formats", () => {
    expect(isValidPhone("+63 917 123 4567")).toBe(true);
    expect(isValidPhone("09171234567")).toBe(true);
    expect(isValidPhone("+1 (415) 555-2671")).toBe(true);
  });

  it("rejects letters, too-short, and oversized values", () => {
    expect(isValidPhone("call me")).toBe(false);
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("+63 917 123 4567 8901 222")).toBe(false);
  });
});

describe("validateContactPayload", () => {
  it("trims and accepts a complete valid inquiry", () => {
    const result = validateContactPayload({
      ...validBase,
      name: "  Jane   Doe  ",
      email: "  Jane.Doe@Example.COM ",
    });
    expect(result).toEqual({
      ok: true,
      honeypot: false,
      value: {
        name: "Jane Doe",
        company: "Acme PH",
        email: "jane.doe@example.com",
        phone: "+63 917 123 4567",
        message: "We need structured cabling for a new office floor.",
      },
    });
  });

  it("allows optional company and phone to be omitted", () => {
    const result = validateContactPayload({
      name: "Li",
      email: "li@example.com",
      message: "Need a quote for network monitoring.",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypot) {
      expect(result.value.company).toBe("");
      expect(result.value.phone).toBe("");
    }
  });

  it("rejects a filled honeypot without field errors (silent drop)", () => {
    const result = validateContactPayload({
      ...validBase,
      website: "https://spam.example",
    });
    expect(result).toEqual({ ok: true, honeypot: true });
  });

  it("rejects a non-string honeypot as filled", () => {
    const result = validateContactPayload({
      ...validBase,
      website: ["http://bot.example"],
    });
    expect(result).toEqual({ ok: true, honeypot: true });
  });

  it("requires name length after trim", () => {
    const short = validateContactPayload({ ...validBase, name: " A " });
    expect(short.ok).toBe(false);
    if (!short.ok) {
      expect(short.errors.name).toMatch(/2–100/);
    }

    const long = validateContactPayload({ ...validBase, name: "N".repeat(CONTACT_LIMITS.name.max + 1) });
    expect(long.ok).toBe(false);
    if (!long.ok) {
      expect(long.errors.name).toBeDefined();
    }
  });

  it("caps optional company length", () => {
    const result = validateContactPayload({
      ...validBase,
      company: "C".repeat(CONTACT_LIMITS.company.max + 1),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.company).toMatch(/120/);
    }
  });

  it("requires a valid email", () => {
    const missing = validateContactPayload({ ...validBase, email: "   " });
    expect(missing.ok).toBe(false);
    if (!missing.ok) {
      expect(missing.errors.email).toMatch(/email address/);
    }

    const bad = validateContactPayload({ ...validBase, email: "team@" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      expect(bad.errors.email).toMatch(/valid email/);
    }
  });

  it("validates phone only when provided", () => {
    const result = validateContactPayload({ ...validBase, phone: "abc-000" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.phone).toMatch(/phone/);
    }
  });

  it("enforces message min and max length", () => {
    const short = validateContactPayload({ ...validBase, message: "Too short" });
    expect(short.ok).toBe(false);
    if (!short.ok) {
      expect(short.errors.message).toMatch(/at least 10/);
    }

    const long = validateContactPayload({
      ...validBase,
      message: "M".repeat(CONTACT_LIMITS.message.max + 1),
    });
    expect(long.ok).toBe(false);
    if (!long.ok) {
      expect(long.errors.message).toMatch(/2,000/);
    }
  });

  it("does not echo HTML from the message into errors", () => {
    const result = validateContactPayload({
      ...validBase,
      name: "",
      message: "<img src=x onerror=alert(1)>",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(JSON.stringify(result.errors)).not.toContain("<img");
    }
  });
});

describe("readContactInput", () => {
  it("reads known fields and ignores extras", () => {
    const input = readContactInput({
      name: "Ada",
      email: "ada@example.com",
      message: "Need infrastructure help.",
      extra: "<script>alert(1)</script>",
    });
    expect(input).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      message: "Need infrastructure help.",
    });
  });

  it("rejects arrays and primitives", () => {
    expect(readContactInput(null)).toBeNull();
    expect(readContactInput("name=Ada")).toBeNull();
    expect(readContactInput([{ name: "Ada" }])).toBeNull();
  });
});

describe("payload size guard", () => {
  it("flags bodies over the JSON byte cap", () => {
    expect(payloadExceedsLimit(MAX_CONTACT_JSON_BYTES)).toBe(false);
    expect(payloadExceedsLimit(MAX_CONTACT_JSON_BYTES + 1)).toBe(true);
  });
});
