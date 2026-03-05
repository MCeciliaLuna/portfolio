import React from "react";
import { Tag, Row, Col } from "antd";
import data from "../db/data.js";
import "./About.css";

const About = () => {
  const { profile, tags } = data;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={24}>
            <div className="about-content">
              <div className="about-text">
                <p>{profile.description}</p>
              </div>

              <div className="about-tags">
                {tags.map((tag, index) => (
                  <div key={index} style={{ display: "inline-block" }}>
                    <Tag className="custom-tag" color="purple">
                      {tag}
                    </Tag>
                  </div>
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
