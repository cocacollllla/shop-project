import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    replaceData: (state, action) => 
      // state.push({...action.payload})
      state = action.payload
    ,
    favoriteT: (state, action) => {
      // const existingItem = state.find(el => el.id === action.payload);
      // existingItem.quantity++;
      // existingItem.totalPrice = existingItem.quantity * existingItem.price;
      // const existingItem = state.find(el => el.docID === action.payload.docID);
      state.favorite.push(action.payload);
      console.log(action.payload);
    
    },
    favoriteF: (state, action) => {
      // state[0].favorite.push(action.payload.userID)
      state.favorite.filter(gg => gg !== action.payload)
      console.log(action.payload);

    },
    deletefav: (state, action) => 
      state.filter(el => el.id !== action.payload)
    ,
  }
});

export const productsActions = productsSlice.actions;

export default productsSlice;