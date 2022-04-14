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


export const getCartData = (uid) => { 
  return (dispatch) => {
    dbService.collection('cart').where('uid', "==", uid).onSnapshot((querySnapshot) => {
      const getProduct = querySnapshot.docs.map(doc => ({ docID:doc.id, isChecked: true,  ...doc.data()}));
      dispatch(cartActions.replaceData(getProduct));
    });
  }
};



export const cartQuantityPlus = (docID, id, quantity, price) => { 
  return (dispatch) => {
    dispatch(cartActions.plus(id));
     dbService.collection('cart').doc(docID).update({
      quantity: quantity + 1,
      totalPrice: (quantity + 1) * price
    });
  }
};

export const cartQuantityMinus = (docID, id, quantity, price) => { 
  return (dispatch) => {
    dispatch(cartActions.minus(id));
      dbService.collection('cart').doc(docID).update({
      quantity: quantity - 1,
      totalPrice: (quantity - 1) * price
    });
  }
};


export const cartDelete = (docID, id) => { 
  return async (dispatch) => {
    dispatch(cartActions.delete(id));
    await dbService.collection('cart').doc(docID).delete();
  }
};







