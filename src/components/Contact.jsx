import React from "react";
import { Row, Col } from "antd";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import ContactForm from "./ContactForm";
import data from "../db/data.json";
import "./Contact.css";

const Contact = () => {
  const { profile } = data;

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                ¡Trabajemos juntos!
              </motion.h3>
              <motion.p
                className="contact-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                ¿Tenés un proyecto en mente? Contame. Me encantaría hacer
                realidad tu idea :)
              </motion.p>

              <motion.div
                className="social-links"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin-link"
                  aria-label="LinkedIn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <LinkedinOutlined className="social-icon" />
                </motion.a>

                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github-link"
                  aria-label="GitHub"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <GithubOutlined className="social-icon" />
                </motion.a>
              </motion.div>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ContactForm className="contact-form" />
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Contact;
