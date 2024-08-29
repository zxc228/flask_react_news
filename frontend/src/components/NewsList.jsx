import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';  // Импортируем hook для навигации
import '../styles/App.css'; 

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3;
    const navigate = useNavigate();  // Инициализируем hook навигации

    useEffect(() => {
        fetch('http://127.0.0.1:5001/api/news')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.log('Fetching error: ', error));
    }, []);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    // Функция для обрезки текста
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleReadMoreClick = (id) => {
        navigate(`/news/${id}`);  // Перенаправляем пользователя на страницу новости
    };

    return (
        <div>
            <div className="news-container">
                <TransitionGroup component="ul" className="news-list">
                    {currentNews.map((item) => (
                        <CSSTransition
                            key={item.id}
                            timeout={600}
                            classNames="news-item"
                        >
                            <li className="news-item">
                                <h3 className="news-date">{item.date}</h3>
                                <h2 className="news-title-section">
                                    {truncateText(item.title, 120)} {/* Обрезка до 50 символов */}
                                </h2>
                                <p className="news-content">
                                    {truncateText(item.content, 200)} {/* Обрезка до 100 символов */}
                                </p>
                                <button 
                                    className="news-link" 
                                    onClick={() => handleReadMoreClick(item.id)}>
                                    Подробнее
                                </button>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <div className="pagination-dots">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <span
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={number === currentPage ? 'active' : ''}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default NewsList;
