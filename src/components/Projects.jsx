import { useState } from "react";
import { Row, Col, Card, Button } from "antd";
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

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    setTimeout(() => {
      scrollToProjects();
    }, 100);
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const showingAll = visibleCount >= projects.length && projects.length > 6;

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="container flex-column">
        <h2 id="projects-heading" className="section-title title-projects">
          Proyectos
        </h2>

        <Row
          gutter={[30, 30]}
          style={{ justifyContent: "center" }}
          role="list"
          aria-label="Lista de proyectos"
        >
          {visibleProjects.map((project, index) => (
            <Col key={project.id} xs={24} sm={12} lg={8} role="listitem">
              <div>
                <Card
                  className="project-card"
                  cover={
                    <div className="project-image-container">
                      <img
                        alt={project.title}
                        src={project.imageUrl}
                        className="project-image"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.style.backgroundColor =
                            "#6f2dbd";
                          e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.1rem; text-align: center; padding: 20px;">${project.title}</div>`;
                        }}
                      />
                      <div className="project-overlay">
                        <div className="project-links">
                          {project.figmaUrl ? (
                            <a
                              href={project.figmaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              aria-label="Ver diseño en Figma"
                            >
                              <FaFigma className="link-icon" />
                            </a>
                          ) : (
                            <>
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="project-link"
                                  aria-label="Ver demo en vivo"
                                >
                                  <GlobalOutlined className="link-icon" />
                                </a>
                              )}
                              {project.repoUrl && (
                                <a
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="project-link"
                                  aria-label="Ver repositorio en GitHub"
                                >
                                  <GithubOutlined className="link-icon" />
                                </a>
                              )}
                              {project.youtubeUrl && (
                                <a
                                  href={project.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="project-link youtube-link"
                                  aria-label="Ver video en YouTube"
                                >
                                  <YoutubeOutlined className="link-icon" />
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                  styles={{ body: { padding: "16px" } }}
                >
                  <Card.Meta
                    title={
                      <span className="project-title">{project.title}</span>
                    }
                    description={
                      <p className="project-description">
                        {project.description}
                      </p>
                    }
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        <div
          style={{ textAlign: "center", marginTop: "40px" }}
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {hasMore && (
            <Button
              type="primary"
              size="large"
              onClick={handleShowMore}
              className="show-more-button"
              aria-label={`Ver más proyectos. Mostrando ${visibleCount} de ${projects.length}`}
            >
              <strong>Ver más</strong>
            </Button>
          )}

          {showingAll && (
            <Button
              type="primary"
              size="large"
              onClick={handleShowLess}
              className="show-more-button"
              aria-label="Ocultar proyectos adicionales"
            >
              <strong>Ocultar</strong>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
