import React from "react";
import data from "../db/data.js";
import HandwritingText from "./HandwritingText";
import TypewriterText from "./TypewriterText";
import "./About.css";

const About = () => {
  const { profile } = data;

  return (
    <section id="sobre" className="about-section-custom">
      <div className="about-container">
        <div className="about-title-col">
          <HandwritingText
            as="p"
            text="me presento…"
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

        <div className="about-details-col">
          <p className="about-description" dangerouslySetInnerHTML={{ __html: profile.description }} />
        </div>
      </div>
    </section>
  );
};

export default About;
