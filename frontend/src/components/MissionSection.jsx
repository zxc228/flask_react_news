import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MissionSection.css';
import content from '../content.json';
const MissionSection = () => {
  return (
    <section className="mission-section">
      <h2 className="mission-title">{content.mission.title}</h2> {/* Используем title из JSON */}
      <p className="mission-description">{content.mission.description1}</p> {/* Используем описание из JSON */}
      <p className="mission-description">{content.mission.description2}</p> {/* Второе описание */}
      
      {/* Оборачиваем кнопку в Link для корректного перенаправления */}
      <Link to="/about">
        <button className="mission-learn-more-button">Узнать больше</button>
      </Link>
    </section>
  );
};

export default MissionSection;