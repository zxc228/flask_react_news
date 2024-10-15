import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/DevelopmentDetailPage.css';
import config from '../config';

function DevelopmentDetailPage() {
  const { id } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.apiUrl}/projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Разработка не найдена');
        }
        return response.json();
      })
      .then(data => {
        setDevelopment(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

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
        <h2>{development.name}</h2>
        <p>{development.content}</p>
      </div>
    </div>
  );
}

export default DevelopmentDetailPage;