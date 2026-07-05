import React from "react";
import { Tooltip } from "antd";
import {
  FaReact,
  FaChalkboardTeacher,
  FaBrain
} from "react-icons/fa";
import { SiNextdotjs, SiExpress } from "react-icons/si";
import { MdDesignServices, MdGroup } from "react-icons/md";
import "./Skills.css";

const Skills = () => {
  const codeSkills = [
    { name: "React", tooltip: "Creación de interfaces dinámicas mediante componentes reutilizables", color: "#f50062", icon: <FaReact /> },
    { name: "Next.js", tooltip: "Aplicaciones de alto rendimiento con renderizado optimizado (SSR/SSG)", color: "#7a0062", icon: <SiNextdotjs /> },
    { name: "Express.js", tooltip: "Desarrollo de APIs robustas y escalables del lado del servidor", color: "#8a9200", icon: <SiExpress /> },
  ];

  const designSkills = [
    { name: "Diseño UX/UI", tooltip: "Arquitectura de información y diseño de interfaces centradas en el usuario", color: "#f50062", icon: <MdDesignServices /> },
    { name: "Metodologías Ágiles", tooltip: "Gestión de proyectos con entregas iterativas y mejora continua", color: "#8a9200", icon: <MdGroup /> },
    { name: "Docencia", tooltip: "Facilitación de aprendizaje y comunicación efectiva de conceptos técnicos", color: "#f50062", icon: <FaChalkboardTeacher /> },
    { name: "IA aplicada", tooltip: "Uso de herramientas de IA generativa para optimizar diseño y desarrollo", color: "#ffa033", icon: <FaBrain /> },
  ];

  return (
    <section id="skills" className="skills-section-custom">
      <div className="skills-container">
        <div data-reveal="up" className="skills-header">
          <p className="skills-subtitle">mi caja de herramientas</p>
          <h2 className="skills-title">Stack</h2>
        </div>
        
        <div className="skills-grid-columns">
          <div data-reveal="left" className="skills-column">
            <p className="skills-column-title code-title">Código</p>
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
            <p className="skills-column-title design-title">Diseño &amp; Proceso</p>
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
