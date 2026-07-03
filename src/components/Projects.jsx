import React, { useState, useRef, useEffect } from "react";
import {
  GlobalOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaFigma } from "react-icons/fa";
import { motion } from "framer-motion";
import data from "../db/data.js";
import "./Projects.css";

const Projects = () => {
  const { projects } = data;
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 880);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 880);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll listener nativo para calcular progreso en escritorio
  useEffect(() => {
    if (!isDesktop) return;

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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

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

  // Gradientes para tarjetas de escritorio
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

  return (
    <>
      {isDesktop ? (
        /* VISTA DE ESCRITORIO: Stacked Cards con Scroll Pinning */
        <div
          ref={containerRef}
          id="proyectos"
          className="proj-sticky-scroll-container"
          style={{ height: `${projects.length * 100}vh` }}
        >
          <div className="proj-sticky-viewport">
            {/* Encabezado */}
            <div className="proj-desktop-header">
              <div>
                <span className="proj-desktop-subtitle">trabajo seleccionado</span>
                <h2 className="proj-desktop-title">Proyectos</h2>
              </div>
              <a
                href="#contacto"
                className="proj-skip-link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Saltar recorrido ✦
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
      ) : (
        /* VISTA MÓVIL: Layout clásico de filas */
        <section id="proyectos" className="projects-section-custom">
          <div className="container flex-column">
            <div data-reveal="up" className="projects-header">
              <p className="projects-subtitle">trabajo seleccionado</p>
              <h2 className="projects-title">Proyectos</h2>
            </div>

            <div className="projects-mobile-list">
              {projects.map((project, index) => {
                const tags = getProjectTags(project);
                return (
                  <div
                    key={project.id}
                    className="proj-stacked-card proj-mobile-card"
                    style={{ background: gradients[index % gradients.length] }}
                  >
                    {/* Imagen de fondo del proyecto */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="proj-card-bg-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    {/* Overlay de oscurecimiento */}
                    <div className="proj-card-overlay" style={{ opacity: 0.15 }} />

                    {/* Frosted Glass Overlay con data y links */}
                    <div className="proj-card-blur-overlay">
                      <div className="proj-card-blur-header">
                        <div className="proj-card-blur-title-row">
                          <span className="proj-card-blur-number">{formatIndex(index)}</span>
                          <h3 className="proj-card-blur-title">{project.title}</h3>
                        </div>
                        
                        <div className="proj-card-blur-links">
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="proj-card-blur-link-btn" 
                              aria-label="Ver demo"
                            >
                              Ver proyecto ✦
                            </a>
                          )}
                          {project.repoUrl && (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="proj-card-blur-link-icon" 
                              aria-label="GitHub"
                            >
                              <GithubOutlined />
                            </a>
                          )}
                          {project.figmaUrl && (
                            <a 
                              href={project.figmaUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="proj-card-blur-link-icon" 
                              aria-label="Figma"
                            >
                              <FaFigma />
                            </a>
                          )}
                          {project.youtubeUrl && (
                            <a 
                              href={project.youtubeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="proj-card-blur-link-icon" 
                              aria-label="YouTube"
                            >
                              <YoutubeOutlined />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="proj-card-blur-desc">{project.description}</p>

                      <div className="proj-card-blur-tags">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="proj-card-blur-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

/* Componente de Tarjeta de Proyecto Stacked con Animación de Resorte */
const ProjectCard = ({ project, index, total, progress, gradient, tags, primaryLink, formatIndex }) => {
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.03;

  // Cálculo del y vertical
  let yVal = 600;
  if (index === 0) {
    yVal = 0;
  } else if (progress >= start) {
    yVal = 0;
  } else if (progress >= start - 0.06) {
    const p = (progress - (start - 0.06)) / 0.06;
    yVal = 600 * (1 - p);
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
        top: `calc(5% + ${index * 12}px)`,
        background: gradient,
      }}
      className="proj-stacked-card"
    >
      {/* Imagen de fondo del proyecto */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className="proj-card-bg-img"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      {/* Overlay de oscurecimiento */}
      <motion.div
        animate={{ opacity: overlayOpacityVal }}
        transition={{ duration: 0.15 }}
        className="proj-card-overlay"
      />

      {/* Frosted Glass Overlay con data y links */}
      <div className="proj-card-blur-overlay">
        <div className="proj-card-blur-header">
          <div className="proj-card-blur-title-row">
            <span className="proj-card-blur-number">{formatIndex(index)}</span>
            <h3 className="proj-card-blur-title">{project.title}</h3>
          </div>
          
          <div className="proj-card-blur-links">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="proj-card-blur-link-btn" 
                aria-label="Ver demo"
              >
                Ver proyecto ✦
              </a>
            )}
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="proj-card-blur-link-icon" 
                aria-label="GitHub"
              >
                <GithubOutlined />
              </a>
            )}
            {project.figmaUrl && (
              <a 
                href={project.figmaUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="proj-card-blur-link-icon" 
                aria-label="Figma"
              >
                <FaFigma />
              </a>
            )}
            {project.youtubeUrl && (
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="proj-card-blur-link-icon" 
                aria-label="YouTube"
              >
                <YoutubeOutlined />
              </a>
            )}
          </div>
        </div>

        <p className="proj-card-blur-desc">{project.description}</p>

        <div className="proj-card-blur-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="proj-card-blur-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
