import React from "react";
import { Row, Col } from "antd";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import ContactForm from "./ContactForm";
import data from "../db/data.js";
import "./Contact.css";

const Contact = () => {
  const { profile } = data;

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={12}>
            <div className="contact-info">
              <h3>¡Trabajemos juntos!</h3>
              <p className="contact-description">
                ¿Tenés un proyecto en mente? Contame. Me encantaría hacer
                realidad tu idea :)
              </p>

              <div className="social-links">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinOutlined className="social-icon" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github-link"
                  aria-label="GitHub"
                >
                  <GithubOutlined className="social-icon" />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="contact-form-container">
              <ContactForm className="contact-form" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Contact;
