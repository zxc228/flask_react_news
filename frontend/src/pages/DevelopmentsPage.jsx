import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DevelopmentsPage.css';
import config from '../config';

function DevelopmentsPage() {
  const [developments, setDevelopments] = useState([]);
  const maxDescriptionLength = 100; // Максимальная длина описания

  useEffect(() => {
    fetch(`${config.apiUrl}/projects`)
      .then(response => response.json())
      .then(data => setDevelopments(data))
      .catch(error => console.log('Fetching error:', error));
  }, []);

  return (
    <div className="developments-page">
      <header className="developments-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Наши разработки</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>

      <div className="developments-list">
        {developments.map(development => {
          // Обрезаем описание, если его длина превышает maxDescriptionLength
          const shortDescription = development.content.length > maxDescriptionLength
            ? `${development.content.slice(0, maxDescriptionLength)}...`
            : development.content;

          return (
            <div key={development.id} className="development-item">
              <div className="development-info">
                <h2>{development.name}</h2>
                <p>{shortDescription}</p>
                <Link to={`/developments/${development.id}`} className="development-detail-link">
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DevelopmentsPage;