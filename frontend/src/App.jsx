import React from 'react';
import './App.css';
import NewsList from './NewsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo1.png" alt="logo" className="logo" />
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="#">Главная</a></li>
              <li><a href="#">Услуги</a></li>
              <li><a href="#">Партнеры</a></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </nav>
          <div className="language-switch">
            <i className="fas fa-globe"></i>
            <span>RU</span>
          </div>
        </div>
      </header>
      <main className="App-main">
        <div className="overlay">
          <h1>СТАРК — Арматура будущего для устойчивого развития! </h1>
          <button className="learn-more-button">Узнать больше</button>
        </div>
      </main>
      <section className="news-section">
        <div className="news-wrapper">
          <div className="news-header">
            <h2 className="news-title">Новости</h2>
            <button className="all-news-button">Все новости</button>
          </div>
          <NewsList />
        </div>
      </section>
      <section className="about-us-section">
        <div className="about-us-wrapper">
          <h2 className="about-us-title">О нас</h2>
          <p className="about-us-description">
            Мы специализируемся на исследованиях и разработке современных технологий арматуростроительного комплекса. Наша команда профессионалов стремится к инновациям и качеству в каждой стадии производства, обеспечивая надежность и эффективность продукции.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;