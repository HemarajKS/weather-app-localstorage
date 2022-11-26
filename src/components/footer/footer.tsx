import React from 'react';
import { useSelector } from 'react-redux';
import './footer.css';
const Footer = () => {
  const weather: any = {};
  return (
    <div className="footer">
      {true && (
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
              {0 + '\u00B0'}
              {} - {0 + '\u00B0'}
            </div>
          </div>
        </div>
      )}
      {
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_precipitation_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Precipitation</div>
            <div className="footerInfoValue">{0}%</div>
          </div>
        </div>
      }
      {
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_humidity_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Humidity</div>
            <div className="footerInfoValue">{0}%</div>
          </div>
        </div>
      }
      {
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_wind_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Wind</div>
            <div className="footerInfoValue"> {0} mph</div>
          </div>
        </div>
      }
      {
        <div className="footerBody">
          <div className="footerIcon">
            <img
              src={require('../../assets/icons/icon_visibility_info.png')}
              alt=""
            />
          </div>
          <div className="footerText">
            <div className="footerInfo">Visibility</div>
            <div className="footerInfoValue">{0} miles</div>
          </div>
        </div>
      }
    </div>
  );
};

export default Footer;
