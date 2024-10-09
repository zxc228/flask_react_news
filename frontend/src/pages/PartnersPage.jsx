import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import content from '../content.json'; // Импортируем данные из JSON
import '../styles/PartnersPage.css';

const PartnersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const partnersPerPage = 4;

    // Фильтрация партнеров: исключаем тех, у кого нет логотипа
    const filteredPartners = content.partners.filter(partner => partner.logo);

    // Подсчет общего количества страниц
    const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

    // Получаем партнеров для текущей страницы
    const indexOfLastPartner = currentPage * partnersPerPage;
    const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
    const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);

    // Функция для смены страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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