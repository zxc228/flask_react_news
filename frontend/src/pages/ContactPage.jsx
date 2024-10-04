import React from 'react';
import '../styles/ContactPage.css'; // Подключаем файл стилей
import { Link } from 'react-router-dom';

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Контакты</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Контакты</h2>
          <p><a href="tel:+74956428441">📞 +7 (495) 642-84-41</a></p>
          <p><a href="mailto:office@instark.ru">✉️ office@instark.ru</a></p>
          <p><i className="fas fa-map-marker-alt"></i> <a href="https://yandex.ru/maps/?text=Москва, Варшавское шоссе, д. 125Ж, корп. 6" target="_blank" rel="noopener noreferrer" className="footer-link">Москва, Варшавское шоссе, д. 125Ж, корп. 6</a></p>
        </div>

        <div className="contact-form">
          <h2>Обратная связь</h2>
          <form>
            <label>ФИО:*</label>
            <input type="text" name="name" required />
            
            <label>E-mail:*</label>
            <input type="email" name="email" required />
            
            <label>Телефон:*</label>
            <input type="tel" name="phone" required />
            
            <label>Организация:</label>
            <input type="text" name="organization" />
            
            <label>Ваше сообщение:*</label>
            <textarea name="message" required></textarea>
            
            <div className="consent">
              <input type="checkbox" required />
              <label>Согласен на <a href="#">обработку персональных данных</a>*</label>
            </div>
            
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>

      {/* Контейнер с картой Яндекс */}
      <div className="contact-map">
        <h3>Наше местоположение</h3>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.621355%2C55.622085&z=16&text=%D0%92%D0%B0%D1%80%D1%88%D0%B0%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%20125%D0%96%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%206"
          width="400"
          height="200"
          frameBorder="0"
          allowFullScreen={true}>
        </iframe>
      </div>
    </div>
  );
}

export default ContactPage;