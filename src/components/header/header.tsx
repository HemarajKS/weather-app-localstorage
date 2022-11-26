import React, { useEffect, useState } from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';
import { getweather } from '../../redux/reducers/weatherSlice';
import { currentData } from '../../redux/reducers/currentWeatherSlice';
import { getLocation } from '../../redux/reducers/locationAuto';

const Header = () => {
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mobilesearch, setMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const currPath = useLocation();

  const weather = useSelector((state: any) => state.weather);
  const locationSuggestion = useSelector((state: any) => state.location);

  useEffect(() => {
    const location = JSON.parse(localStorage.getItem('location') || '"udupi"');
    dispatch(getweather(location));
  }, []);

  useEffect(() => {
    dispatch(currentData(weather.data));
  }, [weather]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(getweather(e.target.search.value));
    setShowAutoComplete(false);
  };

  const onChangeHandler = (term: string) => {
    setSearchValue(term);
    dispatch(getLocation(term));
  };

  useEffect(() => {
    console.log('location', locationSuggestion);
  });

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
        className={
          mobilesearch ? 'headerSearch showHeaderSearchForm' : 'headerSearch'
        }
        onSubmit={submitHandler}
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
            setShowAutoComplete(true);
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
          {showAutoComplete &&
            locationSuggestion &&
            locationSuggestion.data &&
            locationSuggestion.data.data.map(
              (
                ele: { name: string; region: string; lat: number; lon: number },
                i: number
              ) => (
                <div
                  key={i}
                  className="headerAutoCompleteItems"
                  onClick={() => {
                    dispatch(getweather(`${ele.lat},${ele.lon}`));
                    setShowAutoComplete(false);
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
