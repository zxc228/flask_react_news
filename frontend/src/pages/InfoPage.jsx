import React from 'react';
import { Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/InfoPage.css';

const InfoPage = () => {
  return (
    <div className="info-page">
      <header className="info-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
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
            {content.infoPage.mainDirections.map((direction, index) => (
              <li key={index}>{direction}</li>
            ))}
          </ul>

          <p className="paragraph-small">
            Проектирование и расчеты осуществляются посредством современных программных продуктов — SolidWorks, SolidEdge, Ansys и т.д.
          </p>

          <h3>Руководство института</h3>
          <ul className="employee-list">
            {content.infoPage.management.map((employee) => (
              <li key={employee.id}>
                <Link to={`/directors/${employee.id}`}>{employee.position}</Link>
              </li>
            ))}
          </ul>

          <h3>Перечень аттестаций персонала СТАРК:</h3>
          <ul className="attestation-list">
            {content.infoPage.attestations.map((attestation, index) => (
              <li key={index}>{attestation}</li>
            ))}
          </ul>
        </div>

        <p className="paragraph-normal project-text">
          Проектирование и расчеты осуществляются посредством современных программных продуктов — SolidWorks, SolidEdge, Ansys и т.п. Институт сотрудничает с ведущими научно-техническими центрами России: ГНЦ РФ ОАО НПО «ЦНИИТМАШ», ФГБОУ ВПО «НИУ «МЭИ».
        </p>
      </section>
    </div>
  );
};

export default InfoPage;