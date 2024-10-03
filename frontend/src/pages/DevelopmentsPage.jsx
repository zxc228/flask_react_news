import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DevelopmentsPage.css';

function DevelopmentsPage() {
  const developments = [
    {
      id: 1,
      title: 'Клапаны предохранительные с пневматической системой управления',
      description: 'Краткое описание разработки 1...',
    },
    {
      id: 2,
      title: 'Краны шаровые запорно-регулирующие',
      imageUrl: '/kran 1 animated.png',
      description: 'Краткое описание разработки 2...',
    },
    {
      id: 3,
      title: 'Клапан паровой для БРОУ',
      imageUrl: '/klan.png',
      description: 'Краткое описание разработки 3...',
    },
  ];

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
        {developments.map(development => (
          <div key={development.id} className="development-item">
            <div className="development-info">
              <h2>{development.title}</h2>
              <p>{development.description}</p>
              <Link to={`/developments/${development.id}`} className="development-detail-link">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopmentsPage;