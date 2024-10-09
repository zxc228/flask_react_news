import React from 'react';
import { useParams, Link } from 'react-router-dom';
import content from '../content.json';
import '../styles/DocumentCategoryPage.css';

function DocumentCategoryPage() {
  const { categoryId } = useParams();
  const category = content.documents.find(doc => doc.id === parseInt(categoryId));

  if (!category) {
    return <p>Категория не найдена</p>;
  }

  return (
    <div className="document-category-page">
      <header className="documents-header">
        <img src="/comp_atom 2.jpg" alt="Header Background" className="header-image" />
        <h1>Документы</h1>
        <div className="breadcrumb">
          <Link to="/documents" className="breadcrumb-link">
            <span className="breadcrumb-text">Все документы</span>
          </Link>
        </div>
      </header>
      <div className="document-category-card">
        <div className="document-card-header">
          <h3>{category.title}</h3>
        </div>
        <div className="document-card-body">
          <ul>
            {category.files.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DocumentCategoryPage;