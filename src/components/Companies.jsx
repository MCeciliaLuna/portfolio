import React from "react";
import { Row, Col } from "antd";
import { motion } from 'motion/react';
import data from "../db/data.json";
import "./Companies.css";

const Companies = () => {
  const { companies } = data;

  return (
    <section id="companies" className="section companies-section">
      <div className="container">
        <motion.h2 
          className="section-title companies-title"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Empresas
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Row gutter={[40, 40]} justify="center" align="middle">
            {companies.map((company, index) => (
              <Col key={company.id} xs={12} sm={8} md={6} lg={6} xl={6}>
                <motion.a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                  aria-label={`Visitar sitio web de ${company.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + (index * 0.2), 
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="company-logo"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.backgroundColor = "#6f2dbd";
                        e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1rem; text-align: center; padding: 10px;">${company.name}</div>`;
                      }}
                    />
                </motion.a>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;
