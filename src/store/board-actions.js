import { dbService } from "../myFirebase";
import { boardActions } from "./board-slice";

export const getNoticeData = () => { 
  return (dispatch) => {
    dbService.collection('board').get().then((querySnapshot) => {
      let productItems = [];
      querySnapshot.forEach((doc) => {
        productItems = [...productItems, { docId:doc.id, ...doc.data()} ]
      });
      productItems.sort((a,b) => {
        if(a.isNotice === b.isNotice){
          return 0
        } else {
          if(a.isNotice) {
            return -1
          } else {
            return 1
          }
        }
      });
      dispatch(boardActions.replaceData(productItems));
    });
  }
};


export const noticeDelete = (id, title) => { 
  return async (dispatch) => {
    dispatch(boardActions.delete(id));
    await dbService.collection('board').doc(title).delete();
  }
};

export const getFaqData = () => { 
  return (dispatch) => {
    dbService.collection('faq').get().then((querySnapshot) => {
      let productItems = [];
      querySnapshot.forEach((doc) => {
        productItems = [...productItems, { docId:doc.id, ...doc.data()} ]
      });
      dispatch(boardActions.replaceData(productItems));
    });
  }
};

export const getFaqFilterData = (value) => { 
  return (dispatch) => {
    dbService.collection('faq').where('category', "==", value).onSnapshot((querySnapshot) => {
      const getProduct = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
      dispatch(boardActions.replaceData(getProduct));
    });
  }
};

export const faqDelete = (id, title) => { 
  return async (dispatch) => {
    dispatch(boardActions.delete(id));
    await dbService.collection('faq').doc(title).delete();
  }
};








