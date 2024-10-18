import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../config'; // Убедитесь, что у вас есть правильный файл config.js
import '../styles/EmployeePage.css';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const employeeData = data.employees.find(emp => emp.id === parseInt(id));
        setEmployee(employeeData); // Устанавливаем данные найденного сотрудника в состояние
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetching error: ', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке данных: {error.message}</div>;
  }

  if (!employee) {
    return <div>Сотрудник не найден</div>;
  }

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
        {employee.photo && <img src={employee.photo} alt={employee.name} className="employee-photo" />}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;