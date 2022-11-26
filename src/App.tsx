import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import Home from './views/home';

function App() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const local = localStorage.getItem('location');
  console.log('local', local);

  navigator.geolocation.getCurrentPosition(success, error, options);

  function success(pos: any) {
    const crd = pos.coords;
    if (local === null) {
      localStorage.setItem('location', `${crd.latitude},${crd.longitude}`);
    }
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (local === null) {
      localStorage.setItem('location', 'udupi');
    }
  }

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
