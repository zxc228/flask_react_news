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

  // Функция преобразования текста с учетом всех правил
  const formatDescription = (description) => {
    const lines = description.split('\n'); // Разделяем текст на строки
    const formattedParts = [];
    let currentList = []; // Временное хранилище для пунктов списка

    const pushCurrentList = () => {
      if (currentList.length > 0) {
        // Если есть элементы списка, добавляем их как список
        formattedParts.push(
          <ul key={`list-${formattedParts.length}`}>
            {currentList.map((item, idx) => (
              <li key={`list-item-${idx}`}>{item}</li>
            ))}
          </ul>
        );
        currentList = []; // Очищаем список
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim(); // Убираем лишние пробелы

      if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*')) {
        // Если строка — элемент списка
        currentList.push(trimmedLine.slice(1, -1)); // Убираем звёздочки и добавляем в текущий список
      } else {
        // Если строка не является списком
        pushCurrentList(); // Завершаем текущий список, если он есть
        if (trimmedLine) {
          if (trimmedLine.endsWith(':')) {
            // Если строка заканчивается двоеточием, считаем её заголовком секции
            formattedParts.push(
              <h3 key={`heading-${index}`} className="section-heading">
                {trimmedLine}
              </h3>
            );
          } else {
            // Иначе это обычный текст абзаца
            formattedParts.push(
              <p key={`paragraph-${index}`} className="text-paragraph">
                {trimmedLine}
              </p>
            );
          }
        }
      }
    });

    pushCurrentList(); // Добавляем оставшийся список (если он есть)

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