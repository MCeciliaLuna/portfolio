import React, { useState } from 'react';
import { Carousel, Modal, Card } from 'antd';
import data from '../db/data.json';
import './Certifications.css';

const Certifications = () => {
  const { certifications } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

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
      <div className="container">
        <h2 className="section-title">Certificaciones</h2>
        
        <div className="certifications-carousel-wrapper">
          <Carousel 
            dots={true} 
            autoplay 
            autoplaySpeed={4000}
            className="certifications-carousel"
            dotPosition="bottom"
          >
            {certifications.map((cert) => (
              <div key={cert.id} className="certification-slide">
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
                          e.target.src = `https://via.placeholder.com/400x300/6f2dbd/ffffff?text=${encodeURIComponent(cert.title)}`;
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
              </div>
            ))}
          </Carousel>
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
                  e.target.src = `https://via.placeholder.com/600x400/6f2dbd/ffffff?text=${encodeURIComponent(selectedCert.title)}`;
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