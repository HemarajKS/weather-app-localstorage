import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
      }}
    >
      <Home />
    </div>
  );
}

export default App;
