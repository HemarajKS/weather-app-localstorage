import './homeBody.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomeBody = () => {
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
    <div className="body">
      <div className="bodyTabHeader">
        <div className="bodyTabLinks">
          <div className="bodyTab">
            <NavLink to="/">HOME</NavLink>
          </div>
          <div className="bodyTab">
            <NavLink to="/favourites">FAVOURITE</NavLink>
          </div>
          <div className="bodyTab">
            <NavLink to="/recent">RECENT SEARCH</NavLink>
          </div>
        </div>
        <div className="bodyTabTime">
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
      </div>
    </div>
  );
};

export default HomeBody;
