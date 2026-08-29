/**
 * ---------------------------------------------------------------------------
 * CENTRALIZED SITE CONTENT — CIDUS
 * ---------------------------------------------------------------------------
 * Every piece of copy, label, and placeholder rendered on the site is
 * declared here. Replace the values below with the official company
 * profile / brand materials — no component code needs to change.
 *
 * Anything wrapped in [ ] / [Brackets] is an intentional placeholder and
 * should be swapped for real, client-supplied information before launch.
 * ---------------------------------------------------------------------------
 */

export const siteMeta = {
  companyName: "CIDUS",
  shortName: "CIDUS",
  tagline: "Integrated Solutions. Trusted Service. Reliable Results.",
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "clients", label: "Clients" },
  { id: "why-us", label: "Why CIDUS" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Technology · Infrastructure · Operations · Logistics · Engineering",
  headline: "Integrated Solutions. Trusted Service. Reliable Results.",
  headlineParts: ["Integrated Solutions.", "Trusted Service.", "Reliable Results."],
  subheadline:
    "CIDUS provides integrated solutions and professional services designed to support organizations across technology, infrastructure, operations, logistics, engineering, procurement, and beyond.",
  intro:
    "CIDUS brings together diverse capabilities and professional services to help organizations address complex operational and support requirements through a streamlined, one-stop approach.",
  primaryCta: { label: "Explore Our Services", href: "#services" },
  secondaryCta: { label: "Contact CIDUS", href: "#contact" },
  journey: ["Technology", "Infrastructure", "Operations", "Supply", "Engineering", "Integrated Solutions"],
  journeyCaption: "How CIDUS works, in plain language",
  journeySteps: [
    {
      label: "Technology",
      plain: "The systems people use every day.",
    },
    {
      label: "Infrastructure",
      plain: "The foundation that keeps those systems running.",
    },
    {
      label: "Operations",
      plain: "The day-to-day work that keeps an organization moving.",
    },
    {
      label: "Supply",
      plain: "Getting materials and services where they need to go.",
    },
    {
      label: "Engineering",
      plain: "Technical planning and support when work gets specialized.",
    },
    {
      label: "Integrated Solutions",
      plain: "One partner coordinating the pieces, so you don't have to.",
    },
  ],
};

export type CapabilityPreview = {
  id: string;
  name: string;
  description: string;
  icon: "infrastructure" | "operations" | "supply" | "engineering";
};

export const capabilityPreview: CapabilityPreview[] = [
  {
    id: "technology-infrastructure",
    name: "Technology & Infrastructure",
    description: "IT, data, infrastructure, and supporting technology.",
    icon: "infrastructure",
  },
  {
    id: "operations-sustainment",
    name: "Operations & Sustainment",
    description: "Force sustainment, operations, maintenance, and operational support.",
    icon: "operations",
  },
  {
    id: "supply-logistics",
    name: "Supply & Logistics",
    description: "Procurement, logistics, warehousing, and general trading.",
    icon: "supply",
  },
  {
    id: "engineering-technical",
    name: "Engineering & Technical Services",
    description: "Engineering and related technical capabilities.",
    icon: "engineering",
  },
];

export const about = {
  eyebrow: "About Us",
  heading: "One Trusted Partner for Integrated Solutions",
  paragraphs: [
    "CIDUS is a professional solutions and services provider delivering integrated capabilities across technology, infrastructure, operations, logistics, engineering, procurement, and related support services.",
    "With a focus on professionalism, reliability, responsibility, and service excellence, CIDUS works to provide practical solutions aligned with the needs of its clients and partners.",
  ],
  capabilities: [
    "Diverse service capabilities",
    "Multi-sector experience",
    "Integrated service delivery",
    "Professional execution",
    "Operational support",
    "End-to-end coordination",
  ],
};

export const missionVision = {
  mission: {
    label: "Mission",
    statement:
      "To provide professional, reliable, and integrated solutions that support the evolving needs of our clients and partners.",
  },
  vision: {
    label: "Vision",
    statement:
      "To be a trusted solutions and services partner recognized for professionalism, reliability, integrity, and dependable execution.",
  },
};

export type CoreValue = {
  id: string;
  title: string;
  description: string;
};

export const coreValues: CoreValue[] = [
  {
    id: "professionalism",
    title: "Professionalism",
    description: "We approach every engagement with discipline and professionalism.",
  },
  {
    id: "reliability",
    title: "Reliability",
    description: "We focus on dependable service and consistent execution.",
  },
  {
    id: "responsibility",
    title: "Responsibility",
    description: "We take ownership of our commitments and responsibilities.",
  },
  {
    id: "honesty",
    title: "Honesty",
    description: "We value transparency and straightforward relationships.",
  },
  {
    id: "trust",
    title: "Trust",
    description: "We build long-term relationships through integrity and accountability.",
  },
  {
    id: "one-stop-service",
    title: "One-Stop Service",
    description: "We bring multiple capabilities together to simplify the client's experience.",
  },
];

export type ServiceArea = {
  id: string;
  name: string;
  description: string;
};

export type ServiceGroup = {
  id: string;
  name: string;
  icon: "infrastructure" | "operations" | "supply" | "engineering";
  services: ServiceArea[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "technology-infrastructure",
    name: "Technology & Infrastructure",
    icon: "infrastructure",
    services: [
      {
        id: "information-technology",
        name: "Information Technology",
        description:
          "Technology solutions and services designed to support organizational systems, connectivity, and digital operations.",
      },
      {
        id: "data-infrastructure",
        name: "Data and Infrastructure",
        description:
          "Infrastructure and data-related capabilities supporting reliable and effective technology environments.",
      },
    ],
  },
  {
    id: "operations-support",
    name: "Operations & Support",
    icon: "operations",
    services: [
      {
        id: "force-sustainment",
        name: "Force Sustainment",
        description:
          "Support capabilities designed to help organizations maintain operational readiness and continuity.",
      },
      {
        id: "operations-maintenance",
        name: "Operations & Maintenance",
        description:
          "Professional support services focused on maintaining operational environments and supporting ongoing requirements.",
      },
    ],
  },
  {
    id: "supply-logistics",
    name: "Supply & Logistics",
    icon: "supply",
    services: [
      {
        id: "procurement",
        name: "Procurement",
        description:
          "Procurement support designed to help organizations source and coordinate required goods and services.",
      },
      {
        id: "logistics",
        name: "Logistics",
        description:
          "Logistics capabilities supporting the movement, coordination, and delivery of required resources.",
      },
      {
        id: "warehousing",
        name: "Warehousing",
        description:
          "Warehousing support for organized storage, handling, and management of materials and resources.",
      },
    ],
  },
  {
    id: "technical-commercial",
    name: "Technical & Commercial",
    icon: "engineering",
    services: [
      {
        id: "engineering",
        name: "Engineering",
        description:
          "Engineering capabilities supporting technical requirements, planning, implementation, and related services.",
      },
      {
        id: "general-trading",
        name: "General Trading",
        description: "Commercial sourcing and trading support across a range of organizational requirements.",
      },
    ],
  },
];

export const servicesSection = {
  eyebrow: "Our Services",
  heading: "An Integrated Service Ecosystem",
  description:
    "Nine service areas, organized into four connected capabilities. In simple terms: we help with systems, facilities, day-to-day operations, moving and storing supplies, and technical work — then bring those pieces together so you work with one coordinated partner.",
  outcome: "Integrated Solutions",
};

export type ClientOrganization = {
  id: string;
  name: string;
};

export const clientsSection = {
  eyebrow: "Clients",
  heading: "Selected Clients",
  description: "Supporting organizations across diverse operational and service requirements.",
  organizations: [
    { id: "us-embassy-ph", name: "U.S. Embassy in the Philippines" },
    { id: "un-agencies", name: "United Nations Agencies" },
    { id: "vectrus", name: "Vectrus Systems Corporation" },
  ] as ClientOrganization[],
};

export type WhyUsItem = {
  id: string;
  title: string;
  description: string;
};

export const whyUsItems: WhyUsItem[] = [
  {
    id: "integrated-solutions",
    title: "Integrated Solutions",
    description: "Multiple capabilities brought together to address diverse organizational requirements.",
  },
  {
    id: "professional-service",
    title: "Professional Service",
    description: "A professional approach focused on quality, accountability, and client needs.",
  },
  {
    id: "reliable-execution",
    title: "Reliable Execution",
    description: "Dependable coordination and execution throughout the service process.",
  },
  {
    id: "multi-sector-capabilities",
    title: "Multi-Sector Capabilities",
    description: "A broad range of services designed to support different operational environments.",
  },
  {
    id: "nationwide-experience",
    title: "Nationwide Experience",
    description: "Experience supporting requirements across different locations and operational contexts.",
  },
  {
    id: "one-stop-service",
    title: "One-Stop Service",
    description:
      "A streamlined approach that brings multiple services together, helping simplify coordination and reduce unnecessary complexity.",
  },
];

export const whyUsSection = {
  eyebrow: "Why CIDUS",
  heading: "One Integrated Solutions Partner",
  description:
    "Instead of coordinating multiple disconnected service providers, CIDUS brings complementary capabilities together through one integrated service approach.",
  convergence: ["Technology & Infrastructure", "Operations & Support", "Supply & Logistics", "Technical & Commercial"],
  outcomeChain: ["Integrated Solutions", "Trusted Service", "Reliable Results"],
};

export const contactSection = {
  eyebrow: "Contact",
  heading: "Let's Work Together",
  description:
    "Tell us about your requirements and explore how CIDUS can support your organization through integrated solutions and professional services.",
  cta: "Send an Inquiry",
  formFields: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Contact Number",
    message: "Message",
  },
  details: [
    { label: "Email", value: "[Email Address]" },
    { label: "Phone", value: "[Phone Number]" },
    { label: "Office", value: "[Office Address]" },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "X (Twitter)", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const footer = {
  description:
    "CIDUS is a professional solutions and services provider delivering integrated capabilities across technology, infrastructure, operations, logistics, engineering, and procurement.",
  navHeading: "Navigation",
  servicesHeading: "Services",
  contactHeading: "Contact",
  socialHeading: "Social",
  copyright: (year: number) => `© ${year} CIDUS. All rights reserved.`,
};
