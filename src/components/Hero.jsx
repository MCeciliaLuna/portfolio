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
      {/* Imagen de perfil de fondo a la derecha */}
      <div className="hero-b-bg-image-container">
        <img
          src="/images/perfil.png"
          alt="Cecilia Luna"
          className="hero-b-bg-image"
          loading="eager"
        />
        <div className="hero-b-bg-image-white-filter"></div>
        <div className="hero-b-bg-image-fade"></div>
      </div>

      {/* Decorative blurred background shapes */}
      <div className="hero-b-shape-top"></div>
      <div className="hero-b-shape-bottom"></div>

      <div className="hero-b-content-wrapper">
        <p data-reveal="up" className="hero-b-greeting">
          ¡Hola! soy
        </p>

        <h1 data-reveal="up" data-delay="80" className="hero-b-name">
          {profile.name}
        </h1>

        <p data-reveal="up" data-delay="160" className="hero-b-role">
          Frontend Developer <span className="ampersand">&amp;</span> UX/UI Designer
        </p>

        <div data-reveal="up" data-delay="300" className="hero-b-buttons">
          <a
            href="#proyectos"
            className="hero-b-btn-secondary"
            onClick={(e) => handleLinkClick(e, "#proyectos")}
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="hero-b-btn-primary"
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
