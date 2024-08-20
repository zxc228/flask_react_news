import React from 'react';
import './App.css';
import NewsList from './NewsList';
import Services from './Services';
import AllNews from './AllNews'; // Импортируем компонент AllNews
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="logo-container">
              <img src="/logo4.png" alt="logo" className="logo" />
            </div>
            <nav className="navigation">
              <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/services">Услуги</Link></li>
                <li><Link to="#">Партнеры</Link></li>
                <li><Link to="#">Вакансии</Link></li>
                <li><Link to="#">Контакты</Link></li>
              </ul>
            </nav>
            <div className="language-switch">
              <i className="fas fa-globe"></i>
              <span>RU</span>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <main className="App-main">
                <div className="overlay">
                  <h1>СТАРК — Арматура будущего для устойчивого развития!</h1>
                  <button className="learn-more-button">Узнать больше</button>
                </div>
              </main>
              <section className="news-section">
                <div className="news-wrapper">
                  <div className="news-header">
                    <h2 className="news-title">Новости</h2>
                    <Link to="/news">
                      <button className="all-news-button">Все новости</button>
                    </Link>
                  </div>
                  <NewsList />
                </div>
              </section>
              <Services />
              <footer className="App-footer">
                <div className="footer-content">
                  <div className="footer-logo">
                    <img src="/logo1.png" alt="logo" />
                  </div>
                  <div className="footer-links-container">
                    <div className="footer-links">
                      <Link to="#">О нас</Link>
                      <Link to="#">Партнеры</Link>
                      <Link to="#">Вакансии</Link>
                      <Link to="#">Услуги</Link>
                      <Link to="#">Контакты</Link>
                      <Link to="#">Документы</Link>
                    </div>
                  </div>
                  <div className="footer-contact-info">
                    <p><i className="fas fa-phone"></i> +7 (495) 642-84-41</p>
                    <p><i className="fas fa-envelope"></i> office@instark.ru</p>
                    <p><i className="fas fa-map-marker-alt"></i> Москва, Варшавское шоссе, д. 125Ж, корп. 6</p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <div className="footer-company">
                    <p>© ООО ЦНИПИ «СТАРК» 2013</p>
                  </div>
                </div>
              </footer>
            </>
          } />
          <Route path="/news" element={<AllNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
