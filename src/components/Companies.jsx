import React from "react";
import data from "../db/data.js";

import TypewriterText from "./TypewriterText";
import "./Companies.css";

const dotColors = ["#ffa033", "#c2cc00", "#ffe15c", "#f50062"];

// Duplicate the companies list to ensure continuous scrolling
const marqueeItems = [...data.companies, ...data.companies, ...data.companies];

const getLogoDimensions = (name) => {
  switch (name) {
    case "Sigmma.Net":
      return { width: 193, height: 40 };
    case "Fundacion Valores Para Mi Ciudad":
      return { width: 193, height: 42 };
    case "Bless Inmobiliaria":
      return { width: 51, height: 79 };
    case "Conti Latam":
      return { width: 126, height: 79 };
    case "Instituto NOA":
      return { width: 89, height: 79 };
    case "Iglesia de Cristo Tucumán":
      return { width: 89, height: 79 };
    default:
      return { width: 100, height: 40 };
  }
};

const Companies = () => {
  return (
    <section id="empresas" className="companies-section-custom">
      <p className="companies-subtitle">confiaron en mí</p>
      <TypewriterText
        as="h2"
        segments={[
          { text: "Empresas " },
          { text: "&", className: "companies-ampersand" },
          { text: " colaboraciones" },
        ]}
        className="companies-title"
        delay={0.3}
      />
      
      <div className="companies-marquee-wrapper">
        <div className="companies-marquee-track">
          {marqueeItems.map((company, index) => {
            const dims = getLogoDimensions(company.name);
            return (
              <React.Fragment key={index}>
                <a href={company.url} target="_blank" rel="noopener noreferrer" aria-label={company.name} className="marquee-company-logo-wrapper">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="marquee-company-logo"
                    width={dims.width}
                    height={dims.height}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<span class="marquee-company-name-fallback">${company.name}</span>`;
                    }}
                  />
                </a>
                <span
                  className="marquee-separator"
                  style={{ color: dotColors[index % dotColors.length] }}
                >
                  •
                </span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Companies;
