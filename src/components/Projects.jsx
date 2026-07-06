import React, { useRef, useEffect, useState } from "react";
import {
  GlobalOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaFigma } from "react-icons/fa";
import { motion } from "framer-motion";
import HandwritingText from "./HandwritingText";
import TypewriterText from "./TypewriterText";
import data from "../db/data.js";
import "./Projects.css";

// Gradientes para tarjetas
const gradients = [
  "linear-gradient(135deg, #1a1a2e, #16213e)",
  "linear-gradient(135deg, #0f3460, #16213e)",
  "linear-gradient(135deg, #533483, #0b2239)",
  "linear-gradient(135deg, #e94560, #0f3460)",
  "linear-gradient(135deg, #1b1b2f, #162447)",
  "linear-gradient(135deg, #2c003e, #512b58)",
  "linear-gradient(135deg, #1f4068, #1a1a2e)",
  "linear-gradient(135deg, #6a0572, #ab2e70)",
  "linear-gradient(135deg, #0d7377, #14ffec)",
  "linear-gradient(135deg, #e23e57, #522546)",
  "linear-gradient(135deg, #2b2e4a, #e84545)",
  "linear-gradient(135deg, #1e3163, #5c3d2e)",
  "linear-gradient(135deg, #4a0e4e, #7a1ea1)",
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
      style={{ height: `${projects.length * 70}vh` }}
    >
      <div className="proj-sticky-viewport">
        {/* Encabezado */}
        <div className="proj-desktop-header">
          <div>
            <HandwritingText as="span" text="no son sólo palabras" className="proj-desktop-subtitle" />
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
        stiffness: 120,
        damping: 22,
        mass: 0.7,
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
