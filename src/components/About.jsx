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
          <p className="about-subtitle">me presento...</p>
          <h2 className="about-title">
            Mate o café, una pc y siempre <span className="about-highlight-border">buena onda.</span>
          </h2>
        </div>

        <div data-reveal="right" data-delay="120" className="about-details-col">
          <p className="about-description">
            {profile.description}
          </p>

        </div>
      </div>
    </section>
  );
};

export default About;
