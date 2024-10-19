import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MissionSection from '../components/MissionSection';
import '../styles/HomePage.css';
import config from '../config';

const HomePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных из content.json
    fetch(`${config.apiUrl}/content`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
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
  if (!content) {
    return <div>Данные не найдены</div>;
  }

  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>{content.title}</h1> {/* Используем title из JSON */}
          <Link to="/about">
            <button className="learn-more-button">Узнать больше</button>
          </Link>
        </div>
      </main>
      <MissionSection />
    </>
  );
};

export default HomePage;