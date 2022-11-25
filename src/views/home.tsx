import React from 'react';
import Header from '../components/header/header';
import { NavLink } from 'react-router-dom';
import Router from '../components/Router/Router';
import './home.css';
import HomeBody from '../components/homeBody/homeBody';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HomeBody />
      <Router />
    </div>
  );
};

export default Home;
