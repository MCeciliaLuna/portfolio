import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./MePage.css";
import data from "../db/data.js";
import meData from "../db/me.json";
import ProfileAvatar from "../components/ProfileAvatar";
import DynamicIcon from "../components/DynamicIcon";

// Configuration for 5 shapes representing the color palette (from Hero.jsx)
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

const MePage = () => {
  const { profile } = data;
  const { socialMedia, websites } = meData;
  
  const mePageRef = useRef(null);

  // Dynamic ref arrays
  const shapeRefs = useRef([]);
  const wrapperRefs = useRef([]);

  // Reset arrays on each render so they match the elements correctly
  shapeRefs.current = [];
  wrapperRefs.current = [];

  useEffect(() => {
    const pageElement = mePageRef.current;
    if (!pageElement) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Estado de repulsión persistente para cada shape — interpolado con lerp
    const shapeStates = shapesData.map(() => ({
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    }));

    const threshold = 350;      // Radio activo de detección del cursor (px)
    const maxRepulsion = 150;   // Distancia máxima de empuje (px)
    const lerpSpeed = 0.06;     // Factor de interpolación (más bajo = más suave/lento)
    const returnSpeed = 0.03;   // Velocidad de retorno al soltar el mouse (más suave)

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInPage = false;
    let rafId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInPage = true;
    };

    const handleMouseLeave = () => {
      isMouseInPage = false;
    };

    // Animation loop con requestAnimationFrame para movimiento fluido
    const animate = () => {
      shapeRefs.current.forEach((inner, idx) => {
        const wrapper = wrapperRefs.current[idx];
        const state = shapeStates[idx];
        if (!inner || !wrapper || !state) return;

        // Calcular target de repulsión basado en posición del cursor
        if (isMouseInPage) {
          const rect = wrapper.getBoundingClientRect();
          const shapeCenterX = rect.left + rect.width / 2;
          const shapeCenterY = rect.top + rect.height / 2;

          const dx = shapeCenterX - mouseX;
          const dy = shapeCenterY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < threshold) {
            // Fuerza proporcional inversa a la distancia
            const force = Math.pow((threshold - distance) / threshold, 1.5);
            state.targetX = (dx / (distance || 1)) * force * maxRepulsion;
            state.targetY = (dy / (distance || 1)) * force * maxRepulsion;
          } else {
            state.targetX = 0;
            state.targetY = 0;
          }
        } else {
          // Mouse fuera: volver lentamente a la posición base
          state.targetX = 0;
          state.targetY = 0;
        }

        // Interpolación lineal (lerp) para movimiento suave
        const speed = isMouseInPage ? lerpSpeed : returnSpeed;
        state.currentX += (state.targetX - state.currentX) * speed;
        state.currentY += (state.targetY - state.currentY) * speed;

        // Solo aplicar transform si hay movimiento significativo
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

    pageElement.addEventListener("mousemove", handleMouseMove);
    pageElement.addEventListener("mouseleave", handleMouseLeave);

    // Iniciar el loop de animación
    rafId = requestAnimationFrame(animate);

    return () => {
      pageElement.removeEventListener("mousemove", handleMouseMove);
      pageElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={mePageRef} className="me-page">
      {/* Imagen de perfil de fondo a la derecha (estilo Hero.jsx) */}
      <div className="me-bg-image-container">
        <img
          src="/images/perfil_optimized.webp"
          alt="Cecilia Luna"
          className="me-bg-image"
          loading="eager"
          fetchPriority="high"
          width={1000}
          height={1333}
        />
        <div className="me-bg-image-white-filter"></div>
        <div className="me-bg-image-fade"></div>
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

      <div className="me-content-wrapper">
        <section className="me-name-section">
          <h1 className="me-page-name">{profile.name} Luna</h1>
          <p className="me-page-tagline">Frontend Developer, UX/UI Designer & Teaching</p>
        </section>

        <section className="me-buttons-section">
          <div className="me-social-buttons">
            {socialMedia.map((social) => (
              <div key={social.id}>
                <Button
                  icon={<DynamicIcon iconName={social.icon} />}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  aria-label={`Ver ${social.title}`}
                ></Button>
              </div>
            ))}
          </div>
        </section>

        <section className="me-links-section">
          <div className="website-buttons">
            {websites.map((website) => (
              <div key={website.id}>
                <Button
                  type="default"
                  size="large"
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-button"
                  block
                >
                  {website.title}
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="me-span-section">
          <span>
            Mate o café, una pc y <strong style={{ color: "var(--accent-pink)" }}>siempre buena onda</strong>.
          </span>
        </section>
      </div>
    </div>
  );
};

export default MePage;
