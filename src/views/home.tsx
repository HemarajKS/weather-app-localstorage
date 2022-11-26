import React, { useEffect } from 'react';
import Header from '../components/header/header';
import { NavLink } from 'react-router-dom';
import Router from '../components/Router/Router';
import './home.css';
import HomeBody from '../components/homeBody/homeBody';

const Home = () => {
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('fav') || '[]');
    const recent = JSON.parse(localStorage.getItem('recent') || '[]');

    if (JSON.stringify(fav) === '[]') {
      localStorage.setItem('fav', '[]');
    }
    if (JSON.stringify(recent) === '[]') {
      localStorage.setItem('recent', '[]');
    }
    console.log('local Storage Data', fav, recent);
  }, []);

  return (
    <div className="home">
      <Header />
      <HomeBody />
      <Router />
    </div>
  );
};

export default Home;
