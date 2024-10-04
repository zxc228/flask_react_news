import React from 'react';
import '../styles/Footer.css'; // Для Footer.jsx
import { Link } from 'react-router-dom'; // Импортируем Link

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="footer-logo">
        <img src="/logo2.png" alt="logo" />
      </div>

      <div className="footer-links-and-contact">
        <div className="footer-links-container">
          <Link to="/vacancies">Вакансии</Link>
          <Link to="/contacts">Контакты</Link>
        </div>

        <div className="footer-contact-info">
          {/* Ссылка на звонок по номеру */}
          <p><i className="fas fa-phone"></i> <a href="tel:+74956428441" className="footer-link">+7 (495) 642-84-41</a></p>
          {/* Ссылка на почту */}
          <p><i className="fas fa-envelope"></i> <a href="mailto:office@instark.ru" className="footer-link">office@instark.ru</a></p>
          {/* Ссылка на Яндекс.Карты с адресом */}
          <p><i className="fas fa-map-marker-alt"></i> <a href="https://yandex.ru/maps/?text=Москва, Варшавское шоссе, д. 125Ж, корп. 6" target="_blank" rel="noopener noreferrer" className="footer-link">Москва, Варшавское шоссе, д. 125Ж, корп. 6</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-company-left">
          <p>© ООО ЦНИПИ «СТАРК» 2013</p>
        </div>
        <div className="footer-button-right">
          <Link to="/contacts">
            <button>Свяжитесь с нами</button>
          </Link> {/* Здесь нужно закрыть тег Link */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;