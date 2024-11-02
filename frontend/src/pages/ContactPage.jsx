import React, { useState } from 'react';
import '../styles/ContactPage.css';
import { Link } from 'react-router-dom';
import config from '../config'; // Подключаем конфиг для URL API

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/send-email`, { // URL из config.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Сообщение успешно отправлено');
        setFormData({ name: '', email: '', phone: '', organization: '', message: '' });
      } else {
        setResponseMessage('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setResponseMessage('Не удалось отправить сообщение');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <label>ФИО:*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            
            <label>E-mail:*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label>Телефон:*</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            
            <label>Организация:</label>
            <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
            
            <label>Ваше сообщение:*</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
            
            <div className="consent">
              <input type="checkbox" required />
              <label>Согласен на <a href="#">обработку персональных данных</a>*</label>
            </div>
            
            <button type="submit">Отправить</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>

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
