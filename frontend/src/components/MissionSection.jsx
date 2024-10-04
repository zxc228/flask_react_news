import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MissionSection.css';

const MissionSection = () => {
  return (
    <section className="mission-section">
      <h2 className="mission-title">Наша миссия</h2>
      <p className="mission-description">
        Наш коллектив стремится стать лидером в развитии отечественного арматуростроения на основе современных
        конструкторских и технологических решений для устойчивого и эффективного функционирования топливно-энергетического
        комплекса России.
      </p>
      <p className="mission-description">
        Основным конкурентным преимуществом института является компетентность и опыт сотрудников в тесном сотрудничестве с
        ведущими университетами и институтами России.
      </p>
      {/* Оборачиваем кнопку в Link для корректного перенаправления */}
      <Link to="/about">
        <button className="mission-learn-more-button">Узнать больше</button>
      </Link>
    </section>
  );
};

export default MissionSection;