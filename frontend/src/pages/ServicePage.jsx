import React from 'react';
import { Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/ServicePage.css';

function ServicePage() {
  return (
    <section className="service-page-section">
      <header className="service-page-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Наши услуги</h1>
        <div className="service-breadcrumb">
          <Link to="/" className="service-breadcrumb-link">
            <span className="service-breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>
      <div className="service-page-wrapper">
        <div className="service-page-grid">
          {content.services.map((service, index) => (
            <div className="service-page-item" key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicePage;