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

  // Mapeo dinámico de colores de fondo para las tarjetas stacked
  const bgColors = [
    "from-indigo-600 to-purple-700",
    "from-cyan-600 to-blue-700",
    "from-emerald-600 to-teal-700",
    "from-amber-600 to-orange-700",
    "from-rose-600 to-pink-700"
  ];

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
        /* VISTA DE ESCRITORIO: Stacked Cards con Framer Motion */
        <div 
          ref={containerRef} 
          className="relative w-full bg-purple-dark"
          style={{ height: `${certifications.length * 100}vh` }}
        >
          {/* El div sticky retiene el viewport en top-20 (80px, justo debajo del navbar fijo) */}
          <div className="sticky top-20 h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden px-4">
            
            {/* Encabezado */}
            <div className="text-center mb-12 z-10">
              <span className="text-accent-yellow font-serif italic text-2xl block mb-2">Formación</span>
              <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-white">Mis Certificaciones</h2>
            </div>

            {/* Contenedor central de apilamiento */}
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
              {certifications.map((cert, index) => (
                <Card
                  key={cert.id}
                  cert={cert}
                  index={index}
                  total={certifications.length}
                  progress={scrollYProgress}
                  colorClass={bgColors[index % bgColors.length]}
                  icon={icons[index % icons.length]}
                  onClick={() => handleImageClick(cert)}
                />
              ))}
            </div>

            {/* Botón de omisión (Bypass link) */}
            <a
              href="#skills"
              className="absolute bottom-10 z-20 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-full transition-all text-sm font-medium shadow-lg hover:shadow-xl no-underline"
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

/* Componente de Tarjeta Stacked con Framer Motion */
const Card = ({ cert, index, total, progress, colorClass, icon, onClick }) => {
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.04;

  const y = useTransform(progress, [start - 0.1, start], [400, 0]);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const overlayOpacity = useTransform(progress, [start, 1], [0, 0.6]);

  return (
    <motion.div
      style={{
        y: index === 0 ? 0 : y,
        scale,
        zIndex: index,
        top: `calc(5% + ${index * 16}px)`,
      }}
      className={`absolute w-full max-w-md aspect-[4/3] rounded-3xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/10 cursor-pointer bg-gradient-to-br ${colorClass}`}
      onClick={onClick}
    >
      {/* Capa negra de opacidad interactiva para profundidad */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      {/* Contenido Superior */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <span className="text-white/80 font-mono text-xs tracking-wider uppercase">{cert.institution}</span>
          <h3 className="text-2xl md:text-3xl font-bold mt-2 leading-tight text-white">{cert.title}</h3>
        </div>
        <span className="text-4xl select-none" role="img" aria-label="icon">{icon}</span>
      </div>

      {/* Contenido Inferior */}
      <div className="relative z-10 flex justify-between items-end border-t border-white/15 pt-6">
        <div>
          <p className="text-white/60 text-[10px] uppercase tracking-widest">Año de finalización</p>
          <p className="text-lg font-semibold text-white">{cert.year}</p>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 hover:bg-white/20 text-white transition-all select-none">
          Ver certificado ✦
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications;
