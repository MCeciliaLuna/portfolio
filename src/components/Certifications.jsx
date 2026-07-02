import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import data from "../db/data.js";
import "./Certifications.css";

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: isDesktop ? "start" : "center",
      containScroll: false,
      skipSnaps: false,
      dragFree: false,
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollPrev = () => {
    if (emblaApi) {
      autoplay.current.stop();
      emblaApi.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      autoplay.current.stop();
      emblaApi.scrollNext();
    }
  };

  const handleImageClick = (cert) => {
    setSelectedCert(cert);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCert(null);
  };

  const getRotationStyle = (index) => {
    const rotations = ["-2.5deg", "1.8deg", "-1.5deg", "2deg", "-2deg"];
    return rotations[index % rotations.length];
  };

  const tagColors = ["#f50062", "#7a0062", "#ffa033", "#8a9200", "#c98a00"];

  return (
    <section id="certificaciones" className="certifications-section-custom">
      <div className="container flex-column">
        <div data-reveal="up" className="cert-header">
          <p className="cert-subtitle">formación</p>
          <h2 className="cert-title">Certificaciones</h2>
        </div>

        <div className="certifications-carousel-wrapper">
          {isDesktop && (
            <button
              className="cert-nav-btn cert-nav-btn-left"
              onClick={scrollPrev}
              aria-label="Anterior certificado"
            >
              <LeftOutlined />
            </button>
          )}

          <div className="embla-viewport" ref={emblaRef}>
            <div className="embla-container">
              {certifications.map((cert, index) => (
                <div key={cert.id} className="embla-slide-item">
                  <figure
                    className="polaroid-card"
                    style={{
                      "--rotation": getRotationStyle(index),
                    }}
                    onClick={() => handleImageClick(cert)}
                  >
                    <div className="polaroid-image-wrapper">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="polaroid-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.style.backgroundColor = "var(--purple-dark)";
                          e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.1rem; text-align: center; padding: 20px; font-family: var(--font-lora);">${cert.title}</div>`;
                        }}
                      />
                      <div className="polaroid-overlay">
                        <span>Ver certificado ✦</span>
                      </div>
                    </div>
                    <figcaption className="polaroid-caption">
                      <p
                        className="polaroid-institution"
                        style={{ color: tagColors[index % tagColors.length] }}
                      >
                        {cert.institution}
                      </p>
                      <p className="polaroid-cert-title">{cert.title}</p>
                      <p className="polaroid-year">{cert.year}</p>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {isDesktop && (
            <button
              className="cert-nav-btn cert-nav-btn-right"
              onClick={scrollNext}
              aria-label="Siguiente certificado"
            >
              <RightOutlined />
            </button>
          )}
        </div>

        <Modal
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          className="certification-modal-custom"
          centered
        >
          {selectedCert && (
            <div className="cert-modal-body">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="cert-modal-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "var(--purple-dark)";
                  e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem; text-align: center; padding: 40px; font-family: var(--font-lora);">${selectedCert.title}</div>`;
                }}
              />
              <div className="cert-modal-details">
                <span className="cert-modal-institution">{selectedCert.institution}</span>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <span className="cert-modal-year">{selectedCert.year}</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certifications;
