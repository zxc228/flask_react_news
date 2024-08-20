import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3;

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/news')
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
                                <h2 className="news-title-section">{item.title}</h2>
                                <p className="news-content">{item.content}</p>
                                <a href="#" className="news-link">Подробнее</a>
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
