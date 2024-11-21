import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/EmployeePage.css';
import config from '../config';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then((data) => {
        const foundEmployee = data.employees.find((emp) => emp.id === parseInt(id));
        if (foundEmployee) {
          setEmployee(foundEmployee);
        } else {
          setError('Сотрудник не найден');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        setError('Сотрудник не найден');
        setLoading(false);
      });
  }, [id]);

  // Функция преобразования текста
  const formatDescription = (description) => {
    const regex = /\*(.*?)\*/g; // Ищем текст между звёздочками
    const parts = description.split('\n'); // Разделяем текст на строки
    const formattedParts = [];

    parts.forEach((line, index) => {
      const matches = [...line.matchAll(regex)]; // Находим все элементы внутри звёздочек
      if (matches.length > 0) {
        // Если есть элементы со звёздочками
        const listItems = matches.map((match) => match[1]); // Извлекаем текст между звёздочками
        formattedParts.push(
          <ul key={`list-${index}`}>
            {listItems.map((item, idx) => (
              <li key={`list-item-${idx}`}>{item}</li>
            ))}
          </ul>
        );
      } else {
        // Если это просто текст, добавляем как параграф
        formattedParts.push(<p key={`paragraph-${index}`}>{line.trim()}</p>);
      }
    });

    return formattedParts;
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

  const photoUrl = employee.photo
    ? `${config.staticUrl}/${employee.photo.replace(/^\/?flask-static\//, '')}`
    : null;

  return (
    <div className="employee-page">
      <header className="employee-header-container">
        <picture>
          <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
          <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
        </picture>
        <h1>Сотрудники</h1>
        <div className="breadcrumb-employee">
          <Link to="/about" className="breadcrumb-employee-link">
            <span className="breadcrumb-employee-text">Информация</span>
          </Link>
        </div>
      </header>

      <div className="detail-content">
        <h2>{employee.name}</h2>
        <h3>{employee.position}</h3>
        <div>{formatDescription(employee.description)}</div>
        {photoUrl && <img src={photoUrl} alt={employee.name} className="employee-photo" />}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;