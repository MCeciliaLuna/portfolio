import React from "react";
import { Row, Col } from "antd";
import data from "../db/data.json";
import "./Companies.css";

const Companies = () => {
  const { companies } = data;

  return (
    <section id="companies" className="section companies-section">
      <div className="container flex-column">
        <h2 className="section-title companies-title">Empresas</h2>

        <div>
          <Row gutter={[40, 40]} justify="center" align="middle">
            {companies.map((company, index) => (
              <Col key={company.id} xs={12} sm={8} md={6} lg={6} xl={6}>
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                  aria-label={`Visitar sitio web de ${company.name}`}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.backgroundColor = "#6f2dbd";
                      e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1rem; text-align: center; padding: 10px;">${company.name}</div>`;
                    }}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Companies;
