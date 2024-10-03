import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DocumentCategoryPage.css';
import { Link } from 'react-router-dom';

function DocumentCategoryPage() {
  const { categoryId } = useParams();

  // Предустановленные данные о категориях и документах
  const documentCategories = {
    1: {
      title: 'Сертификаты',
      files: [
        { name: 'Сертификат соответствия № TC RU C-RU.AA71.B.00006', url: '/0001.jpg' },
        { name: 'Сертификат соответствия № TC RU C-RU.AA71.B.00007', url: '/files/certificate2.docx' },
        // Добавьте больше документов, если необходимо
      ]
    },
    2: {
      title: 'Лицензии',
      files: [
        { name: 'Лицензия на право конструирования оборудования для ядерных установок (блоков АС)', url: '/files/license1.docx' }
      ]
    },
    3: {
      title: 'Референции',
      files: [
        { name: 'Референции от компании-партнера', url: '/files/reference1.docx' },
        { name: 'Референции от компании-партнера', url: '/files/reference2.docx' },
        // Добавьте больше документов, если необходимо
      ]
    }
  };

  const category = documentCategories[categoryId];

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