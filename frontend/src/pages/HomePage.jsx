import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import MissionSection from '../components/MissionSection';
import { Link } from 'react-router-dom';
import config from '../config'; // Убедитесь, что у вас есть правильный файл config.js

const HomePage = () => {
  const [content, setContent] = useState(null);
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
        setContent(data);  // Устанавливаем данные из API в состояние content
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
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>{content.title}</h1> {/* Используем title из API */}
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