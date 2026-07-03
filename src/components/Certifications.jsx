import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { LeftOutlined, RightOutlined, EyeOutlined } from "@ant-design/icons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import data from "../db/data.js";
import "./Certifications.css";

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // 1. Scroll listener nativo para calcular progreso en escritorio de manera 100% fiable
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // El anclaje (pinning) inicia cuando el tope del contenedor está a 80px
      const topOffset = 80;
      const scrolled = topOffset - rect.top;
      const maxScroll = containerHeight - (windowHeight - topOffset);

      let progress = scrolled / maxScroll;
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

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
        /* VISTA DE ESCRITORIO: Stacked Cards con Scroll Pinning Nativo y Resortes */
        <div 
          ref={containerRef} 
          id="certificaciones"
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
                  progress={scrollProgress}
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

/* Componente de Tarjeta Stacked con Animación de Resorte Reactiva */
const Card = ({ cert, index, total, progress, icon, onClick }) => {
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.04;

  // Cálculo matemático del y vertical (Clamped de forma segura en JS)
  let yVal = 800;
  if (index === 0) {
    yVal = 0; // La primera tarjeta inicia directamente en su lugar
  } else if (progress >= start) {
    yVal = 0;
  } else if (progress >= start - 0.08) {
    // Interpola progress de [start - 0.08, start] a [800, 0]
    const p = (progress - (start - 0.08)) / 0.08;
    yVal = 800 * (1 - p);
  }

  // Cálculo matemático de la escala (Clamped de forma segura en JS)
  let scaleVal = 1;
  if (progress >= start) {
    // Interpola progress de [start, 1] a [1, targetScale]
    const p = (progress - start) / (1 - start);
    scaleVal = 1 - p * (1 - targetScale);
  }

  // Cálculo matemático de la opacidad de oscurecimiento
  let overlayOpacityVal = 0;
  if (progress >= start) {
    // Interpola progress de [start, 1] a [0, 0.6]
    const p = (progress - start) / (1 - start);
    overlayOpacityVal = p * 0.6;
  }

  return (
    <motion.div
      animate={{
        y: yVal,
        scale: scaleVal,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }}
      style={{
        zIndex: index,
        top: `calc(5% + ${index * 16}px)`,
      }}
      className={`cert-stacked-card cert-card-grad-${index % 5}`}
      onClick={onClick}
    >
      {/* Imagen de fondo de la certificación */}
      <img
        src={cert.imageUrl}
        alt={cert.title}
        className="cert-card-bg-img"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      {/* Capa de opacidad interactiva para profundidad */}
      <motion.div
        animate={{ opacity: overlayOpacityVal }}
        transition={{ duration: 0.2 }}
        className="cert-card-overlay"
      />

      {/* Blur en blanco abajo con la data y ojo */}
      <div className="cert-card-blur-overlay">
        <div className="cert-card-blur-content">
          <span className="cert-card-blur-institution">{cert.institution}</span>
          <h3 className="cert-card-blur-title">{cert.title}</h3>
          <span className="cert-card-blur-year">{cert.year}</span>
        </div>
        <button 
          className="cert-card-eye-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          aria-label="Ver certificado completo"
        >
          <EyeOutlined />
        </button>
      </div>
    </motion.div>
  );
};

export default Certifications;
