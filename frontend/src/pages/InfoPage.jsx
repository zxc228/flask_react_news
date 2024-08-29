import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InfoPage.css';

const InfoPage = () => {
  const carouselRef = useRef(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Запрос к API для получения данных о сотрудниках
    fetch('http://127.0.0.1:5001/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Ошибка при получении данных сотрудников:', error));
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="info-page">
      <header className="info-header">
        <img src="/back4.png" alt="Header Background" className="header-image" />
        <h1>О нас</h1>
      </header>
      <section className="info-content">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
        <div className="info-text">
          <p className="paragraph-large">
            В 2013 году по инициативе ООО «Гусар», ЗАО «КОНАР», АО «УКАЗ» был создан Центральный научно-исследовательский проектный институт «Современные Технологии Арматуростроительного Комплекса» (ООО ЦНИПИ «СТАРК»).
          </p>
          <p className="paragraph-normal">
            Основной профиль института – создание новых конструкций арматуры на основе инновационных технологий (технологии поверхностного упрочнения, технологии профилирования проточных частей арматуры, технологии защитных покрытий, наплавки, технологии обработки уплотнительных поверхностей) и инновационных материалов (сталей и сплавов с повышенными механическими и коррозионными свойствами, новые уплотнительные материалы).
          </p>
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
            Институт укомплектован опытными специалистами в области арматуростроения со стажем работы в данной области от 10 до 40 лет. Коллектив состоит из ведущих инженеров — конструкторов ОАО «Чеховский завод энергетического машиностроения», ОАО «Тяжпромарматура», ЗАО «Центральный конструкторско-технологический институт арматуростроения», ЗАО «Фирма Союз-01».
          </p>
        </div>

        {/* Карусель сотрудников */}
        <div className="info-carousel">
          <div className="carousel-arrow left" onClick={scrollLeft}>&lt;</div>
          <div className="carousel-container" ref={carouselRef}>
            {employees.map((employee, index) => (
              <div className="carousel-item" key={index}>
                <div className="carousel-photo">
                  <img 
                    src={`http://127.0.0.1:5001/static/${employee.photo}`} // Проверьте правильность пути к изображению
                    alt={`${employee.surname} ${employee.name}`} 
                    onError={(e) => { e.target.onerror = null; e.target.src="/default-photo.png" }} // Фотография по умолчанию в случае ошибки
                  />
                </div>
                <div className="carousel-text">
                  <p>{`${employee.surname} ${employee.name} ${employee.patronymic || ''}`}</p>
                  <p>{employee.vacancy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-arrow right" onClick={scrollRight}>&gt;</div>
        </div>

        {/* Текст под каруселью */}
        <p className="paragraph-normal project-text">
          Проектирование и расчеты осуществляются посредством современных программных продуктов — SolidWorks, SolidEdge, Ansys и т.п. Институт сотрудничает с ведущими научно-техническими центрами России: ГНЦ РФ ОАО НПО «ЦНИИТМАШ», ФГБОУ ВПО «НИУ «МЭИ».
        </p>

      </section>
    </div>
  );
};

export default InfoPage;
