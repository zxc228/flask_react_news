import React from 'react';
import '../styles/Footer.css'; // Для Footer.jsx
import { Link } from 'react-router-dom'; // Импортируем Link

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="footer-logo">
        <img src="/logo1.png" alt="logo" />
      </div>

      <div className="footer-links-and-contact">
        <div className="footer-links-container">
          <Link to="/vacancies">Вакансии</Link>
          <Link to="/contacts">Контакты</Link>
        </div>

        <div className="footer-contact-info">
          <p><i className="fas fa-phone"></i> +7 (495) 642-84-41</p>
          <p><i className="fas fa-envelope"></i> office@instark.ru</p>
          <p><i className="fas fa-map-marker-alt"></i> Москва, Варшавское шоссе, д. 125Ж, корп. 6</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-company-left">
          <p>© ООО ЦНИПИ «СТАРК» 2013</p>
        </div>
        <div className="footer-button-right">
          <button>Свяжитесь с нами</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;