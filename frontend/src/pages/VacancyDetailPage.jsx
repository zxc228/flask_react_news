import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import '../styles/VacancyDetailPage.css';
import { Link } from 'react-router-dom';
import config from '../config';

function VacancyDetailsPage() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const navigate = useNavigate(); // Инициализируем useNavigate

  useEffect(() => {
    fetch(`${config.apiUrl}/vacancies/${id}`)
      .then(response => response.json())
      .then(data => setVacancy(data))
      .catch(error => console.error('Error fetching vacancy details:', error));
  }, [id]);

  if (!vacancy) {
    return <p>Loading...</p>;
  }

  const handleContactClick = () => {
    navigate('/contacts'); // Переход на страницу контактов
  };

  return (
    <div className="vacancy-details-page">
      <header className="vacancy-page-header-container">
                <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
                <h1>Вакансии</h1>
                <div className="breadcrumb">
                    <Link to="/vacancies" className="breadcrumb-link">
                        <span className="breadcrumb-text">Вакансии</span>
                    </Link>
                </div>
            </header>
      <h1>{vacancy.title}</h1>
      <div className="vacancy-content">
        <h2>Обязанности</h2>
        <p>{vacancy.content}</p>

        <h2>Требования</h2>
        <p>{vacancy.requirements || "Здесь должны быть требования (возможно, добавьте это поле в API)."}</p>

        <h2>Условия</h2>
        <p>{vacancy.conditions || "Здесь должны быть условия (возможно, добавьте это поле в API)."}</p>

        <h2>Тип занятости</h2>
        <p>{vacancy.type || "Полная занятость, полный день"}</p>
      </div>

      <div className="vacancy-apply">
        <button onClick={handleContactClick}>Свяжитесь с нами</button>
      </div>
    </div>
  );
}

export default VacancyDetailsPage;
