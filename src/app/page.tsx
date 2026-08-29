import { Navbar } from "../components/Navbar";
import { About } from "../sections/About";
import { Clients } from "../sections/Clients";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";
import { Hero } from "../sections/Hero";
import { Services } from "../sections/Services";
import { WhyUs } from "../sections/WhyUs";

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
