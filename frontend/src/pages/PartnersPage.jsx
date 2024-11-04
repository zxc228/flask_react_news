import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PartnersPage.css';
import config from '../config'; // Импорт конфигурации для API и static URL

const PartnersPage = () => {
    const [partners, setPartners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const partnersPerPage = 4;

    useEffect(() => {
        // Делаем запрос к API для получения данных о партнёрах
        fetch(`${config.apiUrl}/data`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then(data => {
                // Сохраняем партнёров в состоянии
                setPartners(data.partners);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('Не удалось загрузить данные');
                setLoading(false);
            });
    }, []);

    // Фильтрация партнеров: исключаем тех, у кого нет логотипа
    const filteredPartners = partners.filter(partner => partner.logo);

    // Подсчет общего количества страниц
    const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

    // Получаем партнеров для текущей страницы
    const indexOfLastPartner = currentPage * partnersPerPage;
    const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
    const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);

    // Функция для смены страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Пока данные загружаются
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если возникла ошибка
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="partners-page">
            <header className="partner-page-header-container">
                <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
                <h1>Партнеры и Заказчики</h1>
                <div className="breadcrumb-partners">
                    <Link to="/" className="breadcrumb-partners-link">
                        <span className="breadcrumb-partners-text">Главная</span>
                    </Link>
                </div>
            </header>
            <div className="partners-list">
                {currentPartners.map((partner) => (
                    <div key={partner.id} className="partner-item">
                        {/* Используем staticUrl для логотипов */}
                        <img src={`${config.staticUrl}${partner.logo}`} alt={partner.name} className="partner-logo" />
                        <h2 className="partner-name">{partner.name}</h2>
                        <p className="partner-description">{partner.description}</p>
                        <Link to={`/partners/${partner.id}`} className="partner-link">Подробнее</Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PartnersPage;
