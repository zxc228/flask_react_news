import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DocumentsPage.css';

function DocumentsPage() {
  // Предустановленные данные о документах
  const documents = [
    {
      id: 1,
      title: 'Сертификаты',
      files: [
        { name: 'Сертификат соответствия № TC RU C-RU.AA71.B.00006', url: '/0001.jpg' },
        { name: 'Сертификат соответствия № TC RU C-RU.AA71.B.00007', url: '/files/certificate2.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Лицензии',
      files: [
        { name: 'Лицензия на право конструирования оборудования для ядерных установок (блоков АС)', url: '/files/license1.pdf' }
      ]
    },
    {
      id: 3,
      title: 'Референции',
      files: [
        { name: 'Референции от компании-партнера', url: '/files/reference1.pdf' },
        { name: 'Референции от компании-партнера', url: '/files/reference2.pdf' },
        { name: 'Референции от компании-партнера', url: '/files/reference3.pdf' }
      ]
    }
  ];

  return (
    <div className="documents-page">
      <header className="documents-header">
        <img src="/back4.png" alt="Header Background" className="header-image" />
        <h1>Документы</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">&larr;</span>
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>
      <div className="documents-grid">
        {documents.map(doc => (
          <div key={doc.id} className="document-card">
            <div className="document-card-header">
              <h3>{doc.title}</h3>
            </div>
            <div className="document-card-body">
              <ul>
                {doc.files.slice(0, 2).map((file, index) => (
                  <li key={index}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="document-card-footer">
              <Link to={`/documents/${doc.id}`} className="document-detail-link">Показать все</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;