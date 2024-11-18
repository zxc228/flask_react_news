import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DevelopmentsPage.css';
import config from '../config';

function DevelopmentsPage() {
  const [developments, setDevelopments] = useState([]);
  const maxDescriptionLength = 100; // Максимальная длина описания
  const maxTitleLength = 50; // Максимальная длина заголовка

  useEffect(() => {
    fetch(`${config.apiUrl}/projects`)
      .then(response => response.json())
      .then(data => setDevelopments(data))
      .catch(error => console.log('Fetching error:', error));
  }, []);

  return (
    <div className="developments-page">
      <header className="developments-header">
        <picture>
          <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
          <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
        </picture>
        <h1>Наши разработки</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>

      <div className="developments-list">
        {developments.map(development => {
          const shortDescription = development.content.length > maxDescriptionLength
            ? `${development.content.slice(0, maxDescriptionLength)}...`
            : development.content;

          // Обрезаем заголовок, если он превышает maxTitleLength
          const shortTitle = development.name.length > maxTitleLength
            ? `${development.name.slice(0, maxTitleLength)}...`
            : development.name;

          // Формируем URL изображения
          const imageUrl = `${config.staticUrl}/project_images/${development.image}`;

          return (
            <div key={development.id} className="development-item">
              <div className="development-info">
                <h2>{shortTitle}</h2>
                <img src={imageUrl} alt={development.name} className="development-image" />
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