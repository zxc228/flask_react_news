import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Убедитесь, что путь к файлу правильный

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Отключаем прокрутку при открытом меню
    } else {
      document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <div className="header-logo">
            <img src="/canon.svg" alt="logo" />
          </div>
        </Link>
      </div>
      <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/about">Информация</Link></li>
          <li><Link to="/services">Услуги</Link></li>
          <li><Link to="/news">Новости</Link></li>
          <li><Link to="/developments">Разработки</Link></li>
        </ul>
      </nav>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-icon ${menuOpen ? 'open' : ''}`}></div>
      </div>
      {menuOpen && (
        <div className="sidebar">
          <div className="logo-container">
            <Link to="/" onClick={toggleMenu}>
              <div className="header-logo">
                <img src="/canon.svg" alt="logo" />
              </div>
            </Link>
          </div>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Главная</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>Информация</Link></li>
            <li><Link to="/services" onClick={toggleMenu}>Услуги</Link></li>
            <li><Link to="/news" onClick={toggleMenu}>Новости</Link></li>
            <li><Link to="/developments" onClick={toggleMenu}>Разработки</Link></li>
            <li><Link to="/partners" onClick={toggleMenu}>Партнеры</Link></li>
            <li><Link to="/vacancies" onClick={toggleMenu}>Вакансии</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;