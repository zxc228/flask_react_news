import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/DevelopmentDetailPage.css';

function DevelopmentDetailPage() {
  const { id } = useParams();
  const development = {
    1: {
      title: 'Клапаны предохранительные с пневматической системой управления',
      description: `
        Данная разработка представляет собой современное решение для обеспечения безопасности технологических процессов. 
        Клапаны предохранительные с пневматической системой управления предназначены для автоматического сброса избыточного давления в системах, предотвращая аварийные ситуации. 
        Пневматическая система управления обеспечивает высокую точность и надежность срабатывания, минимизируя риски возникновения ошибок при эксплуатации оборудования.
      `,
    },
    2: {
      title: 'Краны шаровые запорно-регулирующие',
      description: `
        Разработка кранов шаровых запорно-регулирующих предназначена для использования в трубопроводных системах различного назначения. 
        Эти краны обеспечивают надежное перекрытие потока рабочей среды, а также могут регулировать интенсивность потока. 
        Применение высококачественных материалов и современные технологии производства гарантируют долговечность и надежность этих устройств в эксплуатации.
      `,
    },
    3: {
      title: 'Клапан паровой для БРОУ',
      description: `
        Клапан паровой для БРОУ (блоки регулирования и управления) используется в системах пароснабжения и предназначен для точного контроля и регулирования подачи пара. 
        Данная разработка отличается высокой эффективностью, долговечностью и устойчивостью к агрессивным условиям эксплуатации, таким как высокие температуры и давление.
      `,
    },
  }[id];

  if (!development) {
    return <p>Разработка не найдена</p>;
  }

  return (
    <div className="development-detail-page">
      <header className="development-header">
        <img src="/back4.png" alt="Header Background" className="header-image" />
        <h1>Разработки</h1>
        <div className="breadcrumb">
          <Link to="/developments" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Все разработки</span>
          </Link>
        </div>
      </header>

      <div className="development-detail-content">
        <h2>{development.title}</h2>
        <p>{development.description}</p>
      </div>
    </div>
  );
}

export default DevelopmentDetailPage;