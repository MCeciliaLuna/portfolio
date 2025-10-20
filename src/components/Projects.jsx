import React from 'react';
import { Row, Col, Card } from 'antd';
import { GlobalOutlined, GithubOutlined } from '@ant-design/icons';
import data from '../db/data.json';
import './Projects.css';

const Projects = () => {
  const { projects } = data;

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Trabajos</h2>
        
        <Row gutter={[30, 30]}>
          {projects.map((project) => (
            <Col key={project.id} xs={24} sm={12} lg={8}>
              <Card
                className="project-card"
                cover={
                  <div className="project-image-container">
                    <img
                      alt={project.title}
                      src={project.imageUrl}
                      className="project-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundColor = '#6f2dbd';
                        e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.1rem; text-align: center; padding: 20px;">${project.title}</div>`;
                      }}
                    />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="Ver demo en vivo"
                        >
                          <GlobalOutlined className="link-icon" />
                        </a>
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="Ver repositorio en GitHub"
                        >
                          <GithubOutlined className="link-icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                }
                styles={{ body: { padding: '16px' } }}
              >
                <Card.Meta
                  title={<span className="project-title">{project.title}</span>}
                  description={
                    <p className="project-description">
                      {project.description}
                    </p>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Projects;