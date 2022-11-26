import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import Home from './views/home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
