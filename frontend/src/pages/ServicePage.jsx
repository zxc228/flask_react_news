import React from 'react';
import { Link } from 'react-router-dom'; // Добавлен импорт Link
import '../styles/ServicePage.css'; // Подключаем файл стилей

function ServicePage() {
  return (
    <section className="service-page-section">
      <header className="service-page-header">
        <img src="/back4.png" alt="Header Background" className="header-image" />
        <h1>Наши услуги</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>
      <div className="service-page-wrapper">
        <div className="service-page-grid">
          <div className="service-page-item">
            <h3>Разработка конструкторской документации</h3>
            <p>Разработка технической документации для создания арматуры, включая чертежи, схемы и расчеты с использованием современных систем.</p>
          </div>
          <div className="service-page-item">
            <h3>Разработка технологической документации</h3>
            <p>Создание технологических процессов для производства арматуры, включая методы поверхностного упрочнения, защитные покрытия и наплавку.</p>
          </div>
          <div className="service-page-item">
            <h3>Проектирование трубопроводных систем</h3>
            <p>Инженерное проектирование трубопроводных систем для различных отраслей, включая нефтегазовый сектор, тепловую и атомную энергетику.</p>
          </div>
          <div className="service-page-item">
            <h3>Обучение</h3>
            <p>Профессиональная подготовка и повышение квалификации специалистов в области арматуростроения и производства электроприводов.</p>
          </div>
          <div className="service-page-item">
            <h3>Проектирование специальной арматуры</h3>
            <p>Разработка арматуры для специфических условий эксплуатации, таких как высокие температуры, давление, коррозионные среды.</p>
          </div>
          <div className="service-page-item">
            <h3>Расчеты</h3>
            <p>Проведение прочностных, тепловых и других инженерных расчетов для подтверждения надежности и эффективности конструкций арматуры.</p>
          </div>
          <div className="service-page-item">
            <h3>Разработка программ локализации</h3>
            <p>Создание и внедрение программ локализации производства арматуры и комплектующих на российских предприятиях.</p>
          </div>
          <div className="service-page-item">
            <h3>Функционально-стоимостной анализ</h3>
            <p>Оценка стоимости и функциональности арматуры для оптимизации производственных затрат и повышения рентабельности.</p>
          </div>
          <div className="service-page-item">
            <h3>Маркетинговые исследования</h3>
            <p>Проведение исследований рынка арматуры для определения перспективных направлений развития и разработки новых продуктов.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicePage;
