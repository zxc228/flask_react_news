import React from 'react';
import { Link } from 'react-router-dom';
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
  <p className="paragraph-large">
    Основные направления деятельности института:
  </p>
  <ul className="styled-list">
    <li>Разработка современных конструкций арматуры для тепловой и атомной энергетики, нефтяного и газового комплекса, магистральной арматуры, арматуры для нефтехимических предприятий.</li>
    <li>Внедрение конструкций в производство.</li>
    <li>Проектирование и создание отдельных технологических участков или целых производств по изготовлению арматуры и электроприводов.</li>
    <li>Организация комплексного сервисного обеспечения всей арматуры и электроприводов, находящихся в эксплуатации на энергоустановках.</li>
    <li>Разработка и внедрение технологий ремонта и восстановления арматуры.</li>
    <li>Проведение аудитов по оценке соответствия арматуры предъявляемым требованиям.</li>
    <li>Проведение аудитов по оценке способности производства выпускать арматуру со стабильным качеством.</li>
    <li>Создание наукоемкой арматуры.</li>
  </ul>

  <p className="paragraph-small">
    Проектирование и расчеты осуществляются посредством современных программных продуктов — SolidWorks, SolidEdge, Ansys и т.д. Институт сотрудничает с ведущими научно-техническими центрами России.
  </p>

  <h3>Руководство института</h3>
  <ul className="employee-list">
    <li><Link to="/directors/general">Генеральный директор</Link></li>
    <li><Link to="/directors/chief-engineer">Главный конструктор</Link></li>
    <li><Link to="/directors/technologist">Главный технолог</Link></li>
    <li><Link to="/directors/welder">Главный сварщик</Link></li>
    <li><Link to="/directors/accountant">Главный бухгалтер</Link></li>
  </ul>

  <h3>Перечень аттестаций персонала СТАРК:</h3>
  <ul className="attestation-list">
    <li>Деятельность в области промышленной безопасности в химической, нефтехимической и нефтеперерабатывающей промышленности, в нефтяной и газовой промышленности.</li>
    <li>Требования промышленной безопасности к оборудованию, работающему под давлением.</li>
    <li>Знание норм и правил, действующих в области использования атомной энергии.</li>
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