import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/NewsDetailPage.css';
import config from '../config';

const NewsDetailPage = () => {
  const { id } = useParams(); // Получаем ID новости из URL
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/news/${id}`)
      .then(response => response.json())
      .then(data => setNewsItem(data))
      .catch(error => console.log('Fetching error: ', error));
  }, [id]);

  if (!newsItem) {
    return <p>Загрузка...</p>;
  }

  // Формируем URL изображения для новости
  const imageUrl = `${config.staticUrl}/news_images/${newsItem.image}`;

  return (
    <div className="news-detail-page-container">
      <header className="news-detail-header-container">
        <picture>
          <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
          <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
        </picture>
        <h1>Новости</h1>
      </header>
      
      <div className="news-details-breadcrumb">
        <Link to="/news" className="news-details-breadcrumb-link">
          <span className="news-details-breadcrumb-text">Все Новости</span>
        </Link>
      </div>

      <section className="news-detail-content-container">
        <div className="news-detail-item-container">
          {/* Отображаем изображение новости */}
          <img src={imageUrl} alt={newsItem.title} className="news-detail-image" />
          
          <p className="news-detail-date-container">{newsItem.date}</p>
          <h2 className="news-detail-title-container">{newsItem.title}</h2>
          {/* Отображаем полное описание */}
          <p className="news-detail-description-container">
            {newsItem.content}
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;