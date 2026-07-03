import React from "react";
import data from "../db/data.js";
import "./About.css";

const About = () => {
  const { profile, tags } = data;

  const tagColors = ["#f50062", "#ffa033", "#7a0062", "#8a9200", "#c98a00"];

  return (
    <section id="sobre" className="about-section-custom">
      <div className="about-container">
        <div data-reveal="left" className="about-title-col">
          <p className="about-subtitle">sobre mí</p>
          <h2 className="about-title">
            Una visión integral: <span className="about-highlight-border">del diseño al código.</span>
          </h2>
        </div>
        
        <div data-reveal="right" data-delay="120" className="about-details-col">
          <p className="about-description">
            Soy una apasionada de la tecnología con un perfil multidisciplinario. Acompaño a mis clientes desde la idea en blanco hasta el producto terminado conectando cuatro pilares:
          </p>
          <ul className="about-pillars-list">
            <li>🎨 <strong>Diseño UX/UI:</strong> Interfaces empáticas, accesibles y centradas en el usuario.</li>
            <li>💻 <strong>Desarrollo Frontend:</strong> Código limpio, escalable y funcional.</li>
            <li>🤖 <strong>Inteligencia Artificial:</strong> Innovación y optimización aplicada a cada proceso.</li>
            <li>📚 <strong>Docencia y formación:</strong> Enseñar me impulsa a estar en constante evolución.</li>
          </ul>
          <div className="about-tags-wrapper">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="about-tag-item"
                style={{ color: tagColors[index % tagColors.length] }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
