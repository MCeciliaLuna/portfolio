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
      color: "#FB4B4E",
    },
    {
      name: "GitHub",
      url: profile.github,
      icon: <GithubOutlined />,
      color: "#D10000",
    },
    {
      name: "Email",
      url: `mailto:${profile.email}`,
      icon: <MailOutlined />,
      color: "#7C0B2B",
      displayUrl: profile.email,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/5493816427068",
      icon: <FaWhatsapp />,
      color: "#3E000C",
    },
  ];

  return (
    <section id="contacto" className="contact-section-custom">
      <div className="contact-container">
        <div className="contact-info-col">
          <h2 className="contact-main-title">
            ¡Hagámoslo junt@s!
          </h2>
          <p className="contact-desc-text">
            Quiero formar parte de tu proyecto. Contame tu idea y encaremos el camino de su creación.
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
