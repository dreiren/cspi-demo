import dynamic from "next/dynamic";
import { Navbar } from "../components/Navbar";
import { Hero } from "../sections/Hero";

const sectionFallback = (
  <div className="min-h-[50vh] bg-transparent" aria-hidden="true" />
);

const About = dynamic(() => import("../sections/About").then((mod) => mod.About), {
  loading: () => sectionFallback,
});
const Services = dynamic(() => import("../sections/Services").then((mod) => mod.Services), {
  loading: () => sectionFallback,
});
const Clients = dynamic(() => import("../sections/Clients").then((mod) => mod.Clients), {
  loading: () => sectionFallback,
});
const WhyUs = dynamic(() => import("../sections/WhyUs").then((mod) => mod.WhyUs), {
  loading: () => sectionFallback,
});
const Contact = dynamic(() => import("../sections/Contact").then((mod) => mod.Contact), {
  loading: () => sectionFallback,
});
const Footer = dynamic(() => import("../sections/Footer").then((mod) => mod.Footer), {
  loading: () => sectionFallback,
});

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Clients />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
