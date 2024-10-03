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

  return (
    <div className="news-detail-page-container">
  <header className="news-detail-header-container">
    <img src="/comp_atom 2.jpg" alt="Header Background" className="news-detail-header-image" />
    <h1>Новости</h1>
  </header>
  
  {/* Перемещаем крошку сюда, чтобы она оказалась над контейнером */}
  <div className="news-details-breadcrumb">
    <Link to="/news" className="news-details-breadcrumb-link">
      <span className="news-details-breadcrumb-text">Все Новости</span>
    </Link>
  </div>

  <section className="news-detail-content-container">
    <div className="news-detail-item-container">
      <p className="news-detail-date-container">{newsItem.date}</p>
      <h2 className="news-detail-title-container">{newsItem.title}</h2>
      <p className="news-detail-description-container">
        {newsItem.content}
      </p>
    </div>
  </section>
</div>
  );
};

export default NewsDetailPage;
