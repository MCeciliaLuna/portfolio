import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useScroll, useTransform } from "framer-motion";
import data from "../db/data.js";
import "./Certifications.css";

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const containerRef = useRef(null);

  // 1. Framer Motion Scroll tracking (para escritorio)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Embla Carousel (para móviles)
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
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

  // Mapeo dinámico de emojis para las tarjetas stacked
  const icons = ["💻", "⚛️", "🟢", "🤖", "⚙️", "🎓"];

  const getRotationStyle = (index) => {
    const rotations = ["-2.5deg", "1.8deg", "-1.5deg", "2deg", "-2deg"];
    return rotations[index % rotations.length];
  };

  const tagColors = ["#f50062", "#7a0062", "#ffa033", "#8a9200", "#c98a00"];

  return (
    <>
      {isDesktop ? (
        /* VISTA DE ESCRITORIO: Stacked Cards con Framer Motion (Vanilla CSS clases) */
        <div 
          ref={containerRef} 
          className="cert-sticky-scroll-container"
          style={{ height: `${certifications.length * 100}vh` }}
        >
          {/* El div sticky retiene el viewport justo debajo del navbar fijo */}
          <div className="cert-sticky-viewport-desktop">
            
            {/* Encabezado */}
            <div className="cert-desktop-header">
              <span className="cert-desktop-subtitle">Formación</span>
              <h2 className="cert-desktop-title">Mis Certificaciones</h2>
            </div>

            {/* Contenedor central de apilamiento */}
            <div className="cert-stacked-container">
              {certifications.map((cert, index) => (
                <Card
                  key={cert.id}
                  cert={cert}
                  index={index}
                  total={certifications.length}
                  progress={scrollYProgress}
                  icon={icons[index % icons.length]}
                  onClick={() => handleImageClick(cert)}
                />
              ))}
            </div>

            {/* Botón de omisión (Bypass link) */}
            <a
              href="#skills"
              className="cert-skip-link-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Saltar recorrido ✦
            </a>
          </div>
        </div>
      ) : (
        /* VISTA MÓVIL: Embla Carousel clásico */
        <section id="certificaciones" className="certifications-section-custom">
          <div className="container flex-column">
            <div className="cert-header">
              <p className="cert-subtitle">formación</p>
              <h2 className="cert-title">Certificaciones</h2>
            </div>

            <div className="certifications-carousel-wrapper">
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
            </div>
          </div>
        </section>
      )}

      {/* Modal Reutilizado para ambas vistas */}
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
    </>
  );
};

/* Componente de Tarjeta Stacked con Framer Motion (Vanilla CSS clases) */
const Card = ({ cert, index, total, progress, icon, onClick }) => {
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.04;

  const y = useTransform(progress, [start - 0.08, start], [800, 0], { clamp: true });
  const scale = useTransform(progress, [start, 1], [1, targetScale], { clamp: true });
  const overlayOpacity = useTransform(progress, [start, 1], [0, 0.6], { clamp: true });

  return (
    <motion.div
      style={{
        y: index === 0 ? 0 : y,
        scale,
        zIndex: index,
        top: `calc(5% + ${index * 16}px)`,
      }}
      className={`cert-stacked-card cert-card-grad-${index % 5}`}
      onClick={onClick}
    >
      {/* Capa de opacidad interactiva para profundidad */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="cert-card-overlay"
      />

      {/* Contenido Superior */}
      <div className="cert-card-top">
        <div>
          <span className="cert-card-institution">{cert.institution}</span>
          <h3 className="cert-card-title">{cert.title}</h3>
        </div>
        <span className="cert-card-icon">{icon}</span>
      </div>

      {/* Contenido Inferior */}
      <div className="cert-card-bottom">
        <div>
          <p className="cert-card-year-label">Año de finalización</p>
          <p className="cert-card-year">{cert.year}</p>
        </div>
        <div className="cert-card-button">
          Ver certificado ✦
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications;
