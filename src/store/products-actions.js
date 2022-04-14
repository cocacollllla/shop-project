import { dbService } from "../myFirebase";


export const favoriteTrue = (docID, userID, fav) => { 
  return async (dispatch) => {
    let gdgd = fav.concat(userID);
    console.log(gdgd);
    console.log(docID)
    await dbService.collection('products').doc(docID).update({
      favorite: gdgd
    });

  }
};

export const favoriteFalse = (docID, userID, fav) => { 
  return async (dispatch) => {
    let gdgdd = fav.filter(el => { return el !== userID});
    await dbService.collection('products').doc(docID).update({
      favorite: gdgdd
    });

  }
};




