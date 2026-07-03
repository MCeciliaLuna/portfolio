import React, { useEffect, useRef } from "react";
import data from "../db/data.js";
import "./Hero.css";

const Hero = () => {
  const { profile } = data;
  const heroRef = useRef(null);

  // Configuration for 5 shapes representing the color palette
  const shapesData = [
    {
      id: 1,
      wrapperClass: "hero-b-shape-1-wrapper",
      color: "radial-gradient(circle, rgba(245, 0, 98, 0.16), transparent 70%)" // Pink
    },
    {
      id: 2,
      wrapperClass: "hero-b-shape-2-wrapper",
      color: "radial-gradient(circle, rgba(255, 160, 51, 0.20), transparent 70%)" // Orange
    },
    {
      id: 3,
      wrapperClass: "hero-b-shape-3-wrapper",
      color: "radial-gradient(circle, rgba(122, 0, 98, 0.18), transparent 70%)" // Purple
    },
    {
      id: 4,
      wrapperClass: "hero-b-shape-4-wrapper",
      color: "radial-gradient(circle, rgba(138, 146, 0, 0.16), transparent 70%)" // Lime/Green
    },
    {
      id: 5,
      wrapperClass: "hero-b-shape-5-wrapper",
      color: "radial-gradient(circle, rgba(255, 160, 51, 0.18), transparent 70%)" // Secondary Orange/Yellow
    }
  ];

  // Dynamic ref arrays
  const shapeRefs = useRef([]);
  const wrapperRefs = useRef([]);

  // Reset arrays on each render so they match the elements correctly
  shapeRefs.current = [];
  wrapperRefs.current = [];

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
      const threshold = 320; // Active radius from center
      const maxRepulsion = 220; // Pixels to push away

      shapeRefs.current.forEach((inner, idx) => {
        const wrapper = wrapperRefs.current[idx];
        if (!inner || !wrapper) return;

        // Measure parent wrapper to get base animated center, preventing translation feedback loops
        const rect = wrapper.getBoundingClientRect();
        const shapeCenterX = rect.left + rect.width / 2;
        const shapeCenterY = rect.top + rect.height / 2;

        const dx = shapeCenterX - e.clientX;
        const dy = shapeCenterY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < threshold) {
          const force = (threshold - distance) / threshold;
          // Apply proportional push force vector
          const pushX = (dx / (distance || 1)) * force * maxRepulsion;
          const pushY = (dy / (distance || 1)) * force * maxRepulsion;

          inner.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
        } else {
          inner.style.transform = "translate3d(0px, 0px, 0)";
        }
      });
    };

    const handleMouseLeave = () => {
      shapeRefs.current.forEach((inner) => {
        if (inner) {
          inner.style.transform = "translate3d(0px, 0px, 0)";
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
      {shapesData.map((shape) => (
        <div
          key={shape.id}
          ref={(el) => {
            if (el) wrapperRefs.current.push(el);
          }}
          className={`hero-b-shape-wrapper ${shape.wrapperClass}`}
        >
          <div
            ref={(el) => {
              if (el) shapeRefs.current.push(el);
            }}
            className="hero-b-shape"
            style={{ background: shape.color }}
          ></div>
        </div>
      ))}

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
