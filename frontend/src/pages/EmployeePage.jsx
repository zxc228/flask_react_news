import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/EmployeePage.css'; // Import your CSS styles

// Data for employees or partners
const employees = [
    {
      id: 1,
      name: 'Наталья Иванова',
      position: 'Главный конструктор',
      description: 'Ее путь в арматуростроение был не быстрым, но целеустремленным и осознанным. Наша героиня всегда верила, что каждая встреча и любая полученная информация имеют значение и могут повлиять на дальнейший путь. После окончания института она решила пройти дополнительное обучение, чтобы расширить свои профессиональные горизонты. Выбор пал на курсы по подготовке операторов арматурных станков. В процессе учебы она узнала о возможности освоить дополнительную профессию – наладчика автоматизированных линий на заводах, что открывало для нее новые перспективы. Так она совмещала теоретические знания с практическими навыками, постепенно наращивая свой профессиональный потенциал и опыт в арматуростроении.Этот осознанный подход к обучению и работе помог ей стать ключевым специалистом в своем отделе, внося вклад в развитие и модернизацию производства.',
      photo: '/natalia.jpg'  // Здесь была пропущена запятая
    },
    {
      id: 2,
      name: 'Алексей Петров',
      position: 'Технолог',
      description: 'Алексей занимается технологическим процессом...',
      photo: '/images/alexey_petrov.jpg'
    },
    // Add more employees here as necessary
  ];

// Component to display employee/partner details
const EmployeeDetailPage = () => {
  const { id } = useParams();
  const employee = employees.find(emp => emp.id === parseInt(id));

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