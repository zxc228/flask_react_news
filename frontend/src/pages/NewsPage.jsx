import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import '../styles/NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/news')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.log('Fetching error: ', error));
  }, []);

  const totalPages = Math.ceil(news.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active-page-number' : 'page-number'}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="news-page-container">
      <header className="news-header-container">
        <img src="/back2.jpg" alt="Header Background" className="header-image" />
        <h1>Новости</h1>
      </header>
      <section className="news-content-container">
      <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
        {currentNews.map(item => (
          <div className="news-item-container" key={item.id}>
            <p className="news-date-container">{item.date}</p>
            <div className="news-item-content">
              <Link to={`/news/${item.id}`} className="news-title-container">
                {item.title}
              </Link>
              <p>
                {item.content}
              </p>
            </div>
            <Link to={`/news/${item.id}`} className="news-button-container">Подробнее</Link>
          </div>
        ))}
      </section>
      <div className="pagination-container">
        <span onClick={() => handlePageChange(currentPage - 1)} className="page-arrow">&lt;</span>
        {renderPageNumbers()}
        <span onClick={() => handlePageChange(currentPage + 1)} className="page-arrow">&gt;</span>
      </div>
    </div>
  );
};

export default NewsPage;
