import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MissionSection.css';
import config from '../config'; // Импорт конфигурации для API URL

const MissionSection = () => {
  const [missionContent, setMissionContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных миссии
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setMissionContent(data.mission);
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
    <section className="mission-section">
      <h2 className="mission-title">{missionContent.title}</h2> {/* Используем title из API данных */}
      <p className="mission-description">{missionContent.description1}</p> {/* Используем первое описание из API данных */}
      <p className="mission-description">{missionContent.description2}</p> {/* Используем второе описание */}
      
      {/* Оборачиваем кнопку в Link для корректного перенаправления */}
      <Link to="/about">
        <button className="mission-learn-more-button">Узнать больше</button>
      </Link>
    </section>
  );
};

export default MissionSection;