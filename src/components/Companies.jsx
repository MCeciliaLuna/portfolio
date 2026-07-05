import React from "react";
import data from "../db/data.js";
import HandwritingText from "./HandwritingText";
import TypewriterText from "./TypewriterText";
import "./Companies.css";

const Companies = () => {
  const { companies } = data;

  const dotColors = ["#ffa033", "#c2cc00", "#ffe15c", "#f50062"];

  // Duplicate the companies list to ensure continuous scrolling
  const marqueeItems = [...companies, ...companies, ...companies];

  return (
    <section id="empresas" className="companies-section-custom">
      <HandwritingText as="p" text="confiaron en mí" className="companies-subtitle" />
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
          {marqueeItems.map((company, index) => (
            <React.Fragment key={index}>
              <a href={company.url} target="_blank" rel="noopener noreferrer" aria-label={company.name} className="marquee-company-logo-wrapper">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="marquee-company-logo"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
