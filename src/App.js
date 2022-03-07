import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import { authService } from './myFirebase';
import { usersActions } from './store/users-slice';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        setIsLoggedIn(true);
        dispatch(usersActions.replaceData({displayName: user.displayName, email: user.email}));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  console.log(isLoggedIn);
  return (
    <>
      {init ? <Routes isLoggedIn={isLoggedIn} /> : "Loading...."}
    </>
  );
}

export default App;
