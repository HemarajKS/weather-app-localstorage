import React from 'react';
import { useSelector } from 'react-redux';
import './footer.css';
const Footer = () => {
  const weather = useSelector((state: any) => state.weather);

  const tempUnit = useSelector((state: any) => state.tempUnit.value);
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
              {tempUnit
                ? weather &&
                  weather.data &&
                  weather.data.data &&
                  weather.data.data.current &&
                  weather.data.data.current.temp_f.toFixed(0) - 2 + '\u00B0'
                : weather &&
                  weather.data &&
                  weather.data.data &&
                  weather.data.data.current &&
                  weather.data.data.current.temp_c.toFixed(0) -
                    2 +
                    '\u00B0'}{' '}
              {'-'}{' '}
              {tempUnit
                ? (weather &&
                    weather.data &&
                    weather.data.data &&
                    weather.data.data.current &&
                    weather.data.data.current.temp_f.toFixed(0) - -2) + '\u00B0'
                : (weather &&
                    weather.data &&
                    weather.data.data &&
                    weather.data.data.current &&
                    weather.data.data.current.temp_c.toFixed(0) - -2) +
                  '\u00B0'}
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
            <div className="footerInfoValue">
              {weather &&
                weather.data &&
                weather.data.data &&
                weather.data.data.current &&
                weather.data.data.current.precip_mm}
              %
            </div>
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
            <div className="footerInfoValue">
              {weather &&
                weather.data &&
                weather.data.data &&
                weather.data.data.current &&
                weather.data.data.current.humidity}
              %
            </div>
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
            <div className="footerInfoValue">
              {' '}
              {weather &&
                weather.data &&
                weather.data.data &&
                weather.data.data.current &&
                weather.data.data.current.wind_mph}{' '}
              mph
            </div>
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
            <div className="footerInfoValue">
              {weather &&
                weather.data &&
                weather.data.data &&
                weather.data.data.current &&
                weather.data.data.current.vis_miles}{' '}
              miles
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Footer;
