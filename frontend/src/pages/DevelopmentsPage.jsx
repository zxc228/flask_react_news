import React from 'react';
import { Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/DevelopmentsPage.css';

function DevelopmentsPage() {
  const maxDescriptionLength = 100; // Максимальная длина описания

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
        {content.developments.map(development => {
          // Обрезаем описание, если его длина превышает maxDescriptionLength
          const shortDescription = development.description.length > maxDescriptionLength
            ? `${development.description.slice(0, maxDescriptionLength)}...`
            : development.description;

          return (
            <div key={development.id} className="development-item">
              <div className="development-info">
                <h2>{development.title}</h2>
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