/**
 * ---------------------------------------------------------------------------
 * CENTRALIZED SITE CONTENT
 * ---------------------------------------------------------------------------
 * Every piece of copy, label, and placeholder rendered on the site is
 * declared here. Replace the values below with real company content —
 * no component code needs to change.
 *
 * Anything wrapped in [ ] / [Brackets] is an intentional placeholder and
 * should be swapped for real, client-supplied information before launch.
 * ---------------------------------------------------------------------------
 */

export const siteMeta = {
  companyName: "[Company Name]",
  shortName: "[Company]",
  tagline: "Connecting Technology. Enabling Better Operations.",
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "clients", label: "Clients" },
  { id: "why-us", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "IT Infrastructure · Network Solutions · Data Solutions",
  headline: "Technology That Connects Possibilities",
  subheadline:
    "We provide technology solutions that help organizations build reliable infrastructure, improve connectivity, and manage their technology environment more effectively.",
  primaryCta: { label: "Explore Our Services", href: "#services" },
  secondaryCta: { label: "Contact Us", href: "#contact" },
  journey: ["Infrastructure", "Connectivity", "Network", "Data", "Operations"],
};

export const about = {
  eyebrow: "About Us",
  heading: "Technology Built Around Your Organization",
  paragraphs: [
    "We provide technology solutions designed to help organizations build, connect, and manage their technology environments. Our approach focuses on practical solutions that support infrastructure, connectivity, data, and day-to-day operations.",
    "From foundational infrastructure to connected technology environments, we help bring the right components together to support organizational needs.",
  ],
  highlights: [
    { label: "Infrastructure", description: "A dependable technical foundation." },
    { label: "Connectivity", description: "Systems and locations, connected." },
    { label: "Data", description: "Managed, structured, and accessible." },
  ],
};

export type ServiceArea = {
  id: string;
  index: string;
  name: string;
  description: string;
  supportingAreas: string[];
};

export const services: ServiceArea[] = [
  {
    id: "it-infrastructure",
    index: "01",
    name: "IT Infrastructure",
    description:
      "Technology infrastructure that provides a reliable foundation for modern organizational environments.",
    supportingAreas: ["Servers", "Structured Cabling", "Connectivity", "Supporting Technology Systems"],
  },
  {
    id: "network-solutions",
    index: "02",
    name: "Network Solutions",
    description:
      "Network solutions designed to help organizations connect people, systems, locations, and technology.",
    supportingAreas: ["Network Infrastructure", "Connectivity", "Network Management", "Network Optimization"],
  },
  {
    id: "data-solutions",
    index: "03",
    name: "Data Solutions",
    description:
      "Technology solutions that help organizations manage, connect, and utilize their data more effectively.",
    supportingAreas: ["Data Infrastructure", "Data Management", "Data Connectivity", "Data Support"],
  },
];

export const servicesSection = {
  eyebrow: "Services",
  heading: "A Connected Technology Ecosystem",
  description:
    "Our core capabilities work together as a single system — infrastructure supports the network, the network carries the data, and the data drives better operations.",
  outcome: "Connected Technology Environment",
};

export const clientsSection = {
  eyebrow: "Clients",
  heading: "Trusted by Organizations",
  description:
    "We work with organizations that rely on technology to support their operations, connectivity, and business needs.",
  placeholderCount: 6,
};

export type WhyUsItem = {
  id: string;
  title: string;
  description: string;
};

export const whyUsItems: WhyUsItem[] = [
  {
    id: "practical-approach",
    title: "Practical Approach",
    description: "We focus on solutions aligned with real organizational needs.",
  },
  {
    id: "connected-solutions",
    title: "Connected Solutions",
    description: "We consider how infrastructure, networks, and data work together.",
  },
  {
    id: "technology-focus",
    title: "Technology Focus",
    description: "We provide solutions designed around modern technology environments.",
  },
  {
    id: "reliable-support",
    title: "Reliable Support",
    description: "We aim to provide dependable technology solutions and professional support.",
  },
];

export const whyUsSection = {
  eyebrow: "Why Us",
  heading: "One Connected Technology Environment",
  description:
    "Infrastructure, network, and data are not separate projects — they are one connected environment that supports better operations.",
  convergence: ["Infrastructure", "Network", "Data"],
  outcome: "Better Operations",
};

export const contactSection = {
  eyebrow: "Contact",
  heading: "Let's Connect",
  description: "Tell us about your technology needs and let's explore how we can help.",
  cta: "Send Inquiry",
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
    "[Company Description] — a short, replaceable summary of what the company does and the value it provides to clients.",
  navHeading: "Navigation",
  servicesHeading: "Services",
  contactHeading: "Contact",
  socialHeading: "Social",
  copyright: (year: number) => `© ${year} [Company Name]. All rights reserved.`,
};
