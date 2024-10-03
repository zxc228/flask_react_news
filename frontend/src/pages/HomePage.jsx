import React from 'react';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import MissionSection from '../components/MissionSection';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>СТАРК - надежный партнер для успешного развития Вашего бизнеса</h1>
          {/* Кнопка с ссылкой на страницу "О нас" */}
          <Link to="/about">
            <button className="learn-more-button">Узнать больше</button>
          </Link>
        </div>
      </main>
      {/* Добавляем компонент "Наша миссия" */}
      <MissionSection />
    </>
  );
};

export default HomePage;
