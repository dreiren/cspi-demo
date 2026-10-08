/**
 * ---------------------------------------------------------------------------
 * CENTRALIZED SITE CONTENT — CIDUS Solution Phils. Inc.
 * ---------------------------------------------------------------------------
 * Every piece of copy, label, and placeholder rendered on the site is
 * declared here. Replace social profile URLs when official accounts are
 * supplied — no component code needs to change.
 *
 * Anything wrapped in [ ] / [Brackets] is an intentional placeholder.
 * ---------------------------------------------------------------------------
 */

export const siteMeta = {
  companyName: "CIDUS Solution Phils. Inc.",
  shortName: "CIDUS",
  legalName: "CIDUS Solution Phils. Inc.",
  tagline: "Integrated Solutions. Trusted Service. Reliable Results.",
};

export const maintenance = {
  eyebrow: "Site under maintenance",
  heading: "CIDUS is updating the website.",
  headingLines: ["CIDUS is updating", "the website."],
  message: "We will be back shortly.",
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "values", label: "Values" },
  { id: "why-us", label: "Why CIDUS" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Information Technology Company Philippines",
  headline: "Integrated Solutions. Trusted Service. Reliable Results.",
  headlineParts: ["Integrated Solutions.", "Trusted Service.", "Reliable Results."],
  subheadline:
    "CIDUS Solution Phils. Inc. is an IT company. We help organizations with day-to-day technology, the equipment it runs on, the information they depend on, and the networks that keep people connected.",
  intro:
    "For more than half a decade we have planned, built, and supported practical technology — so operations, connectivity, and data stay reliable as the organization grows.",
  primaryCta: { label: "Explore our services", href: "#services" },
  secondaryCta: { label: "Contact CIDUS", href: "#contact" },
  journeyCaption: "What we do",
  journey: ["IT Solutions", "Data Solutions", "IT Infrastructure", "Network Solutions"],
  journeySteps: [
    {
      label: "IT Solutions",
      plain: "Day-to-day technology that helps the business run.",
    },
    {
      label: "Data Solutions",
      plain: "Keeping information available, organized, and protected.",
    },
    {
      label: "IT Infrastructure",
      plain: "The equipment and wiring that keep your systems running.",
    },
    {
      label: "Network Solutions",
      plain: "How your people, offices, and systems stay connected.",
    },
  ],
};

export type ServiceIconName = "solutions" | "data" | "infrastructure" | "network";

export type ServicePillar = {
  id: string;
  name: string;
  shortName: string;
  plain: string;
  description: string;
  icon: ServiceIconName;
};

export const servicePillars: ServicePillar[] = [
  {
    id: "information-technology-solutions",
    name: "Information Technology Solutions",
    shortName: "IT Solutions",
    plain: "Day-to-day technology that helps the business run.",
    description:
      "Technology that supports everyday operations, improves productivity, and strengthens your IT capabilities — the tools and systems people use to get work done.",
    icon: "solutions",
  },
  {
    id: "data-solutions",
    name: "Data Solutions",
    shortName: "Data Solutions",
    plain: "Keeping information available, organized, and protected.",
    description:
      "Reliable, efficient data environments: information is managed well, available when needed, kept secure, and accessible to the people who should use it.",
    icon: "data",
  },
  {
    id: "it-infrastructure",
    name: "IT Infrastructure",
    shortName: "IT Infrastructure",
    plain: "The equipment and wiring that keep your systems running.",
    description:
      "Planning, design, implementation, and improvement of servers, structured cabling, connectivity, and the supporting technology systems underneath day-to-day work.",
    icon: "infrastructure",
  },
  {
    id: "network-solutions",
    name: "Network Solutions",
    shortName: "Network Solutions",
    plain: "How your people, offices, and systems stay connected.",
    description:
      "Design, deployment, optimization, monitoring, and support for connectivity that is stable, secure, and high-performing.",
    icon: "network",
  },
];

/** Hero chips reuse the four official pillars. */
export const capabilityPreview = servicePillars;

export const about = {
  eyebrow: "About Us",
  heading: "More than half a decade IT company built around practical technology",
  paragraphs: [
    "CIDUS Solution Phils. Inc. is more than half a decade information technology company specializing in IT infrastructure, data solutions, and network solutions.",
    "We were established to provide reliable, scalable, and practical technology that helps organizations improve operations, connectivity, data management, and their overall IT environment.",
    "We design, deploy, and support technology infrastructure. We work closely with clients to understand operational requirements and deliver solutions aligned with business objectives — not a catalog of products looking for a problem.",
  ],
  quote:
    "At CIDUS, we build trust through integrity, deliver confidence through dependable technology, and create lasting value through service excellence.",
  capabilities: [
    "Reliable and practical IT solutions",
    "Professional infrastructure design and implementation",
    "Secure and dependable network environments",
    "Solutions that can grow with you",
    "Responsive technical support",
    "Work aligned with how your organization actually operates",
  ],
  approachCaption: "How we typically work",
  approachSteps: [
    {
      label: "Assessment and planning",
      plain: "We start by understanding how your organization works and what the real need is.",
    },
    {
      label: "Implementation",
      plain: "We put the right systems, infrastructure, and connections in place.",
    },
    {
      label: "Support",
      plain: "We stay available after go-live, so the environment keeps working.",
    },
    {
      label: "Continuous improvement",
      plain: "We keep refining the setup as needs change — for long-term value, not a one-time install.",
    },
  ],
  diagramCaption: "IT, data, infrastructure, and networks — working as one",
};

export const missionVision = {
  mission: {
    label: "Mission",
    statement:
      "To empower organizations through dependable technology solutions that improve connectivity, operational efficiency, data availability, and business continuity.",
  },
  vision: {
    label: "Vision",
    statement:
      "To become a trusted technology solutions partner recognized for delivering innovative, reliable, and sustainable IT, data, infrastructure, and network solutions.",
  },
};

export type CoreValue = {
  id: string;
  letter: "C" | "I" | "D" | "U" | "S";
  title: string;
  description: string;
};

export const coreValues: CoreValue[] = [
  {
    id: "customer-commitment",
    letter: "C",
    title: "Customer Commitment",
    description:
      "Clients sit at the center of how we work. We listen, we take time to understand, and we deliver solutions that create real business value.",
  },
  {
    id: "integrity",
    letter: "I",
    title: "Integrity",
    description:
      "We work with honesty, transparency, and professionalism. We do what is right, and we honor the commitments we make.",
  },
  {
    id: "dependability",
    letter: "D",
    title: "Dependability",
    description:
      "Clients should be able to rely on the solutions we deliver. Reliability, accountability, and consistent service run from implementation through after-sales support.",
  },
  {
    id: "understanding",
    letter: "U",
    title: "Understanding",
    description:
      "The best technology starts with the real need. We take time to understand the business, the challenges, and the objectives before we recommend a solution.",
  },
  {
    id: "service-excellence",
    letter: "S",
    title: "Service Excellence",
    description:
      "Excellence is the standard from planning and design through deployment, support, and continuous improvement.",
  },
];

export type GuidingPrinciple = {
  id: string;
  title: string;
  description: string;
};

export const guidingPrinciples: GuidingPrinciple[] = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "We look for practical ways to improve how technology supports the organization — useful change, not change for its own sake.",
  },
  {
    id: "professionalism",
    title: "Professionalism",
    description: "We work with discipline, respect, and a consistent standard of conduct on every engagement.",
  },
  {
    id: "partnership",
    title: "Partnership",
    description: "We work alongside clients as a long-term technology partner, not a one-time vendor.",
  },
  {
    id: "accountability",
    title: "Accountability",
    description: "We take ownership of our commitments and follow through on the work we deliver.",
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    description: "We keep refining solutions after they are in place, so they stay reliable as needs change.",
  },
];

export const valuesSection = {
  eyebrow: "Our Values",
  heading: "The Values Behind CIDUS",
  description:
    "Every letter represents a value that shapes how we work, collaborate, and deliver. Hover over each letter to explore the principles behind every project.",
  acronymCaption: "What CIDUS stands for",
  principlesEyebrow: "Guiding principles",
  principlesHeading: "How we show up on every engagement",
  quote: about.quote,
};

export const servicesSection = {
  eyebrow: "Services",
  heading: "Four ways we support your IT environment",
  description:
    "We focus on four connected areas. Each one is listed in professional terms, then in everyday language so anyone in the organization can follow along.",
  outcome: "Integrated solutions that create long-term value",
  outcomePlain: "The goal is not merely products, but technology that keeps working as the organization grows.",
};

export type ClientLogoShape = "default" | "circle";

export type ClientOrganization = {
  id: string;
  name: string;
  logoSrc: string;
  logoShape?: ClientLogoShape;
};

export const clientsSection = {
  eyebrow: "Clients",
  heading: "Our clients",
  description: "Organizations we support with practical IT, data, infrastructure, and network solutions.",
  organizations: [
    {
      id: "us-embassy-manila",
      name: "U.S. Embassy Manila",
      logoSrc: "/clients/us-embassy-manila.jpg",
      logoShape: "circle",
    },
    {
      id: "universal-corporation",
      name: "Universal Corporation",
      logoSrc: "/clients/universal-corporation.png",
    },
    {
      id: "phelps-dodge",
      name: "Phelps Dodge",
      logoSrc: "/clients/phelps-dodge.png",
    },
  ] as ClientOrganization[],
};

export type WhyUsItem = {
  id: string;
  title: string;
  description: string;
};

export const whyUsItems: WhyUsItem[] = [
  {
    id: "five-years",
    title: "More than half a decade of experience",
    description:
      "We have spent more than half a decade designing, deploying, and supporting technology infrastructure for organizations that need it to work every day.",
  },
  {
    id: "growing-capability",
    title: "We keep building our capability",
    description:
      "CIDUS continues to build capabilities, partnerships, and technical expertise so we can support clients as their IT environment grows.",
  },
  {
    id: "long-term-partner",
    title: "A long-term IT partner",
    description:
      "We aim to be more than a technology provider — a partner that understands your challenges and stays with you after the project is live.",
  },
  {
    id: "understand-first",
    title: "We understand the need first",
    description:
      "Before we recommend a solution, we take time to understand the business, the challenges, and the objectives.",
  },
  {
    id: "practical-value",
    title: "Practical solutions, lasting value",
    description:
      "Technology should be reliable, secure, scalable, and aligned with actual organizational needs — not a stack of products looking for a home.",
  },
  {
    id: "continued-growth",
    title: "Support for continued growth",
    description:
      "From implementation through after-sales support, we help the IT environment stay ready as the organization grows.",
  },
];

export const whyUsSection = {
  eyebrow: "Why CIDUS",
  heading: "More than a technology provider",
  description:
    "With more than half a decade of experience, CIDUS continues to build capabilities, partnerships, and technical expertise. We aim to be a long-term IT partner that understands your challenges, provides practical solutions, and supports continued growth.",
  convergence: ["IT Solutions", "Data Solutions", "IT Infrastructure", "Network Solutions"],
  outcomeChain: ["Integrated Solutions", "Trusted Service", "Reliable Results"],
};

/**
 * Temporary. While false, Contact CIDUS buttons and the inquiry form stay
 * off the page. Set to true to restore them.
 */
export const contactInquiryEnabled = false;

export type SocialNetwork = "linkedin" | "x" | "facebook";

export type SocialLink = {
  id: SocialNetwork;
  label: string;
  href: string;
};

export const contactSection = {
  eyebrow: "Contact",
  heading: "Talk with us about your IT environment",
  description:
    "Share an infrastructure, data, or network question. We will look at how CIDUS Solution Phils. Inc. can help with a practical next step.",
  directoryDescription:
    "Reach CIDUS Solution Phils. Inc. about infrastructure, data, or network needs. The details below are how to get in touch.",
  cta: "Send an inquiry",
  formFields: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Contact Number",
    message: "How can we help?",
  },
  details: [
    { label: "Email", value: "info@cidussolution.com" },
    { label: "Phone", value: "+63 9158068000 / +63 9279439027" },
    { label: "Office", value: "Address: 12/F, Unit 1206, The Trade and Financial Tower, 7th Avenue Cor. 32nd Street, BGC, Fort Bonifacio, Taguig City, Philippines 1634" },
  ],
  socialHeading: "Socials",
  socialLinks: [
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "x", label: "X (Twitter)", href: "#" },
    { id: "facebook", label: "Facebook", href: "#" },
  ] as SocialLink[],
};

export const footer = {
  description:
    "CIDUS Solution Phils. Inc. is a Philippines IT company specializing in information technology solutions, data solutions, IT infrastructure, and network solutions.",
  navHeading: "Navigation",
  servicesHeading: "Services",
  contactHeading: "Contact",
  socialHeading: "Socials",
  copyright: (year: number) => `© ${year} CIDUS Solution Phils. Inc. All rights reserved.`,
};
