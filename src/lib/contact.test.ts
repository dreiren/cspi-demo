import { describe, expect, it } from "vitest";
import {
  CONTACT_LIMITS,
  CONTACT_MAILTO_ADDRESS,
  CONTACT_MAILTO_SUBJECT,
  MAX_CONTACT_JSON_BYTES,
  buildContactMailtoBody,
  buildContactMailtoUrl,
  isValidEmail,
  isValidPhone,
  openMailtoUrl,
  payloadExceedsLimit,
  planContactSubmit,
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

  it("strips control characters without changing visible copy", () => {
    const result = validateContactPayload({
      ...validBase,
      name: "Jane\u0000 Doe",
      message: "Please call us about cabling.\u0007",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypot) {
      expect(result.value.name).toBe("Jane Doe");
      expect(result.value.message).toBe("Please call us about cabling.");
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

describe("mailto draft", () => {
  const inquiry = {
    name: "Jane Doe",
    company: "Acme PH",
    email: "jane.doe@example.com",
    phone: "+63 917 123 4567",
    message: "We need structured cabling for a new office floor.",
  };

  it("builds a labeled body and skips empty optional fields", () => {
    expect(buildContactMailtoBody(inquiry)).toBe(
      [
        "Name: Jane Doe",
        "Company: Acme PH",
        "Email: jane.doe@example.com",
        "Contact Number: +63 917 123 4567",
        "Message: We need structured cabling for a new office floor.",
      ].join("\n"),
    );

    expect(buildContactMailtoBody({ ...inquiry, company: "", phone: "" })).toBe(
      [
        "Name: Jane Doe",
        "Email: jane.doe@example.com",
        "Message: We need structured cabling for a new office floor.",
      ].join("\n"),
    );
  });

  it("uses encodeURIComponent and the default CIDUS subject", () => {
    expect(CONTACT_MAILTO_SUBJECT).toBe("CIDUS Contact Form Submission");
    expect(CONTACT_MAILTO_ADDRESS).toBe("adras.freelance@gmail.com");

    const url = buildContactMailtoUrl(inquiry);
    const expected = `mailto:${CONTACT_MAILTO_ADDRESS}?subject=${encodeURIComponent(CONTACT_MAILTO_SUBJECT)}&body=${encodeURIComponent(buildContactMailtoBody(inquiry))}`;
    expect(url).toBe(expected);
    expect(url.startsWith("mailto:adras.freelance@gmail.com?")).toBe(true);
    expect(url).toContain(`subject=${encodeURIComponent("CIDUS Contact Form Submission")}`);
    expect(url).not.toContain(" ");
  });
});

describe("planContactSubmit", () => {
  it("returns field errors without a mailto URL", () => {
    const plan = planContactSubmit({ ...validBase, email: "not-an-email" });
    expect(plan.status).toBe("invalid");
    if (plan.status === "invalid") {
      expect(plan.errors.email).toMatch(/valid email/);
    }
  });

  it("does not open mailto when the honeypot is filled", () => {
    const plan = planContactSubmit({ ...validBase, website: "https://spam.example" });
    expect(plan).toEqual({ status: "honeypot" });
  });

  it("plans a mailto draft after validation", () => {
    const plan = planContactSubmit(validBase);
    expect(plan.status).toBe("mailto");
    if (plan.status === "mailto") {
      expect(plan.url).toBe(buildContactMailtoUrl(plan.value));
      expect(plan.value.email).toBe("jane.doe@example.com");
    }
  });
});

describe("openMailtoUrl", () => {
  const url = buildContactMailtoUrl({
    name: "Jane Doe",
    company: "",
    email: "jane.doe@example.com",
    phone: "",
    message: "Need a quote for network monitoring.",
  });

  it("prefers window.open and reports success", () => {
    const host = {
      open: () => ({}),
      location: { href: "https://example.com/" },
    };
    expect(openMailtoUrl(url, host)).toBe(true);
    expect(host.location.href).toBe("https://example.com/");
  });

  it("falls back to location.href when open is blocked", () => {
    const host = {
      open: () => null,
      location: { href: "https://example.com/" },
    };
    expect(openMailtoUrl(url, host)).toBe(true);
    expect(host.location.href).toBe(url);
  });

  it("returns false when mailto cannot be opened", () => {
    const host = {
      open: () => {
        throw new Error("blocked");
      },
      location: {
        set href(_value: string) {
          throw new Error("no handler");
        },
        get href() {
          return "https://example.com/";
        },
      },
    };
    expect(openMailtoUrl(url, host)).toBe(false);
  });

  it("rejects missing hosts and non-CIDUS mailto URLs", () => {
    expect(openMailtoUrl(url, null)).toBe(false);
    expect(
      openMailtoUrl("mailto:other@example.com?subject=Hi", {
        open: () => ({}),
        location: { href: "" },
      }),
    ).toBe(false);
    expect(
      openMailtoUrl("javascript:alert(1)", {
        open: () => ({}),
        location: { href: "" },
      }),
    ).toBe(false);
  });
});
