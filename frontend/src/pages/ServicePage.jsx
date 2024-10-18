import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../config'; // Убедитесь, что у вас есть правильный файл config.js
import '../styles/ServicePage.css';

function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setServices(data.services);  // Устанавливаем данные о сервисах в состояние
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetching error: ', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных: {error.message}</div>;
  }

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
          {services.map((service, index) => (
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