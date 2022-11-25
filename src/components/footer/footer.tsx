import React from 'react';
import { useSelector } from 'react-redux';
import './footer.css';
const Footer = () => {
  const weather: any = useSelector((state: any) => state.search);

  return (
    <div className="footer">
      {weather && weather.search && (
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_temperature_info.png')}
              alt=""
            />
          </div>

          <div className="footerText">
            <div className="footerInfo">Min - Max</div>
            <div className="footerInfoValue">
              {weather.search.temp_min.toFixed(0) + '\u00B0'}
              {} - {weather.search.temp_max.toFixed(0) + '\u00B0'}
            </div>
          </div>
        </div>
      )}
      {weather && weather.search && (
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_precipitation_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Precipitation</div>
            <div className="footerInfoValue">
              {weather.search.precep.toFixed(0)}%
            </div>
          </div>
        </div>
      )}
      {weather && weather.search && (
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_humidity_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Humidity</div>
            <div className="footerInfoValue">
              {weather.search.humidity.toFixed(0)}%
            </div>
          </div>
        </div>
      )}
      {weather && weather.search && (
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_wind_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Wind</div>
            <div className="footerInfoValue">
              {' '}
              {weather.search.wind.toFixed(0)} mph
            </div>
          </div>
        </div>
      )}
      {weather && weather.search && (
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_visibility_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Visibility</div>
            <div className="footerInfoValue">
              {weather.search.visibility.toFixed(0)} miles
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
