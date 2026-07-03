import React from "react";
import data from "../db/data.js";
import "./Hero.css";

const Hero = () => {
  const { profile } = data;

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="hero-section-b">
      {/* Decorative blurred background shapes */}
      <div className="hero-b-shape-top"></div>
      <div className="hero-b-shape-bottom"></div>

      <div className="hero-b-content-wrapper">
        <img
          src={profile.profileImage}
          alt={profile.name}
          className="hero-b-avatar"
          loading="eager"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.backgroundColor = "var(--purple-dark)";
            e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem; font-family: var(--font-caveat);">${profile.name}</div>`;
          }}
        />

        <h1 data-reveal="up" className="hero-b-headline">
          Hola, soy <span className="hero-highlight-caveat">Cecilia</span>. Diseño y desarrollo productos digitales desde cero.
        </h1>

        <p data-reveal="up" data-delay="120" className="hero-b-description">
          Combino <strong className="hero-strong">diseño UX/UI</strong>, código <strong className="hero-strong">Frontend</strong> e <strong className="hero-strong">Inteligencia Artificial</strong> para crear experiencias digitales intuitivas, atractivas y funcionales.
        </p>

        <div data-reveal="up" data-delay="200" className="hero-b-buttons">
          <a
            href="#contacto"
            className="hero-b-btn-primary"
            onClick={(e) => handleLinkClick(e, "#contacto")}
          >
            Hablemos de tu proyecto <span className="arrow">→</span>
          </a>
          <a
            href="#proyectos"
            className="hero-b-btn-secondary"
            onClick={(e) => handleLinkClick(e, "#proyectos")}
          >
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
