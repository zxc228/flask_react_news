import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DocumentsPage.css';
import config from '../config';

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/documents`)
      .then(response => response.json())
      .then(data => {
        // Группировка документов по типу
        const groupedDocuments = data.reduce((acc, doc) => {
          if (!acc[doc.type]) {
            acc[doc.type] = {
              id: doc.id,
              title: doc.type,
              files: []
            };
          }
          // Добавляем полную ссылку на документ, используя config.staticUrl
          acc[doc.type].files.push({ 
            name: doc.name, 
            url: `${config.staticUrl}/documents/${doc.file_path}` 
          });
          return acc;
        }, {});
        setDocuments(Object.values(groupedDocuments));
      })
      .catch(error => console.log('Fetching error:', error));
  }, []);

  return (
    <div className="documents-page">
      <header className="documents-header">
        <picture>
  <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
  <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
</picture>
        <h1>Документы</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
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
