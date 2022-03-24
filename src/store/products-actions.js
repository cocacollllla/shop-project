import { dbService } from "../myFirebase";
import { productsActions } from "./products-slice";



export const favoriteTrue = (docID, userID, fav) => { 
  return async (dispatch) => {
    dispatch(productsActions.favoriteT(userID));
    let gdgd = fav.concat(userID);
    await dbService.collection('products').doc(docID).update({
      favorite: gdgd
    });

  }
};

export const favoriteFalse = (docID, userID, fav) => { 
  return async (dispatch) => {
    dispatch(productsActions.favoriteF(docID, userID));
    let gdgdd = fav.filter(el => { return el !== userID});
    await dbService.collection('products').doc(docID).update({
      favorite: gdgdd
    });

  }
};




// // export const getCartData = () => { 
// //   return (dispatch) => {
// //     dbService.collection('users').get().then((querySnapshot) => {
// //       let cartItems = [];
// //       querySnapshot.forEach((doc) => {
// //         cartItems = [...cartItems, { id:doc.id, ...doc.data()} ]
// //       });
// //       dispatch(cartActions.replaceData(cartItems));
// //     });
// //   }
// // };



// export const getCartData = (uid) => { 
//   return (dispatch) => {
//     dbService.collection('test_cart').where('uid', "==", uid).onSnapshot((querySnapshot) => {
//       const getProduct = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
//       dispatch(cartActions.replaceData(getProduct));
//     });
//   }
// };



// export const cartQuantityPlus = (docID, id, quantity, price) => { 
//   return (dispatch) => {
//     dispatch(cartActions.plus(id));
//      dbService.collection('test_cart').doc(docID).update({
//       quantity: quantity + 1,
//       totalPrice: (quantity + 1) * price
//     });
//   }
// };

// export const cartQuantityMinus = (docID, id, quantity, price) => { 
//   return (dispatch) => {
//     dispatch(cartActions.minus(id));
//       dbService.collection('test_cart').doc(docID).update({
//       quantity: quantity - 1,
//       totalPrice: (quantity - 1) * price
//     });
//   }
// };


// export const cartDelete = (docID, id) => { 
//   return async (dispatch) => {
//     dispatch(cartActions.delete(id));
//     await dbService.collection('test_cart').doc(docID).delete();
//   }
// };







