import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';
import { temp } from '../../redux/reducers/tempUnit';

import './homeDetails.css';

const HomeDetails = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: any) => state.weather);
  const tempUnit = useSelector((state: any) => state.tempUnit.value);

  const handleChange = (nextChecked: boolean) => {
    dispatch(temp(nextChecked));
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
        {weather && !weather.isLoading && weather.isSuccess ? (
          <>
            {weather.data ? (
              <>
                {
                  <div className="homePagePlace">
                    {weather &&
                      weather.data &&
                      weather.data.data &&
                      weather.data.data.location &&
                      weather.data.data.location.name}
                    ,{' '}
                    {weather &&
                      weather.data &&
                      weather.data.data &&
                      weather.data.data.location &&
                      weather.data.data.location.region}
                  </div>
                }
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
                        src={
                          weather &&
                          weather.data &&
                          weather.data.data &&
                          weather.data.data.current &&
                          weather.data.data.current.condition.icon
                        }
                        alt="Weather"
                        className="homePageWeatherIcon"
                      />
                    </div>
                    <div className="homePageWeatherTemperature">
                      <div className="homePageWeatherTemp">
                        {' '}
                        {tempUnit
                          ? weather &&
                            weather.data &&
                            weather.data.data &&
                            weather.data.data.current &&
                            weather.data.data.current.temp_f.toFixed(0) +
                              '\u00B0'
                          : weather &&
                            weather.data &&
                            weather.data.data &&
                            weather.data.data.current &&
                            weather.data.data.current.temp_c.toFixed(0) +
                              '\u00B0'}{' '}
                      </div>
                      <div className="homePageWeatherUnit">
                        <Switch
                          borderRadius={4}
                          onChange={handleChange}
                          checked={tempUnit}
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
                    <div className="homePageWeatherText">
                      {weather &&
                        weather.data &&
                        weather.data.data &&
                        weather.data.data.current &&
                        weather.data.data.current.condition.text}
                    </div>
                  </div>
                }
              </>
            ) : (
              <div className="locationNotFound">
                Searched location not found
              </div>
            )}
          </>
        ) : (
          'loading'
        )}
      </div>
    </div>
  );
};

export default HomeDetails;
