import React from 'react';
import { Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/DocumentsPage.css';

function DocumentsPage() {
  return (
    <div className="documents-page">
      <header className="documents-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Документы</h1>
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-text">Главная</span>
          </Link>
        </div>
      </header>
      <div className="documents-grid">
        {content.documents.map(doc => (
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