import React from 'react';
import { Row, Col, Divider } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined, HeartFilled } from '@ant-design/icons';
import data from '../db/data.js';
import './Footer.css';

const Footer = () => {
  const { profile } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container flex-column">
        <Row gutter={[30, 30]} justify="space-between" align="top">
          <Col xs={24} sm={12} lg={8}>
            <div className="footer-brand">
              <h3 className="footer-title">{profile.name} :)</h3>
              <p className="footer-tagline">{profile.tagline}</p>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <div className="footer-links">
              <h4 className="footer-section-title">Contacto</h4>
              <div className="footer-contact-links">
                <a 
                  href={`mailto:${profile.email}`}
                  className="footer-link"
                  aria-label="Email"
                >
                  <MailOutlined /> {profile.email}
                </a>
                <a 
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinOutlined /> LinkedIn
                </a>
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label="GitHub"
                >
                  <GithubOutlined /> GitHub
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <div className="footer-bottom">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={12}>
              <p className="copyright">
                © {currentYear} {profile.name}. Todos los derechos reservados.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;