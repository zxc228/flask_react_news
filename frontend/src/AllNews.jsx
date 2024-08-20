// AllNews.jsx
import React from 'react';

const AllNews = () => {
  return (
    <div className="all-news-page">
      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo1.png" alt="logo" />
          </div>
          <div className="footer-links-container">
            <div className="footer-links">
              <a href="#">О нас</a>
              <a href="#">Партнеры</a>
              <a href="#">Вакансии</a>
              <a href="#">Услуги</a>
              <a href="#">Контакты</a>
              <a href="#">Документы</a>
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
    </div>
  );
};

export default AllNews;
