import { describe, expect, it } from "vitest";
import { hero, navLinks, serviceGroups, siteMeta, whyUsSection } from "../data/content";
import { buildOrganizationJsonLd, buildWebPageJsonLd, seoDescription, seoKeywords, seoTitle } from "./seo";

describe("content structure for SEO and storytelling", () => {
  it("exposes a unique section id for every navigation item", () => {
    const ids = navLinks.map((link) => link.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["hero", "about", "services", "clients", "why-us", "contact"]);
  });

  it("keeps the nine official services grouped into four capabilities", () => {
    const services = serviceGroups.flatMap((group) => group.services);
    expect(serviceGroups).toHaveLength(4);
    expect(services).toHaveLength(9);
    expect(services.map((service) => service.name)).toEqual([
      "Information Technology",
      "Data and Infrastructure",
      "Force Sustainment",
      "Operations & Maintenance",
      "Procurement",
      "Logistics",
      "Warehousing",
      "Engineering",
      "General Trading",
    ]);
  });

  it("explains the process flow in plain language for non-technical readers", () => {
    expect(hero.journeySteps).toHaveLength(hero.journey.length);
    expect(hero.journeySteps.every((step) => step.plain.length > 12)).toBe(true);
    expect(hero.journeySteps.at(-1)?.label).toBe("Integrated Solutions");
  });

  it("ends the Why CIDUS story on the brand tagline chain", () => {
    expect(whyUsSection.outcomeChain).toEqual([
      "Integrated Solutions",
      "Trusted Service",
      "Reliable Results",
    ]);
  });
});

describe("SEO metadata and structured data", () => {
  it("includes high-intent keywords that match CIDUS positioning", () => {
    const joined = seoKeywords.join(" ").toLowerCase();
    expect(joined).toContain("cidus");
    expect(joined).toContain("integrated solutions");
    expect(joined).toContain("logistics");
    expect(joined).toContain("procurement");
    expect(joined).toContain("engineering");
    expect(joined).toContain("one-stop");
  });

  it("keeps title and description within practical SEO lengths", () => {
    expect(seoTitle.length).toBeGreaterThan(30);
    expect(seoTitle.length).toBeLessThanOrEqual(70);
    expect(seoDescription.length).toBeGreaterThan(110);
    expect(seoDescription.length).toBeLessThanOrEqual(180);
    expect(seoTitle).toContain(siteMeta.companyName);
  });

  it("builds valid Organization JSON-LD without placeholder contact fields", () => {
    const jsonLd = buildOrganizationJsonLd();
    expect(jsonLd["@type"]).toEqual(["Organization", "ProfessionalService"]);
    expect(jsonLd.name).toBe("CIDUS");
    expect(jsonLd.knowsAbout).toContain("Logistics");
    expect(jsonLd).not.toHaveProperty("email");
    expect(jsonLd).not.toHaveProperty("telephone");
    expect(jsonLd.hasOfferCatalog.itemListElement).toHaveLength(4);
  });

  it("builds WebPage JSON-LD pointing at the brand tagline", () => {
    const jsonLd = buildWebPageJsonLd();
    expect(jsonLd["@type"]).toBe("WebPage");
    expect(jsonLd.about).toBe(hero.headline);
    expect(jsonLd.isPartOf.name).toBe("CIDUS");
  });
});
