import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import { authService, dbService } from './myFirebase';
import { usersActions } from './store/users-slice';
import { getCartData } from './store/cart-actions';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
     authService.onAuthStateChanged(user => {
      if(user) {
        setIsLoggedIn(true);
        dispatch(usersActions.replaceData({uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL}));
        dispatch(getCartData(user.uid));
        // let userInfo = user.uid;
        // dbService.collection('users').where('uid', "==", userInfo).onSnapshot((querySnapshot) => {
        //   const userUser = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
        //   dispatch(usersActions.replaceData(userUser));
        // });
      } else {
        setIsLoggedIn(false);
        dispatch(usersActions.replaceData(null));
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
