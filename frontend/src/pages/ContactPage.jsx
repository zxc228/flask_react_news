import React from 'react';
import '../styles/ContactPage.css'; // Подключаем файл стилей
import { Link } from 'react-router-dom';

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <img src="/back4.png" alt="Header Background" className="header-image" />
        <h1>Контакты</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Контакты</h2>
          <p>📞 +7 (495) 642-84-41</p>
          <p>✉️ office@instark.ru</p>
          <p>📍 Москва, Варшавское шоссе, д. 125Ж, корп. 6</p>
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
    </div>
  );
}

export default ContactPage;
