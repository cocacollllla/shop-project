import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import { authService, dbService } from './myFirebase';
import { usersActions } from './store/users-slice';
import { getCartData } from './store/cart-actions';
import { cartActions } from './store/cart-slice';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dbService.collection('users').onSnapshot((querySnapshot) => {
      const userUser = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));

      authService.onAuthStateChanged(user => {
        if(user) {
          const userFilter = userUser.find(el => el.uid === user.uid);
          setIsLoggedIn(true);
          dispatch(getCartData(user.uid));
          dispatch(usersActions.replaceData(userFilter));
        } else {
          setIsLoggedIn(false);
          dispatch(usersActions.replaceData(null));
          dispatch(cartActions.replaceData([]));
        }
        setInit(true);
      });

    });
  }, [dispatch]);

  return (
    <>
      {init ? <Routes isLoggedIn={isLoggedIn} /> : "Loading...."}
    </>
  );
}

export default App;
