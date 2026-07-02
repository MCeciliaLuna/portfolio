import React, { useState } from "react";
import {
  GlobalOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaFigma } from "react-icons/fa";
import data from "../db/data.js";
import "./Projects.css";

const Projects = () => {
  const { projects } = data;
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    const projectsSection = document.getElementById("proyectos");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const showingAll = visibleCount >= projects.length && projects.length > 6;

  const formatIndex = (index) => {
    return String(index + 1).padStart(2, "0");
  };

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

  const getColorClass = (index) => {
    const classes = ["pink-theme", "orange-theme", "purple-theme", "green-theme"];
    return classes[index % classes.length];
  };

  const getPrimaryLink = (project) => {
    return project.liveUrl || project.figmaUrl || project.repoUrl || project.youtubeUrl || "#";
  };

  return (
    <section id="proyectos" className="projects-section-custom">
      <div className="container flex-column">
        <div data-reveal="up" className="projects-header">
          <p className="projects-subtitle">trabajo seleccionado</p>
          <h2 className="projects-title">Proyectos</h2>
        </div>

        <div className="projects-list-wrapper">
          {visibleProjects.map((project, index) => {
            const themeClass = getColorClass(index);
            const tags = getProjectTags(project);
            const primaryLink = getPrimaryLink(project);

            return (
              <div
                key={project.id}
                data-reveal="up"
                className={`project-row-item ${themeClass}`}
              >
                <span className="project-row-number">
                  {formatIndex(index)}
                </span>
                
                <div className="project-row-title-block">
                  <h3 className="project-row-name">{project.title}</h3>
                  <div className="project-row-tags">
                    {tags.map((tag, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="tag-separator">·</span>}
                        <span className="tag-span">{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="project-row-desc">{project.description}</p>
                
                <div className="project-row-thumb-wrapper">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="project-row-thumb"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.backgroundColor = "var(--purple-dark)";
                      e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 0.8rem; font-family: var(--font-lora); text-align: center; padding: 5px;">${project.title}</div>`;
                    }}
                  />
                </div>

                <div className="project-row-links-wrapper">
                  <div className="project-row-social-links" onClick={(e) => e.stopPropagation()}>
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-row-link-icon"
                        aria-label="Ver en Figma"
                      >
                        <FaFigma />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-row-link-icon"
                        aria-label="Ver demo en vivo"
                      >
                        <GlobalOutlined />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-row-link-icon"
                        aria-label="Ver repositorio"
                      >
                        <GithubOutlined />
                      </a>
                    )}
                    {project.youtubeUrl && (
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-row-link-icon youtube-icon"
                        aria-label="Ver video explicativo"
                      >
                        <YoutubeOutlined />
                      </a>
                    )}
                  </div>
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-row-arrow-link"
                    aria-label={`Ver detalles de ${project.title}`}
                  >
                    <span className="row-arrow">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="projects-actions-wrapper" role="region" aria-live="polite">
          {hasMore && (
            <button
              onClick={handleShowMore}
              className="projects-show-btn"
              aria-label={`Ver más proyectos. Mostrando ${visibleCount} de ${projects.length}`}
            >
              Ver más proyectos
            </button>
          )}

          {showingAll && (
            <button
              onClick={handleShowLess}
              className="projects-show-btn"
              aria-label="Mostrar menos proyectos"
            >
              Mostrar menos
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
