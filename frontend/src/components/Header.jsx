import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Для Header.jsx

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Добавляем Link вокруг логотипа, чтобы перенаправлять на главную страницу */}
        <Link to="/">
          <img src="/logo2.png" alt="logo" className="logo" />
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/about">Информация</Link></li>
          <li><Link to="/services">Услуги</Link></li>
          <li><Link to="/news">Новости</Link></li>
          <li><Link to="/developments">Разработки</Link></li>
          <li><Link to="/partners">Партнеры</Link></li>
          <li><Link to="/vacancies">Вакансии</Link></li>
        </ul>
      </nav>
      {/* <div className="language-switch"> */}
        {/* <i className="fas fa-globe"></i> */}
        {/* <span>RU</span> */}
      {/* </div> */}
    </header>
  );
};

export default Header;
