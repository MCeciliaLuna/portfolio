import React from "react";
import TypewriterText from "./TypewriterText";
import "./Interview.css";

const Interview = () => {
  return (
    <section id="entrevista" className="interview-section" data-reveal>
      <div className="interview-container">
        {/* Header */}
        <div className="interview-header" data-reveal style={{ transform: "translateY(24px)" }}>
          <p className="interview-subtitle">en los medios…</p>
          <TypewriterText
            as="h2"
            text="Entrevista como CASO DE ÉXITO para Rolling Code School"
            className="interview-title"
          />
        </div>

        {/* Video embed */}
        <div
          className="interview-video-wrapper"
          data-reveal
          style={{ transform: "translateY(32px)" }}
        >
          <div className="interview-video-frame">
            <iframe
              id="interview-youtube-embed"
              src="https://www.youtube.com/embed/4pwIPI3ecD8?start=231"
              title="Entrevista como CASO DE ÉXITO para Rolling Code School — Cecilia Luna"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {/* Glow decorativo */}
          <div className="interview-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Interview;
