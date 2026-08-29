import { siteMeta, serviceGroups, hero, contactSection } from "../data/content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cidus.example";

/**
 * Primary search phrases for CIDUS as an integrated solutions provider.
 * Used in metadata and to keep on-page copy aligned with how people search.
 */
export const seoKeywords = [
  "CIDUS",
  "integrated solutions",
  "professional services",
  "one-stop service provider",
  "IT infrastructure",
  "information technology services",
  "data and infrastructure",
  "operations and maintenance",
  "force sustainment",
  "procurement services",
  "logistics and warehousing",
  "engineering services",
  "general trading",
  "technology infrastructure operations logistics",
  "trusted professional partner",
];

export const seoTitle = "CIDUS | Integrated Solutions & Professional Services";

export const seoDescription =
  "CIDUS brings technology, infrastructure, operations, logistics, engineering, and procurement together as one trusted partner for professional services.";

export function buildOrganizationJsonLd() {
  const serviceNames = serviceGroups.flatMap((group) => group.services.map((service) => service.name));
  const email = contactSection.details.find((item) => item.label === "Email")?.value;
  const telephone = contactSection.details.find((item) => item.label === "Phone")?.value;
  const isPlaceholder = (value?: string) => !value || value.startsWith("[");

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: siteMeta.companyName,
    slogan: siteMeta.tagline,
    description: seoDescription,
    url: SITE_URL,
    knowsAbout: serviceNames,
    ...(!isPlaceholder(email) ? { email } : {}),
    ...(!isPlaceholder(telephone) ? { telephone } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CIDUS integrated services",
      itemListElement: serviceGroups.map((group, index) => ({
        "@type": "OfferCatalog",
        position: index + 1,
        name: group.name,
        itemListElement: group.services.map((service, serviceIndex) => ({
          "@type": "Offer",
          position: serviceIndex + 1,
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
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
      name: siteMeta.companyName,
      url: SITE_URL,
    },
  };
}
