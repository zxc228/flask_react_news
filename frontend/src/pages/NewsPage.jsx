import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsPage.css';
import config from '../config';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState(['Все']); // Начальная категория - "Все"
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;

  useEffect(() => {
    fetch(`${config.apiUrl}/news`)
      .then(response => response.json())
      .then(data => {
        setNews(data);

        // Извлечение уникальных категорий из новостей
        const uniqueCategories = ['Все', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.log('Fetching error: ', error));
  }, []);

  // Фильтрация новостей по выбранной категории
  const filteredNews = selectedCategory === 'Все'
    ? news
    : news.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении категории
  };

  return (
    <div className="news-page-container">
      <header className="news-header-container">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Новости</h1>
      </header>
      
      <div className="category-filter">
        {categories.map((category, index) => (
          <label key={index} className="category-option">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <section className="news-content-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
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
              <p>{item.content}</p>
            </div>
            <Link to={`/news/${item.id}`} className="news-button-container">Подробнее</Link>
          </div>
        ))}
      </section>
      
      <div className="pagination-container">
        <span onClick={() => handlePageChange(currentPage - 1)} className="page-arrow">&lt;</span>
        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active-page-number' : 'page-number'}
          >
            {i + 1}
          </span>
        ))}
        <span onClick={() => handlePageChange(currentPage + 1)} className="page-arrow">&gt;</span>
      </div>
    </div>
  );
};

export default NewsPage;
