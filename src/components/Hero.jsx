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

        <p data-reveal="up" className="hero-b-greeting">
          ¡Hola! soy {profile.name}
        </p>

        <h1 data-reveal="up" data-delay="80" className="hero-b-name">
          {profile.name} Luna
        </h1>

        <p data-reveal="up" data-delay="160" className="hero-b-role">
          Frontend Developer <span className="ampersand">&amp;</span> UX/UI Designer —{" "}
          <span className="hero-b-underline">diseño con lógica, desarrollo con estética.</span>
        </p>

        <p data-reveal="up" data-delay="220" className="hero-b-bio">
          Construyo productos donde el código funciona y la experiencia enamora — del wireframe al deploy.
        </p>

        <div data-reveal="up" data-delay="300" className="hero-b-buttons">
          <a
            href="#proyectos"
            className="hero-b-btn-primary"
            onClick={(e) => handleLinkClick(e, "#proyectos")}
          >
            Ver proyectos <span className="arrow">→</span>
          </a>
          <a
            href="#contacto"
            className="hero-b-btn-secondary"
            onClick={(e) => handleLinkClick(e, "#contacto")}
          >
            Trabajemos juntos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
