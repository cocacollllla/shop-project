import { dbService } from "../myFirebase";
import { cartActions } from "./cart-slice";

export const getData = () => { 
  return (dispatch) => {
    dbService.collection('products').get().then((querySnapshot) => {
      let productItems = [];
      querySnapshot.forEach((doc) => {
        productItems = [...productItems, { docId:doc.id, ...doc.data()} ]
      });
      dispatch(cartActions.replaceData(productItems));
    });
  }
};



export const getCartData = () => { 
  return (dispatch) => {
    dbService.collection('cart').get().then((querySnapshot) => {
      let cartItems = [];
      querySnapshot.forEach((doc) => {
        cartItems = [...cartItems, { id:doc.id, ...doc.data()} ]
      });
      dispatch(cartActions.replaceData(cartItems));
    });
  }
};



export const cartQuantityPlus = (id, title, quantity, price) => { 
  return (dispatch) => {
    dispatch(cartActions.plus(id));
     dbService.collection('cart').doc(title).update({
      quantity: quantity + 1,
      totalPrice: (quantity + 1) * price
    });
  }
};

export const cartQuantityMinus = (id, title, quantity, price) => { 
  return (dispatch) => {
    dispatch(cartActions.minus(id));
      dbService.collection('cart').doc(title).update({
      quantity: quantity - 1,
      totalPrice: (quantity - 1) * price
    });
  }
};


export const cartDelete = (id, title) => { 
  return async (dispatch) => {
    dispatch(cartActions.delete(id));
    await dbService.collection('cart').doc(title).delete();
  }
};







