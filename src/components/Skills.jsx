import React from "react";
import { Tooltip } from "antd";
import {
  FaReact,
  FaChalkboardTeacher,
  FaBrain
} from "react-icons/fa";
import { SiNextdotjs, SiExpress } from "react-icons/si";
import { MdDesignServices, MdGroup } from "react-icons/md";

import TypewriterText from "./TypewriterText";
import "./Skills.css";

const codeSkills = [
  { name: "React", tooltip: "Creación de interfaces dinámicas mediante componentes reutilizables", color: "#e00055", icon: <FaReact aria-hidden="true" /> },
  { name: "Next.js", tooltip: "Aplicaciones de alto rendimiento con renderizado optimizado (SSR/SSG)", color: "#7a0062", icon: <SiNextdotjs aria-hidden="true" /> },
  { name: "Express.js", tooltip: "Desarrollo de APIs robustas y escalables del lado del servidor", color: "#8a9200", icon: <SiExpress aria-hidden="true" /> },
];

const designSkills = [
  { name: "Diseño UX/UI", tooltip: "Arquitectura de información y diseño de interfaces centradas en el usuario", color: "#e00055", icon: <MdDesignServices aria-hidden="true" /> },
  { name: "Metodologías Ágiles", tooltip: "Gestión de proyectos con entregas iterativas y mejora continua", color: "#8a9200", icon: <MdGroup aria-hidden="true" /> },
  { name: "Docencia", tooltip: "Facilitación de aprendizaje y comunicación efectiva de conceptos técnicos", color: "#e00055", icon: <FaChalkboardTeacher aria-hidden="true" /> },
  { name: "IA aplicada", tooltip: "Uso de herramientas de IA generativa para optimizar diseño y desarrollo", color: "#ffa033", icon: <FaBrain aria-hidden="true" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section-custom">
      <div className="skills-container">
        <div className="skills-header">
          <p className="skills-subtitle">mi caja de herramientas</p>
          <TypewriterText as="h2" text="Stack" className="skills-title" />
        </div>
        
        <div className="skills-grid-columns">
          <div data-reveal="left" className="skills-column">
            <p className="skills-column-title code-title">código</p>
            <div className="skills-list">
              {codeSkills.map((skill, index) => (
                <Tooltip key={index} title={skill.tooltip} placement="top">
                  <span
                    className="skill-span-item"
                    style={{ "--hover-color": skill.color }}
                  >
                    <span className="skill-icon-prefix">{skill.icon}</span>
                    <span className="skill-name-text">{skill.name}</span>
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
          
          <div data-reveal="right" data-delay="120" className="skills-column">
            <p className="skills-column-title design-title">diseño &amp; enseñanza</p>
            <div className="skills-list">
              {designSkills.map((skill, index) => (
                <Tooltip key={index} title={skill.tooltip} placement="top">
                  <span
                    className="skill-span-item"
                    style={{ "--hover-color": skill.color }}
                  >
                    <span className="skill-icon-prefix">{skill.icon}</span>
                    <span className="skill-name-text">{skill.name}</span>
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
