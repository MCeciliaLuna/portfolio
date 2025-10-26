import React, { useState, useRef } from 'react';
import { Modal, Card, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
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
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Certificaciones
        </motion.h2>
        
        <motion.div 
          className="certifications-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Button
            className="scroll-button scroll-button-left"
            icon={<LeftOutlined />}
            onClick={() => scroll('left')}
            shape="circle"
            size="large"
          />
          
          <div className="certifications-grid" ref={scrollContainerRef}>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.2), 
                  ease: "easeOut" 
                }}
              >
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
              </motion.div>
            ))}
          </div>
          
          <Button
            className="scroll-button scroll-button-right"
            icon={<RightOutlined />}
            onClick={() => scroll('right')}
            shape="circle"
            size="large"
          />
        </motion.div>

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