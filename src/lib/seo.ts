import { siteMeta, expertisePillars, hero, contactSection } from "../data/content";

export const PLACEHOLDER_SITE_URL = "https://www.cidus.example";

/**
 * Canonical origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL to the real https origin before launch.
 * Rejects non-http(s) values so a bad env cannot become an open redirect or
 * `javascript:` URL in structured data.
 */
export function resolveSiteUrl(raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  if (!raw?.trim()) return PLACEHOLDER_SITE_URL;
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return PLACEHOLDER_SITE_URL;
    if (url.username || url.password) return PLACEHOLDER_SITE_URL;
    return url.origin;
  } catch {
    return PLACEHOLDER_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

/** JSON-LD in a <script> tag must not contain raw `<` (e.g. `</script>`). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Search phrases for CIDUS Solution Phils. Inc. as an IT infrastructure,
 * data, and network company. Kept in sync with on-page copy.
 */
export const seoKeywords = [
  "CIDUS",
  "CIDUS Solution Phils. Inc.",
  "IT company Philippines",
  "IT infrastructure",
  "network solutions",
  "data solutions",
  "information technology solutions",
  "structured cabling",
  "servers and connectivity",
  "technology solutions partner",
  "IT infrastructure Philippines",
  "network design and support",
];

export const seoTitle = "CIDUS Solution Phils. Inc. | IT Infrastructure & Networks";

export const seoDescription =
  "CIDUS Solution Phils. Inc. is a Philippines IT company for infrastructure, data, and network solutions that keep operations reliable and connected.";

export function buildOrganizationJsonLd() {
  const serviceNames = expertisePillars.map((pillar) => pillar.name);
  const email = contactSection.details.find((item) => item.label === "Email")?.value;
  const telephone = contactSection.details.find((item) => item.label === "Phone")?.value;
  const isPlaceholder = (value?: string) => !value || value.startsWith("[");

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: siteMeta.legalName,
    alternateName: siteMeta.shortName,
    slogan: siteMeta.tagline,
    description: seoDescription,
    url: SITE_URL,
    knowsAbout: serviceNames,
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    ...(!isPlaceholder(email) ? { email } : {}),
    ...(!isPlaceholder(telephone) ? { telephone } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CIDUS technology services",
      itemListElement: expertisePillars.map((pillar, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: pillar.name,
          description: pillar.description,
        },
      })),
    },
  };
}

export function buildWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoTitle,
    description: seoDescription,
    url: SITE_URL,
    inLanguage: "en",
    about: hero.headline,
    isPartOf: {
      "@type": "WebSite",
      name: siteMeta.legalName,
      alternateName: siteMeta.shortName,
      url: SITE_URL,
    },
  };
}
