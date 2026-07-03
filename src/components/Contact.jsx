import React from "react";
import { LinkedinOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "./ContactForm";
import data from "../db/data.js";
import "./Contact.css";

const Contact = () => {
  const { profile } = data;

  const socialLinks = [
    {
      name: "LinkedIn",
      url: profile.linkedin,
      icon: <LinkedinOutlined />,
      color: "#f50062",
    },
    {
      name: "GitHub",
      url: profile.github,
      icon: <GithubOutlined />,
      color: "#ffa033",
    },
    {
      name: "Email",
      url: `mailto:${profile.email}`,
      icon: <MailOutlined />,
      color: "#7a0062",
      displayUrl: profile.email,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/5493816427068",
      icon: <FaWhatsapp />,
      color: "#8a9200",
    },
  ];

  return (
    <section id="contacto" className="contact-section-custom">
      <div className="contact-container">
        <div data-reveal="left" className="contact-info-col">
          <h2 className="contact-main-title">¡Trabajemos juntos!</h2>
          <p className="contact-desc-text">
            ¿Tenés un proyecto en mente? Me encantaría ayudarte a hacer realidad tu idea — desde el diseño de la experiencia hasta el producto final.
          </p>
          
          <div className="contact-social-rows">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row-link"
                style={{ "--hover-color": link.color }}
              >
                <span className="contact-row-icon-wrapper">
                  {link.icon}
                </span>
                <span className="contact-row-name">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div data-reveal="right" data-delay="120" className="contact-form-col">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
