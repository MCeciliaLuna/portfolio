import React from 'react';
import { Tag, Row, Col } from 'antd';
import data from '../db/data.json';
import './About.css';

const About = () => {
  const { profile, tags } = data;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={24}>
            <div className="about-content">
              <h2 className="about-title">Descripción</h2>
              
              <div className="about-text">
                <p>{profile.description}</p>
              </div>
              
              <div className="about-tags">
                {tags.map((tag, index) => (
                  <Tag 
                    key={index}
                    className="custom-tag"
                    color="purple"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default About;