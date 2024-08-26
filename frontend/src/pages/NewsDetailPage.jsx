import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams(); // Получаем ID новости из URL
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/api/news/${id}`)
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
        <img src="/back2.jpg" alt="Header Background" className="news-detail-header-image" />
        <h1>Новости</h1>
        <div className="breadcrumb">
          <Link to="/news" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Все Новости</span>
          </Link>
        </div>
      </header>
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
