import React from 'react';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>СТАРК — Арматура будущего для устойчивого развития!</h1>
          {/* Оборачиваем кнопку в Link для перехода на страницу "О нас" */}
          <Link to="/about">
            <button className="learn-more-button">Узнать больше</button>
          </Link>
        </div>
      </main>
      <section className="news-section">
        <div className="news-wrapper">
          <div className="news-header">
            <h2 className="news-title">Новости</h2>
          </div>
          <NewsList />
        </div>
      </section>
      <Services />
    </>
  );
};

export default HomePage;
