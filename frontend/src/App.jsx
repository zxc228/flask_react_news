import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import InfoPage from './pages/InfoPage';
import ServicesPage from './pages/ServicePage';
import PartnersPage from './pages/PartnersPage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import ContactPage from './pages/ContactPage';
import VacancyPage from './pages/VacancyPage';
import VacancyDetailPage from './pages/VacancyDetailPage'; // Импортируем страницу деталей вакансий
import DocumentsPage from './pages/DocumentsPage'; // Импортируем страницу деталей вакансий
import DocumentCategoryPage from './pages/DocumentCategoryPage'; // Новый компонент

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/about" element={<InfoPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners/:id" element={<PartnerDetailPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/vacancies" element={<VacancyPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} /> {/* Добавляем маршрут для деталей вакансий */}
          <Route path="/documents" element={<DocumentsPage />} /> {/* Добавляем маршрут для деталей вакансий */}
          <Route path="/documents/:categoryId" element={<DocumentCategoryPage />} /> {/* Маршрут для категории документов */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
