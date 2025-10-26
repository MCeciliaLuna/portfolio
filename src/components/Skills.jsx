import React, { useMemo } from "react";
import { Row, Col } from "antd";
import { motion } from 'motion/react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { MdGroup, MdDesignServices, MdSpeed } from "react-icons/md";
import data from "../db/data.json";
import "./Skills.css";

const Skills = () => {
  const { skills } = data;

  const iconMap = useMemo(
    () => ({
      FaHtml5: <FaHtml5 />,
      FaCss3Alt: <FaCss3Alt />,
      FaJs: <FaJs />,
      FaReact: <FaReact />,
      SiNextdotjs: <SiNextdotjs />,
      MdDesignServices: <MdDesignServices />,
      MdGroup: <MdGroup />,
      MdSpeed: <MdSpeed />,
      FaChalkboardTeacher: <FaChalkboardTeacher />,
    }),
    []
  );

  const getIcon = (iconName) => {
    return iconMap[iconName] || <div className="default-icon">?</div>;
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Row gutter={[30, 30]} justify="center">
            {skills.map((skill, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={6} xl={4}>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1, 
                    ease: "easeOut" 
                  }}
                >
                  <div className="skill-icon">{getIcon(skill.icon)}</div>
                  <span className="skill-name">{skill.name}</span>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
