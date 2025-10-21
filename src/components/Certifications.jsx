import React, { useState, useRef } from 'react';
import { Modal, Card, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import data from '../db/data.json';
import './Certifications.css';

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleImageClick = (cert) => {
    setSelectedCert(cert);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCert(null);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Ancho de la tarjeta + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <h2 className="section-title">Certificaciones</h2>
        
        <div className="certifications-wrapper">
          <Button
            className="scroll-button scroll-button-left"
            icon={<LeftOutlined />}
            onClick={() => scroll('left')}
            shape="circle"
            size="large"
          />
          
          <div className="certifications-grid" ref={scrollContainerRef}>
            {certifications.map((cert) => (
            <Card 
              key={cert.id}
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
                      e.target.style.display = 'none';
                      e.target.parentElement.style.backgroundColor = '#6f2dbd';
                      e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem;">${cert.title}</div>`;
                    }}
                  />
                  <div className="image-overlay">
                    <span>Ver certificado</span>
                  </div>
                </div>
              }
              styles={{ body: { padding: '16px' } }}
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
            ))}
          </div>
          
          <Button
            className="scroll-button scroll-button-right"
            icon={<RightOutlined />}
            onClick={() => scroll('right')}
            shape="circle"
            size="large"
          />
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
                  e.target.style.display = 'none';
                  e.target.parentElement.style.backgroundColor = '#6f2dbd';
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