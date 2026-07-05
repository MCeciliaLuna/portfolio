import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import data from "../db/data.js";
import "./Certifications.css";

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Scroll listener para calcular progreso del efecto stacked (todos los viewports)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

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
  }, []);

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

  return (
    <>
      {/* Layout unificado stacked para desktop y mobile */}
      <div 
        ref={containerRef} 
        id="certificaciones"
        className="cert-sticky-scroll-container"
        style={{ height: `${certifications.length * 70}vh` }}
      >
        <div className="cert-sticky-viewport">
          {/* Encabezado */}
          <div className="cert-desktop-header">
            <span className="cert-desktop-subtitle">siempre en modo aprendizaje</span>
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
            Saltar
          </a>
        </div>
      </div>

      {/* Modal Reutilizado */}
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

  // Cálculo del y vertical — reducido de 800 a 600 para mejor ajuste en viewport
  let yVal = 600;
  if (index === 0) {
    yVal = 0; // La primera tarjeta inicia directamente en su lugar
  } else if (progress >= start) {
    yVal = 0;
  } else if (progress >= start - 0.08) {
    // Interpola progress de [start - 0.08, start] a [600, 0]
    const p = (progress - (start - 0.08)) / 0.08;
    yVal = 600 * (1 - p);
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
        top: `calc(2% + ${index * 10}px)`,
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
