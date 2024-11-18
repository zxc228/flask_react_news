import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InfoPage.css';
import config from '../config';

const InfoPage = () => {
  const [infoPage, setInfoPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных из content.json
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setInfoPage(data.infoPage);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Не удалось загрузить данные');
        setLoading(false);
      });
  }, []);

  // Пока данные загружаются
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если возникла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  // Если данные не найдены
  if (!infoPage) {
    return <div>Данные не найдены</div>;
  }

  return (
    <div className="info-page">
      <header className="info-header">
        <picture>
  <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
  <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
</picture>
        <h1>О нас</h1>
      </header>
      <section className="info-content">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
        <div className="info-text">
          <p className="paragraph-large">Основные направления деятельности института:</p>
          <ul className="styled-list">
            {infoPage.mainDirections.map((direction, index) => (
              <li key={index}>{direction}</li>
            ))}
          </ul>

          <h3>Руководство института</h3>
          <ul className="employee-list">
            {infoPage.management.map((employee) => (
              <li key={employee.id}>
                <Link to={`/directors/${employee.id}`}>{employee.position}</Link>
              </li>
            ))}
          </ul>

          <h3>Перечень аттестаций персонала СТАРК:</h3>
          <ul className="attestation-list">
            {infoPage.attestations.map((attestation, index) => (
              <li key={index}>{attestation}</li>
            ))}
          </ul>
        </div>

        <p className="paragraph-normal project-text">
        Проектирование и расчеты осуществляются посредством современных программных продуктов — SolidWorks, SolidEdge, КОМПАС, Ansys,  CFD Visual Platform for OpenFOAM. Институт сотрудничает с ведущими научно-техническими центрами России: ГНЦ РФ ОАО НПО «ЦНИИТМАШ», ОАО «НПО ЦКТИ», ФГБОУ ВПО «НИУ «МЭИ», МГУ, МГТУ им Н.Э. Баумана, Башкирский государственный университет, ООО «НИИ Транснефть».
        </p>
      </section>
    </div>
  );
};

export default InfoPage;
