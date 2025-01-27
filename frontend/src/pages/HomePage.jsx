import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import MissionSection from '../components/MissionSection';
import config from '../config'; // Импорт конфигурации для API URL

const HomePage = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к API для получения данных о содержимом страницы
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>{content.title}</h1> {/* Используем title из API данных */}
          {content.description && (
            <div className="formatted-description">
              {formatDescription(content.description)} {/* Форматируем описание */}
            </div>
          )}
          <Link to="/about">
            <button className="learn-more-button">Узнать больше</button>
          </Link>
        </div>
      </main>
      <MissionSection />
    </>
  );
};

export default HomePage;