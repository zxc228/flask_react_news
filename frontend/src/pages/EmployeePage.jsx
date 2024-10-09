import React from 'react';
import { useParams, Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/EmployeePage.css';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const employee = content.employees.find(emp => emp.id === parseInt(id)); // Ищем сотрудника по ID

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