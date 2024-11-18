import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicePage.css';
import config from '../config';  // Импорт конфигурации для API URL

function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных о сервисах
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setServices(data.services);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Не удалось загрузить данные');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="service-page-section">
      <header className="service-page-header">
        <picture>
  <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
  <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
</picture>
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
