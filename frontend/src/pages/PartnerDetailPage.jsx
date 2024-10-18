import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../config'; // Убедитесь, что у вас есть правильный файл config.js
import '../styles/PartnerDetailPage.css';

const PartnerDetailPage = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${config.apiUrl}/data`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const partnerData = data.partners.find(p => p.id === parseInt(id));
                setPartner(partnerData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetching error: ', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка при загрузке данных: {error.message}</div>;
    }

    if (!partner) {
        return <div>Партнёр не найден</div>;
    }

    return (
        <div className="partner-detail-page">
            <header className="partner-page-header-container">
                <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
                <h1>Партнёр</h1>
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