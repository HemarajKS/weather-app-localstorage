import React from 'react';
import Footer from '../footer/footer';
import './homePage.css';

import HomeDetails from '../homeDetails/homeDetails';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const weather = useSelector((state: any) => state.weather);
  return (
    <div className="homePage">
      <div className="homePageBody">
        <div className="homePageBodyContents">
          <HomeDetails />
        </div>
      </div>
      {weather.data && <Footer />}
    </div>
  );
};

export default HomePage;
