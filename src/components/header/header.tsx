import React, { useEffect, useState } from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation } from '../../redux/reducers/locationAuto';
import { getweather } from '../../redux/reducers/weatherSlice';
import currentData, { currentSearch } from '../../redux/reducers/currentData';
import { recentData } from '../../redux/reducers/recentSlice';
import { getrecentData } from '../../redux/reducers/getRecentSlice';
import { getFavouriteData } from '../../redux/reducers/getFavSlice';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [Submit, setSubmit] = useState(false);
  const [mobilesearch, setMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const location = useSelector((state: any) => state.location);
  const weather = useSelector((state: any) => state.weather);
  const currData = useSelector((state: any) => state.search);
  const getRecent = useSelector((state: any) => state.getrecent.data);
  const fav = useSelector((state: any) => state.getFavourite.data);

  const currPath = useLocation();

  const onChangeHandler = (searchString: string) => {
    setSearchValue(searchString);
    dispatch(getLocation(searchString));
  };

  useEffect(() => {
    dispatch(getFavouriteData());
  }, [currData]);

  const data: any = weather &&
    weather.data &&
    weather.data.data && {
      id: `${weather.data.data.location.lat},${weather.data.data.location.lon}`,
      place: weather.data.data.location.name,
      region: weather.data.data.location.region,
      icon: `${weather.data.data.current.condition.icon}`,
      temp_f: weather.data.data.current.temp_f,
      temp_c: weather.data.data.current.temp_c,
      condition: weather.data.data.current.condition.text,
      temp_min: weather.data.data.current.temp_f - 2,
      temp_max: weather.data.data.current.temp_f + 2,
      precep: weather.data.data.current.precip_in,
      humidity: weather.data.data.current.humidity,
      wind: weather.data.data.current.wind_mph,
      visibility: weather.data.data.current.vis_miles,
      fav: false,
    };

  useEffect(() => {
    data && dispatch(currentSearch(data));
    dispatch(getrecentData());
  }, [weather]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(getweather(e.target.search.value));
    setShowAutoComplete(false);
    setSubmit(true);
  };

  useEffect(() => {
    dispatch(getrecentData());
    console.log('current', currData.search, getRecent.data);
    dispatch(recentData(currData.search));
    setSubmit(false);
  }, [currData]);

  useEffect(() => {}, [getRecent]);

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
            location &&
            location.data &&
            location.data.data &&
            location.data.data.map(
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
