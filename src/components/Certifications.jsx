import React, { useState, useRef, useEffect } from "react";
import { Modal, Card, Button } from "antd";
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

  // Configuración de Embla Carousel
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: isDesktop ? "start" : "center", // start en desktop, center en móvil
      containScroll: false,
      skipSnaps: false,
      dragFree: false,
      slidesToScroll: 1, // Siempre de a 1 para mejor control
    },
    [autoplay.current]
  );

  // Detectar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configurar funciones de navegación de Embla
  const scrollPrev = () => {
    if (emblaApi) {
      autoplay.current.stop(); // Detener autoplay al usar botones
      emblaApi.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      autoplay.current.stop(); // Detener autoplay al usar botones
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

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container flex-column">
        <h2 className="section-title companies-title">Certificaciones</h2>

        <div className="certifications-wrapper">
          {isDesktop && (
            <Button
              className="scroll-button scroll-button-left"
              icon={<LeftOutlined />}
              onClick={scrollPrev}
              shape="circle"
              size="large"
              ghost
            />
          )}

          <div className="embla" ref={emblaRef}>
            <div className="certifications-grid embla__container">
              {certifications.map((cert, index) => (
                <div key={cert.id} className="embla__slide">
                  <Card
                    className="certification-card"
                    cover={
                      <div
                        className="certification-image-wrapper"
                        onClick={() => handleImageClick(cert)}
                      >
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
                          className="certification-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.style.backgroundColor =
                              "#6f2dbd";
                            e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem;">${cert.title}</div>`;
                          }}
                        />
                        <div className="image-overlay">
                          <span>Ver certificado</span>
                        </div>
                      </div>
                    }
                    styles={{ body: { padding: "16px" } }}
                  >
                    <Card.Meta
                      title={cert.title}
                      description={
                        <div className="certification-info">
                          <p className="institution">{cert.institution}</p>
                          <p className="year">{cert.year}</p>
                        </div>
                      }
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {isDesktop && (
            <Button
              className="scroll-button scroll-button-right"
              icon={<RightOutlined />}
              onClick={scrollNext}
              shape="circle"
              size="large"
              ghost
            />
          )}
        </div>

        <Modal
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          className="certification-modal"
          centered
        >
          {selectedCert && (
            <div className="modal-content">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="modal-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#6f2dbd";
                  e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem; text-align: center; padding: 20px;">${selectedCert.title}</div>`;
                }}
              />
              <div className="modal-info">
                <h3>{selectedCert.title}</h3>
                <p className="modal-institution">{selectedCert.institution}</p>
                <p className="modal-year">{selectedCert.year}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certifications;
