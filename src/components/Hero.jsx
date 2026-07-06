import React, { useEffect, useRef } from "react";
import data from "../db/data.js";
import HandwritingText from "./HandwritingText";
import TypewriterText from "./TypewriterText";
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

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Estado de repulsión persistente para cada shape — interpolado con lerp
    const shapeStates = shapeRefs.current.map(() => ({
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    }));

    const threshold = 350;      // Radio activo de detección del cursor (px)
    const maxRepulsion = 180;   // Distancia máxima de empuje (px)
    const lerpSpeed = 0.06;     // Factor de interpolación (más bajo = más suave/lento)
    const returnSpeed = 0.03;   // Velocidad de retorno al soltar el mouse (más suave)

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInHero = false;
    let rafId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInHero = true;
    };

    const handleMouseLeave = () => {
      isMouseInHero = false;
    };

    // Animation loop con requestAnimationFrame para movimiento fluido
    const animate = () => {
      shapeRefs.current.forEach((inner, idx) => {
        const wrapper = wrapperRefs.current[idx];
        const state = shapeStates[idx];
        if (!inner || !wrapper || !state) return;

        // Calcular target de repulsión basado en posición del cursor
        if (isMouseInHero) {
          const rect = wrapper.getBoundingClientRect();
          const shapeCenterX = rect.left + rect.width / 2;
          const shapeCenterY = rect.top + rect.height / 2;

          const dx = shapeCenterX - mouseX;
          const dy = shapeCenterY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < threshold) {
            // Fuerza proporcional inversa a la distancia — curva cuadrática para más naturalidad
            const force = Math.pow((threshold - distance) / threshold, 1.5);
            state.targetX = (dx / (distance || 1)) * force * maxRepulsion;
            state.targetY = (dy / (distance || 1)) * force * maxRepulsion;
          } else {
            state.targetX = 0;
            state.targetY = 0;
          }
        } else {
          // Mouse fuera del hero: volver lentamente a la posición base
          state.targetX = 0;
          state.targetY = 0;
        }

        // Interpolación lineal (lerp) para movimiento suave
        const speed = isMouseInHero ? lerpSpeed : returnSpeed;
        state.currentX += (state.targetX - state.currentX) * speed;
        state.currentY += (state.targetY - state.currentY) * speed;

        // Solo aplicar transform si hay movimiento significativo (evitar micro-jitter)
        if (Math.abs(state.currentX) > 0.1 || Math.abs(state.currentY) > 0.1) {
          inner.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;
        } else {
          state.currentX = 0;
          state.currentY = 0;
          inner.style.transform = "translate3d(0px, 0px, 0)";
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseleave", handleMouseLeave);

    // Iniciar el loop de animación
    rafId = requestAnimationFrame(animate);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} id="inicio" className="hero-section-b">
      {/* Imagen de perfil de fondo a la derecha */}
      <div className="hero-b-bg-image-container">
        <img
          src="/images/perfil_optimized.webp"
          alt="Cecilia Luna"
          className="hero-b-bg-image"
          loading="eager"
          fetchPriority="high"
          width={1000}
          height={1333}
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
        <HandwritingText
          as="p"
          text="¡Hola! soy"
          className="hero-b-greeting"
          delay={0.2}
        />

        <HandwritingText
          as="h1"
          text={profile.name}
          className="hero-b-name"
          delay={0.5}
          duration={2.5}
        />

        <TypewriterText
          as="p"
          segments={[
            { text: "Frontend Developer " },
            { text: ",", className: "ampersand" },
            { text: " UX/UI Designer " },
            { text: "&", className: "ampersand" },
            { text: " Teaching" },
          ]}
          className="hero-b-role"
          delay={0.8}
        />

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
