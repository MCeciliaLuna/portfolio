import React from "react";
import data from "../db/data.js";
import "./Companies.css";

const Companies = () => {
  const { companies } = data;

  const dotColors = ["#ffa033", "#c2cc00", "#ffe15c", "#f50062"];

  // Duplicate the companies list to ensure continuous scrolling
  const marqueeItems = [...companies, ...companies, ...companies];

  return (
    <section id="empresas" className="companies-section-custom">
      <p data-reveal="up" className="companies-subtitle">confiaron en mí</p>
      <h2 data-reveal="up" data-delay="80" className="companies-title">
        Empresas &amp; colaboraciones
      </h2>
      
      <div className="companies-marquee-wrapper">
        <div className="companies-marquee-track">
          {marqueeItems.map((company, index) => (
            <React.Fragment key={index}>
              <div className="marquee-company-logo-wrapper">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="marquee-company-logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<span class="marquee-company-name-fallback">${company.name}</span>`;
                  }}
                />
              </div>
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
