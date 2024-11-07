import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import MissionSection from '../components/MissionSection';
import config from '../config'; // Импорт конфигурации для API URL

const HomePage = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных о содержимом страницы
    fetch(`${config.apiUrl}/data`)
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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>{content.title}</h1> {/* Используем title из API данных */}
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