import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/VacancyPage.css';
import config from '../config';

function VacancyPage() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/vacancies`)
      .then(response => response.json())
      .then(data => setVacancies(data))
      .catch(error => console.log('Error fetching vacancies:', error));
  }, []);

  return (
    <div className="vacancy-page">
      <header className="vacancy-page-header-container">
                <picture>
  <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
  <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
</picture>
                <h1>Вакансии</h1>
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        <span className="breadcrumb-text">Главная</span>
                    </Link>
                </div>
            </header>
      <div className="vacancies-list">
        {vacancies.map(vacancy => (
          <div key={vacancy.id} className="vacancy-item">
            <h2>{vacancy.title}</h2>
            <p>{vacancy.content.substring(0, 100)}...</p> {/* Краткое описание */}
            <Link to={`/vacancies/${vacancy.id}`} className="vacancy-detail-link">Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VacancyPage;
