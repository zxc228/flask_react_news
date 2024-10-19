import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MissionSection.css';
import config from '../config';

const MissionSection = () => {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных о миссии
    fetch(`${config.apiUrl}/mission`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setMission(data.mission); // Сохраняем данные о миссии
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Не удалось загрузить данные');
        setLoading(false);
      });
  }, []);

  // Пока данные загружаются
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если возникла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  // Если данные не найдены
  if (!mission) {
    return <div>Данные не найдены</div>;
  }

  return (
    <section className="mission-section">
      <h2 className="mission-title">{mission.title}</h2> {/* Используем title из API */}
      <p className="mission-description">{mission.description1}</p> {/* Используем первое описание из API */}
      <p className="mission-description">{mission.description2}</p> {/* Используем второе описание */}
      
      {/* Оборачиваем кнопку в Link для корректного перенаправления */}
      <Link to="/about">
        <button className="mission-learn-more-button">Узнать больше</button>
      </Link>
    </section>
  );
};

export default MissionSection;