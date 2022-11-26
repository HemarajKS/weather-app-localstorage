import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';

import './homeDetails.css';

const HomeDetails = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: any) => state.weather);

  const [checked, setChecked] = useState(true);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.log('current weather', weather);
  }, [weather]);

  return (
    <div className="homeBodyContainer">
      <div className="HomePage">
        <div className="HomePagebodyTabTime">
          {' '}
          <span>
            {' '}
            {date.toLocaleString('en-us', {
              weekday: 'short',
            })}
            , {date.getDate()}{' '}
            {date.toLocaleString('en-us', {
              month: 'short',
            })}{' '}
            {date.getFullYear()}
            &nbsp;&nbsp;&nbsp;
            {date.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
        </div>
        {true ? (
          <>
            {<div className="homePagePlace">Bailur, Karkala</div>}
            {
              <>
                {true ? (
                  <div className="homePageFav" onClick={() => {}}>
                    <div className="homePageFavIcon">
                      <img
                        src={require('../../assets/icons/icon_favourite_Active.png')}
                        alt="Favourite"
                        width={25}
                      />
                    </div>
                    <div
                      className="homePageFavText"
                      style={{ color: '#FAD05B' }}
                    >
                      Added to favourite
                    </div>
                  </div>
                ) : (
                  <div className="homePageFav" onClick={() => {}}>
                    <div className="homePageFavIcon">
                      <img
                        src={require(`../../assets/icons/icon_favourite.png`)}
                        alt="Favourite"
                      />
                    </div>
                    <div className="homePageFavText">Add to favourite</div>
                  </div>
                )}
              </>
            }
            {
              <div className="homePageWeather">
                <div className="homePageWeatherIcon">
                  <img
                    src="icon"
                    alt="Weather"
                    className="homePageWeatherIcon"
                  />
                </div>
                <div className="homePageWeatherTemperature">
                  <div className="homePageWeatherTemp">
                    {' '}
                    {checked ? 0 + '\u00B0' : 0 + '\u00B0'}{' '}
                  </div>
                  <div className="homePageWeatherUnit">
                    <Switch
                      borderRadius={4}
                      onChange={handleChange}
                      checked={checked}
                      className="react-switch"
                      offColor="transparent"
                      onColor="transparent"
                      uncheckedHandleIcon={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            fontSize: 18,
                            color: 'red',
                          }}
                        >
                          {'\u00B0'}C
                        </div>
                      }
                      uncheckedIcon={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            fontSize: 18,
                            paddingRight: 2,
                            color: 'white',
                            zIndex: '2',
                          }}
                        >
                          {'\u00B0'}F
                        </div>
                      }
                      checkedIcon={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            fontSize: 18,
                            paddingRight: 2,
                            color: 'white',
                          }}
                        >
                          {'\u00B0'}C
                        </div>
                      }
                      checkedHandleIcon={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: 'red',
                            fontSize: 18,
                          }}
                        >
                          {'\u00B0'}F
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="homePageWeatherText">Sunny</div>
              </div>
            }
          </>
        ) : (
          'loading'
        )}
      </div>
    </div>
  );
};

export default HomeDetails;
