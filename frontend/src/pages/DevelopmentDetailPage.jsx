import React from 'react';
import { useParams, Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/DevelopmentDetailPage.css';

function DevelopmentDetailPage() {
  const { id } = useParams();
  const development = content.developments.find(dev => dev.id === parseInt(id));

  if (!development) {
    return <p>Разработка не найдена</p>;
  }

  return (
    <div className="development-detail-page">
      <header className="development-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Разработки</h1>
        <div className="breadcrumb">
          <Link to="/developments" className="breadcrumb-link">
            <span className="breadcrumb-text">Все разработки</span>
          </Link>
        </div>
      </header>

      <div className="development-detail-content">
        <h2>{development.title}</h2>
        <p>{development.description}</p>
      </div>
    </div>
  );
}

export default DevelopmentDetailPage;