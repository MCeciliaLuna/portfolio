import React, { useEffect, useRef } from "react";
import data from "../db/data.js";
import "./Hero.css";

const Hero = () => {
  const { profile } = data;
  const heroRef = useRef(null);
  const shapeTopRef = useRef(null);
  const shapeBottomRef = useRef(null);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e) => {
      const threshold = 240;
      const maxRepulsion = 130;

      [shapeTopRef, shapeBottomRef].forEach((ref) => {
        const shape = ref.current;
        if (!shape) return;

        const rect = shape.getBoundingClientRect();
        const shapeCenterX = rect.left + rect.width / 2;
        const shapeCenterY = rect.top + rect.height / 2;

        const dx = shapeCenterX - e.clientX;
        const dy = shapeCenterY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < threshold) {
          const force = (threshold - distance) / threshold;
          // Calculate exponential push force
          const pushX = (dx / (distance || 1)) * force * maxRepulsion;
          const pushY = (dy / (distance || 1)) * force * maxRepulsion;

          shape.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
        } else {
          shape.style.transform = "translate3d(0px, 0px, 0)";
        }
      });
    };

    const handleMouseLeave = () => {
      [shapeTopRef, shapeBottomRef].forEach((ref) => {
        const shape = ref.current;
        if (shape) {
          shape.style.transform = "translate3d(0px, 0px, 0)";
        }
      });
    };

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} id="inicio" className="hero-section-b">
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

      {/* Decorative blurred background shapes inside wrappers for slow animation */}
      <div className="hero-b-shape-top-wrapper">
        <div ref={shapeTopRef} className="hero-b-shape-top"></div>
      </div>
      <div className="hero-b-shape-bottom-wrapper">
        <div ref={shapeBottomRef} className="hero-b-shape-bottom"></div>
      </div>

      <div className="hero-b-content-wrapper">
        <p data-reveal="up" className="hero-b-greeting">
          ¡Hola! soy
        </p>

        <h1 data-reveal="up" data-delay="80" className="hero-b-name">
          {profile.name}
        </h1>

        <p data-reveal="up" data-delay="160" className="hero-b-role">
          Frontend Developer <span className="ampersand">,</span> UX/UI Designer <span className="ampersand">&amp;</span> Teaching
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
