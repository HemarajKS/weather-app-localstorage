import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { mobileMenu } from './redux/reducers/showMobileMenu';
import { showSugg } from './redux/reducers/showSuggestions';
import './style.css';
import Home from './views/home';

function App() {
  const dispatch = useDispatch();

  return (
    <div
      className="App"
      onClick={() => {
        dispatch(showSugg(false));
        dispatch(mobileMenu(false));
      }}
    >
      <Home />
    </div>
  );
}

export default App;
