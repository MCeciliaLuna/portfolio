import React from "react";
import { Tag, Row, Col } from "antd";
import { motion } from 'motion/react';
import data from "../db/data.json";
import "./About.css";

const About = () => {
  const { profile, tags } = data;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={24}>
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="about-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <p>{profile.description}</p>
              </motion.div>

              <motion.div 
                className="about-tags"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6 + (index * 0.1), 
                      ease: "easeOut" 
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    <Tag className="custom-tag" color="purple">
                      {tag}
                    </Tag>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default About;
