import React, { useRef, useEffect, useState } from "react";
import {
  GlobalOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaFigma } from "react-icons/fa";
import { motion } from "framer-motion";

import TypewriterText from "./TypewriterText";
import data from "../db/data.js";
import "./Projects.css";

// Gradientes para tarjetas
const gradients = [
  "var(--proj-grad-0)",
  "var(--proj-grad-1)",
  "var(--proj-grad-2)",
  "var(--proj-grad-3)",
  "var(--proj-grad-4)",
  "var(--proj-grad-5)",
  "var(--proj-grad-6)",
  "var(--proj-grad-7)",
  "var(--proj-grad-8)",
  "var(--proj-grad-9)",
  "var(--proj-grad-10)",
  "var(--proj-grad-11)",
  "var(--proj-grad-12)",
];

const Projects = () => {
  const { projects } = data;
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Scroll listener para calcular progreso del efecto stacked (todos los viewports)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      const topOffset = 80;
      const scrolled = topOffset - rect.top;
      const maxScroll = containerHeight - (windowHeight - topOffset);

      let progress = scrolled / maxScroll;
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProjectTags = (project) => {
    if (project.figmaUrl) return ["UX/UI", "Figma"];
    if (project.title.toLowerCase().includes("api")) return ["Backend", "Express"];
    if (project.title.toLowerCase().includes("e-commerce")) return ["E-Commerce", "React"];
    if (project.description.toLowerCase().includes("linktree")) return ["Landing", "React"];
    if (project.title.toLowerCase().includes("panel")) return ["Producto", "Frontend"];
    if (project.description.toLowerCase().includes("react")) return ["Frontend", "React"];
    if (project.description.toLowerCase().includes("prompt")) return ["Producto", "Prompt Eng."];
    return ["Frontend", "Web App"];
  };

  const getPrimaryLink = (project) => {
    return project.liveUrl || project.figmaUrl || project.repoUrl || project.youtubeUrl || "#";
  };

  const formatIndex = (index) => {
    return String(index + 1).padStart(2, "0");
  };

  return (
    /* Layout unificado stacked para desktop y mobile */
    <div
      ref={containerRef}
      id="proyectos"
      className="proj-sticky-scroll-container"
      style={{ height: `${projects.length * 45}vh` }}
    >
      <div className="proj-sticky-viewport">
        {/* Encabezado */}
        <div className="proj-desktop-header">
          <div>
            <span className="proj-desktop-subtitle">no son sólo palabras</span>
            <TypewriterText as="h2" text="Proyectos" className="proj-desktop-title" />
          </div>
          <a
            href="#contacto"
            className="proj-skip-link-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Saltar
          </a>
        </div>

        {/* Contenedor central de apilamiento */}
        <div className="proj-stacked-container">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollProgress}
              gradient={gradients[index % gradients.length]}
              tags={getProjectTags(project)}
              primaryLink={getPrimaryLink(project)}
              formatIndex={formatIndex}
            />
          ))}
        </div>

        {/* Indicador de progreso */}
        <div className="proj-progress-bar-wrapper">
          <div
            className="proj-progress-bar-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/* Componente de Tarjeta de Proyecto Stacked con Animación de Resorte */
const ProjectCard = ({ project, index, total, progress, gradient, tags, primaryLink, formatIndex }) => {
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.03;

  // Cálculo del y vertical — reducido de 600 a 500 para mejor ajuste
  let yVal = 500;
  if (index === 0) {
    yVal = 0;
  } else if (progress >= start) {
    yVal = 0;
  } else if (progress >= start - 0.06) {
    const p = (progress - (start - 0.06)) / 0.06;
    yVal = 500 * (1 - p);
  }

  // Cálculo de la escala
  let scaleVal = 1;
  if (progress >= start) {
    const p = (progress - start) / (1 - start);
    scaleVal = 1 - p * (1 - targetScale);
  }

  // Cálculo de la opacidad de oscurecimiento
  let overlayOpacityVal = 0;
  if (progress >= start) {
    const p = (progress - start) / (1 - start);
    overlayOpacityVal = p * 0.55;
  }

  const targetLink = project.liveUrl || project.figmaUrl;

  const cardImage = (
    <img
      src={project.imageUrl}
      alt={project.title}
      className="proj-card-bg-img"
      loading="lazy"
      width={1200}
      height={800}
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  );

  return (
    <motion.div
      animate={{
        y: yVal,
        scale: scaleVal,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 25,
        mass: 0.4,
      }}
      style={{
        zIndex: index,
        top: `calc(2% + ${index * 8}px)`,
        background: gradient,
      }}
      className="proj-stacked-card"
    >
      {/* Imagen de fondo del proyecto, linkeada opcionalmente a liveUrl o figmaUrl */}
      {targetLink ? (
        <a href={targetLink} target="_blank" rel="noopener noreferrer" aria-label={project.title}>
          {cardImage}
        </a>
      ) : (
        cardImage
      )}
    </motion.div>
  );
};

export default Projects;
