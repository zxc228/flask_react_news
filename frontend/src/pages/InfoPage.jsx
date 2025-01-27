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

  // Функция преобразования текста
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

        {infoPage.description && (
          <div className="formatted-description">
            {formatDescription(infoPage.description)} {/* Используем функцию для форматирования описания */}
          </div>
        )}
      </section>
    </div>
  );
};

export default InfoPage;