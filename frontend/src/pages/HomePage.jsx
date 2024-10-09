import React from 'react';
import NewsList from '../components/NewsList';
import Services from '../components/Services';
import MissionSection from '../components/MissionSection';
import { Link } from 'react-router-dom';
import content from '../content.json';

const HomePage = () => {
  return (
    <>
      <main className="App-main">
        <div className="overlay">
          <h1>{content.title}</h1> {/* Используем title из JSON */}
          <Link to="/about">
            <button className="learn-more-button">Узнать больше</button>
          </Link>
        </div>
      </main>
      <MissionSection />
    </>
  );
};

export default HomePage;