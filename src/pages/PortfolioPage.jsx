import SEO from "../components/SEO";
import React, { Suspense, lazy } from 'react';
import { useScrollReveal } from "../utils/useScrollReveal";
import SkipNavigation from "../components/SkipNavigation";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";

const Certifications = lazy(() => import("../components/Certifications"));
const Skills = lazy(() => import("../components/Skills"));
const Companies = lazy(() => import("../components/Companies"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

const HomePage = () => {
  useScrollReveal();

  return (
    <div className="home-page">
      <SEO />
      <SkipNavigation />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Certifications />
          <Skills />
          <Companies />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
