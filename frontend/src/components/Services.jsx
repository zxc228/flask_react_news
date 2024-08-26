import React from 'react';
import '../styles/App.css'; // В Services.jsx или любом другом компоненте
import backgroundImage from '../public/back2.jpg'; // Замените на путь к вашему изображению

function Services() {
  return (
    <section className="services-section">
      <div className="services-wrapper">
        <h2 className="services-title">Наши услуги</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Разработка конструкторской документации</h3>
            <p>Разработка технической документации для создания арматуры, включая чертежи, схемы и расчеты с использованием современных систем.</p>
            <button className="service-button">Подробнее</button>
          </div>
          <div className="service-item">
            <h3>Разработка технологической документации</h3>
            <p>Создание технологических процессов для производства арматуры, включая методы поверхностного упрочнения, защитные покрытия и наплавку.</p>
            <button className="service-button">Подробнее</button>
          </div>
          <div className="service-item">
            <h3>Проектирование трубопроводных систем</h3>
            <p>Инженерное проектирование трубопроводных систем для различных отраслей, включая нефтегазовый сектор, тепловую и атомную энергетику.</p>
            <button className="service-button">Подробнее</button>
          </div>
          <div className="service-item">
            <h3>Обучение</h3>
            <p>Профессиональная подготовка и повышение квалификации специалистов в области арматуростроения и производства электроприводов.</p>
            <button className="service-button">Подробнее</button>
          </div>
          <div className="service-item">
            <h3>Проектирование специальной арматуры</h3>
            <p>Разработка арматуры для специфических условий эксплуатации, таких как высокие температуры, давление, коррозионные среды.</p>
            <button className="service-button">Подробнее</button>
          </div>
          <div 
            className="service-item all-services" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <a href="/services" className="all-services-link">Все услуги</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
