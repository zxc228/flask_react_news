import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/PartnerDetailPage.css';
import config from '../config';

const PartnerDetailPage = () => {
    const { id } = useParams(); // Получаем ID из параметров маршрута
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                // Находим партнёра по ID
                const foundPartner = data.partners.find(p => p.id === parseInt(id));
                if (foundPartner) {
                    setPartner(foundPartner);
                } else {
                    setError('Партнёр не найден');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('Партнёр не найден');
                setLoading(false);
            });
    }, [id]); // Этот эффект срабатывает, когда изменяется ID

    // Пока данные загружаются
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если возникла ошибка
    if (error) {
        return <div>{error}</div>;
    }

    // Если партнёр не найден
    if (!partner) {
        return <div>Партнёр не найден</div>;
    }

    return (
        <div className="partner-detail-page">
            <header className="partner-page-header-container">
                <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
                <h1>Партнеры и Заказчики</h1>
                <div className="breadcrumb-partners-b">
                    <Link to="/partners" className="breadcrumb-partners-link-b">
                        <span className="breadcrumb-partners-text-b">Партнёры</span>
                    </Link>
                </div>
            </header>
            <div className="partner-detail-content">
                <h2>{partner.name}</h2>
                <p>{partner.description}</p>
                <div
                    className="partner-details"
                    dangerouslySetInnerHTML={{ __html: partner.details }}
                />
                <p><strong>Официальный сайт:</strong> <a href={`http://${partner.website}`} target="_blank" rel="noopener noreferrer">{partner.website}</a></p>
                <p><strong>Направление сотрудничества:</strong> {partner.cooperation}</p>
            </div>
        </div>
    );
};

export default PartnerDetailPage;
