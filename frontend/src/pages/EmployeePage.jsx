import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/EmployeePage.css';
import config from '../config';

const EmployeeDetailPage = () => {
  const { id } = useParams(); // Получаем ID из параметров маршрута
  const [employee, setEmployee] = useState(null);
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
        // Находим сотрудника по ID
        const foundEmployee = data.employees.find(emp => emp.id === parseInt(id));
        if (foundEmployee) {
          setEmployee(foundEmployee);
        } else {
          setError('Сотрудник не найден');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Сотрудник не найден');
        setLoading(false);
      });
  }, [id]); // Этот эффект срабатывает, когда изменяется ID

  // Пока данные загружаются
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если возникла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  // Если сотрудник не найден
  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

  // Формируем полный путь к фото, используя config.staticUrl
  const photoUrl = employee.photo ? `${config.staticUrl}/${employee.photo}` : null;

  return (
    <div className="employee-page">
      <header className="employee-header-container">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
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
        <p>{employee.description}</p>
        {photoUrl && <img src={photoUrl} alt={employee.name} className="employee-photo" />}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
