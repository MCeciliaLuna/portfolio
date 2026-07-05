import React from "react";
import data from "../db/data.js";
import HandwritingText from "./HandwritingText";
import TypewriterText from "./TypewriterText";
import "./About.css";

const About = () => {
  const { profile, tags } = data;

  const tagColors = ["#f50062", "#ffa033", "#7a0062", "#8a9200", "#c98a00"];

  return (
    <section id="sobre" className="about-section-custom">
      <div className="about-container">
        <div className="about-title-col">
          <HandwritingText
            as="p"
            text="me presento..."
            className="about-subtitle"
          />
          <TypewriterText
            as="h2"
            segments={[
              { text: "Mate o café, una pc y siempre " },
              { text: "buena onda.", className: "about-highlight-border" },
            ]}
            className="about-title"
          />
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
