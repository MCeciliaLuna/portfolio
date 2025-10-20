import React from 'react';
import { Row, Col } from 'antd';
import data from '../db/data.json';
import './Companies.css';

const Companies = () => {
  const { companies } = data;

  return (
    <section id="companies" className="section companies-section">
      <div className="container">
        <h2 className="section-title">Empresas</h2>
        
        <Row gutter={[40, 40]} justify="center" align="middle">
          {companies.map((company) => (
            <Col key={company.id} xs={12} sm={8} md={6} lg={6} xl={6}>
              <div className="company-item hover-scale">
                <div className="company-logo-wrapper">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x100/6f2dbd/ffffff?text=${encodeURIComponent(company.name)}`;
                    }}
                  />
                </div>
                <span className="company-name">{company.name}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Companies;