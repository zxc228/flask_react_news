import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/DocumentCategoryPage.css';
import config from '../config';

function DocumentCategoryPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/documents`)
      .then(response => response.json())
      .then(data => {
        const selectedCategory = data.find(doc => doc.id === parseInt(categoryId));
        if (selectedCategory) {
          setCategory({
            title: selectedCategory.type,
            files: data.filter(doc => doc.type === selectedCategory.type).map(doc => ({
              name: doc.name,
              url: doc.file_path
            }))
          });
        }
      })
      .catch(error => console.log('Fetching error:', error));
  }, [categoryId]);

  if (!category) {
    return <p>Категория не найдена</p>;
  }

  return (
    <div className="document-category-page">
      <header className="documents-header">
        <picture>
  <source media="(max-width: 1023px)" srcSet="/comp_atom_2.jpg" />
  <img src="/comp_atom-fin.png" alt="Header Background" className="header-image" />
</picture>
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