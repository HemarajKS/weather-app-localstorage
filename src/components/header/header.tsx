import React, { useEffect, useState } from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';
import { getweather } from '../../redux/reducers/weatherSlice';
import { currentData } from '../../redux/reducers/currentWeatherSlice';
import { getLocation } from '../../redux/reducers/locationAuto';
import { recentAdd } from '../../redux/reducers/recentSlice';
import { showSugg } from '../../redux/reducers/showSuggestions';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [mobilesearch, setMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const currPath = useLocation();

  const weather = useSelector((state: any) => state.weather);
  const locationSuggestion = useSelector((state: any) => state.location);
  const showSuggestion = useSelector(
    (state: any) => state.showSuggestion.value
  );

  useEffect(() => {
    dispatch(getweather(localStorage.getItem('location')));
  }, []);

  useEffect(() => {
    submit &&
      weather.data &&
      weather.data.isSuccess &&
      localStorage.setItem(
        'location',
        `${weather.data.data.location.lat},${weather.data.data.location.lon}`
      );

    submit && weather.data && dispatch(recentAdd(weather.data.data));
    setSubmit(false);
  }, [weather && weather.data]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const local = localStorage.getItem('location');

    navigator.geolocation.getCurrentPosition(success, error, options);

    function success(pos: any) {
      const crd = pos.coords;
      if (local === null) {
        localStorage.setItem('location', `${crd.latitude},${crd.longitude}`);
        dispatch(getweather(`${crd.latitude},${crd.longitude}`));
      }
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      if (local === null) {
        localStorage.setItem('location', 'udupi');
        dispatch(getweather('udupi'));
      }
    }
  }, []);

  useEffect(() => {
    dispatch(currentData(weather.data));
  }, [weather]);

  const submitHandler: any = (e: any) => {
    e.preventDefault();
    dispatch(showSugg(false));
    if (e.target.search.value.length > 0) {
      dispatch(getweather(e.target.search.value));
    } else {
      alert('Enter place name in search field before submitting ');
    }

    setSubmit(true);
  };

  const onChangeHandler = (term: string) => {
    setSearchValue(term);
    dispatch(getLocation(term));
  };

  return (
    <div className="header">
      <div
        className="menuIcon"
        onClick={() => {
          setShowMobileMenu(true);
        }}
      >
        <img
          src={require('../../assets/icons/icon_menu_white.png')}
          alt="menu"
          className={currPath.pathname !== '/' ? 'invertImage' : ''}
        />
      </div>
      <div className="headerLogo">
        <img src={require('../../assets/images/logo_web.png')} alt="Logo" />
      </div>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          mobilesearch ? 'headerSearch showHeaderSearchForm' : 'headerSearch'
        }
        onSubmit={(e: any) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          className="headerSearchInput"
          placeholder="Search city"
          value={searchValue}
          onChange={(e: any) => {
            onChangeHandler(e.target.value);
          }}
          name="search"
          onFocus={() => {
            dispatch(showSugg(true));
          }}
          autoComplete="off"
        />
        <button className="headerSearchSubmit" type="submit">
          <img
            src={require('../../assets/icons/icon_search_white.png')}
            alt="Search"
            className="headerSearchIcon"
          />
        </button>
        <img
          src={require('../../assets/icons/icon_back_black.png')}
          alt="back"
          className="mobileBack"
          onClick={() => {
            setMobileSearch(false);
          }}
        />
        <div className="headerAutoComplete">
          {showSuggestion &&
            locationSuggestion &&
            locationSuggestion.data &&
            locationSuggestion.data.data &&
            locationSuggestion.data.data.map(
              (
                ele: { name: string; region: string; lat: number; lon: number },
                i: number
              ) => (
                <div
                  key={i}
                  className="headerAutoCompleteItems"
                  onClick={(e) => {
                    dispatch(getweather(`${ele.lat},${ele.lon}`));
                    localStorage.setItem('location', `${ele.lat},${ele.lon}`);
                    setSearchValue(ele.name);
                    dispatch(showSugg(false));

                    setSubmit(true);
                  }}
                >
                  {ele.name}, {ele.region}
                </div>
              )
            )}
        </div>
      </form>
      <div
        className="mobileSearchIcon"
        onClick={() => {
          setMobileSearch(!mobilesearch);
        }}
      >
        {' '}
        <img
          src={require('../../assets/icons/icon_search_white.png')}
          alt="menu"
          className={currPath.pathname !== '/' ? 'invertImage' : ''}
        />
      </div>
      <aside
        className={!showMobileMenu ? 'mobileMenu hideMobileMenu' : 'mobileMenu'}
      >
        <div className="mobileMenuLinks">
          <div className="mobileMenuLinksTabs">
            <NavLink
              to="/"
              onClick={() => {
                setShowMobileMenu(false);
              }}
            >
              Home
            </NavLink>
          </div>
          <div className="mobileMenuLinksTabs">
            <NavLink
              to="/favourites"
              onClick={() => {
                setShowMobileMenu(false);
              }}
            >
              Favourite
            </NavLink>
          </div>
          <div className="mobileMenuLinksTabs">
            <NavLink
              to="/recent"
              onClick={() => {
                setShowMobileMenu(false);
              }}
            >
              Recent Search
            </NavLink>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Header;
