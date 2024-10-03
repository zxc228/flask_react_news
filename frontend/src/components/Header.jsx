import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setMenuOpen(false); // Закрываем меню, если разрешение больше 1024
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen, isMobile]);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <div className="header-logo">
            <img src="/logo_ulta_canon.svg" alt="logo" />
          </div>
        </Link>
      </div>

      {/* Обычная навигация для экранов 1024px и больше */}
      {!isMobile && (
        <nav className="navigation">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/about">Информация</Link></li>
            <li><Link to="/services">Услуги</Link></li>
            <li><Link to="/partners">Партнеры и Заказчики</Link></li>
            <li><Link to="/developments">Проекты</Link></li>
            <li><Link to="/documents">Документы</Link></li>
            <li><Link to="/news">Новости</Link></li>
          </ul>
        </nav>
      )}

      {/* Иконка бургер-меню для экранов меньше 1024px */}
      {isMobile && (
        <div className="burger-menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={30} color="white" /> : <FaBars size={30} color="white" />}
        </div>
      )}

      {/* Sidebar menu для мобильных устройств */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="header-logo">
          <img src="/canon.svg" alt="logo" />
        </div>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Главная</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>Информация</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Услуги</Link></li>
          <li><Link to="/partners" onClick={toggleMenu}>Партнеры и Заказчики</Link></li>
          <li><Link to="/developments" onClick={toggleMenu}>Проекты</Link></li>
          <li><Link to="/documents" onClick={toggleMenu}>Документы</Link></li>
          <li><Link to="/news" onClick={toggleMenu}>Новости</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;