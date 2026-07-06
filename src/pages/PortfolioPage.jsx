import { useScrollReveal } from "../utils/useScrollReveal";
import SkipNavigation from "../components/SkipNavigation";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Certifications from "../components/Certifications";
import Skills from "../components/Skills";
import Companies from "../components/Companies";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  useScrollReveal();

  return (
    <div className="home-page">
      <SkipNavigation />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Companies />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
