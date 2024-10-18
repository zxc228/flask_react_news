import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../config'; // Убедитесь, что у вас есть правильный файл config.js
import '../styles/PartnersPage.css';

const PartnersPage = () => {
    const [partners, setPartners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const partnersPerPage = 4;

    useEffect(() => {
        fetch(`${config.apiUrl}/data`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const filteredPartners = data.partners.filter(partner => partner.logo); // Фильтрация партнеров по наличию логотипа
                setPartners(filteredPartners);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetching error: ', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    // Подсчет общего количества страниц
    const totalPages = Math.ceil(partners.length / partnersPerPage);

    // Получаем партнеров для текущей страницы
    const indexOfLastPartner = currentPage * partnersPerPage;
    const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
    const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner);

    // Функция для смены страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка при загрузке данных: {error.message}</div>;
    }

    return (
        <div className="partners-page">
            <header className="partner-page-header-container">
                <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
                <h1>Партнёры</h1>
                <div className="breadcrumb-partners">
                    <Link to="/" className="breadcrumb-partners-link">
                        <span className="breadcrumb-partners-text">Главная</span>
                    </Link>
                </div>
            </header>
            <div className="partners-list">
                {currentPartners.map((partner) => (
                    <div key={partner.id} className="partner-item">
                        <img src={partner.logo} alt={partner.name} className="partner-logo" />
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