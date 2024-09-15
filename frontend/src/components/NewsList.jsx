import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../styles/NewsList.css'; 
import config from '../config';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Условие для мобильных устройств
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.apiUrl}/news`)
            .then(response => response.json())
            .then(data => {
                setNews(data);
                setIsLoading(false);
            })
            .catch(error => console.log('Fetching error: ', error));

        // Проверяем размер экрана и обновляем состояние при изменении ширины окна
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Условие для мобильных устройств
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleReadMoreClick = (id) => {
        navigate(`/news/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Если это мобильное устройство, отображаем только одну последнюю новость
    const displayedNews = isMobile ? news.slice(0, 1) : news.slice(0, 3);

    return (
        <div>
            <div className="news-container">
                <ul className="news-list">
                    {displayedNews.map((item) => (
                        <li className="news-item" key={item.id}>
                            <h3 className="news-date">{item.date}</h3>
                            <h2 className="news-title-section">
                                {truncateText(item.title, 120)}
                            </h2>
                            <p className="news-content">
                                {truncateText(item.content, 200)}
                            </p>
                            <button 
                                className="news-link" 
                                onClick={() => handleReadMoreClick(item.id)}>
                                Подробнее
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="all-news-button-container">
                <button 
                    className="all-news-button" 
                    onClick={() => navigate('/news')}>
                    Все новости
                </button>
            </div>
        </div>
    );
}

export default NewsList;