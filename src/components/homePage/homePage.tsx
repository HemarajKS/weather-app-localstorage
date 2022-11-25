import React from 'react';
import Footer from '../footer/footer';
import './homePage.css';
import { NavLink, Outlet } from 'react-router-dom';
import Router from '../Router/Router';
import HomeDetails from '../homeDetails/homeDetails';

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePageBody">
        <div className="homePageBodyContents">
          <HomeDetails />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
