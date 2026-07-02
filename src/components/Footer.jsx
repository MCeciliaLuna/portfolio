import React from "react";
import { LinkedinOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa";
import data from "../db/data.js";
import "./Footer.css";

const Footer = () => {
  const { profile } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="footer-container">
        <div className="footer-main-row">
          <div className="footer-brand-col">
            <p className="footer-brand-name">{profile.name} Luna</p>
            <p className="footer-brand-subtitle">
              Frontend Developer &amp; UX/UI Designer
            </p>
          </div>
          <div className="footer-links-col">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <LinkedinOutlined className="footer-icon-prefix" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <GithubOutlined className="footer-icon-prefix" />
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="footer-link-item"
            >
              <MailOutlined className="footer-icon-prefix" />
              Email
            </a>
            <a
              href="https://wa.me/5493816427068"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <FaWhatsapp className="footer-icon-prefix" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom-row">
          © {currentYear} María Cecilia Luna. Hecho con código y cariño.
        </div>
      </div>
    </footer>
  );
};

export default Footer;