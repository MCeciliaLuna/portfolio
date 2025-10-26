import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { motion } from 'motion/react';
import {
  GlobalOutlined,
  GithubOutlined,
  YoutubeOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { FaFigma } from "react-icons/fa";
import data from "../db/data.json";
import "./Projects.css";

const Projects = () => {
  const { projects } = data;
  const [visibleCount, setVisibleCount] = useState(3);

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
    setVisibleCount(3);
    setTimeout(() => {
      scrollToProjects();
    }, 100);
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const showingAll = visibleCount >= projects.length && projects.length > 3;

  return (
    <section id="projects" className="section projects-section">
      <div className="container flex-column">
        <motion.h2 
          className="section-title title-projects"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Proyectos
        </motion.h2>

        <Row gutter={[30, 30]} style={{ justifyContent: "center" }}>
          {visibleProjects.map((project, index) => (
            <Col key={project.id} xs={24} sm={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1, 
                  ease: "easeOut" 
                }}
              >
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
                  title={<span className="project-title">{project.title}</span>}
                  description={
                    <p className="project-description">{project.description}</p>
                  }
                />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          {hasMore && (
            <Button
              type="primary"
              size="large"
              onClick={handleShowMore}
              className="show-more-button"
            >
              <strong>Ver más</strong> proyectos
            </Button>
          )}

          {showingAll && (
            <Button
              type="primary"
              size="large"
              onClick={handleShowLess}
              className="show-more-button"
            >
              <strong>Ocultar</strong> proyectos
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
