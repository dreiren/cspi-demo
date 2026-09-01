import { describe, expect, it } from "vitest";
import {
  about,
  coreValues,
  expertisePillars,
  guidingPrinciples,
  hero,
  navLinks,
  siteMeta,
  whyUsSection,
} from "../data/content";
import { buildOrganizationJsonLd, buildWebPageJsonLd, seoDescription, seoKeywords, seoTitle } from "./seo";

describe("content structure for SEO and storytelling", () => {
  it("exposes a unique section id for every navigation item", () => {
    const ids = navLinks.map((link) => link.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["hero", "about", "expertise", "values", "why-us", "clients", "contact"]);
  });

  it("keeps the four official expertise pillars", () => {
    expect(expertisePillars).toHaveLength(4);
    expect(expertisePillars.map((pillar) => pillar.name)).toEqual([
      "Information Technology Solutions",
      "Data Solutions",
      "IT Infrastructure",
      "Network Solutions",
    ]);
    expect(expertisePillars.every((pillar) => pillar.plain.length > 12)).toBe(true);
  });

  it("does not position CIDUS as logistics, warehousing, or general trading", () => {
    const blob = [
      hero.eyebrow,
      hero.subheadline,
      hero.intro,
      ...about.paragraphs,
      ...expertisePillars.map((pillar) => `${pillar.name} ${pillar.description}`),
      whyUsSection.heading,
      whyUsSection.description,
    ]
      .join(" ")
      .toLowerCase();

    expect(blob).not.toContain("warehousing");
    expect(blob).not.toContain("force sustainment");
    expect(blob).not.toContain("general trading");
    expect(blob).not.toContain("procurement");
    expect(blob).not.toContain("nationwide");
  });

  it("explains the four pillars in plain language for non-technical readers", () => {
    expect(hero.journeySteps).toHaveLength(hero.journey.length);
    expect(hero.journeySteps.every((step) => step.plain.length > 12)).toBe(true);
    expect(hero.journeySteps.map((step) => step.label)).toEqual(hero.journey);
  });

  it("spells CIDUS through the five core values", () => {
    expect(coreValues.map((value) => value.letter).join("")).toBe("CIDUS");
    expect(guidingPrinciples).toHaveLength(5);
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
    expect(joined).toContain("cidus solution phils");
    expect(joined).toContain("it infrastructure");
    expect(joined).toContain("network solutions");
    expect(joined).toContain("data solutions");
    expect(joined).toContain("philippines");
    expect(joined).not.toContain("logistics");
    expect(joined).not.toContain("warehousing");
    expect(joined).not.toContain("force sustainment");
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
    expect(jsonLd.name).toBe("CIDUS Solution Phils. Inc.");
    expect(jsonLd.alternateName).toBe("CIDUS");
    expect(jsonLd.knowsAbout).toContain("IT Infrastructure");
    expect(jsonLd.knowsAbout).toContain("Network Solutions");
    expect(jsonLd.knowsAbout).not.toContain("Logistics");
    expect(jsonLd.areaServed).toEqual({ "@type": "Country", name: "Philippines" });
    expect(jsonLd).not.toHaveProperty("email");
    expect(jsonLd).not.toHaveProperty("telephone");
    expect(jsonLd.hasOfferCatalog.itemListElement).toHaveLength(4);
  });

  it("builds WebPage JSON-LD pointing at the brand tagline", () => {
    const jsonLd = buildWebPageJsonLd();
    expect(jsonLd["@type"]).toBe("WebPage");
    expect(jsonLd.about).toBe(hero.headline);
    expect(jsonLd.isPartOf.name).toBe("CIDUS Solution Phils. Inc.");
  });
});
