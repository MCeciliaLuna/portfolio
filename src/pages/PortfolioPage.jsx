import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Companies from '../components/Companies';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Companies />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default HomePage;