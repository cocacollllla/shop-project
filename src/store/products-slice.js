import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    replaceData: (state, action) => 
      state = action.payload
    ,
    favoriteT: (state, action) => {
      state.favorite.push(action.payload);
      console.log(action.payload);
    
    },
    favoriteF: (state, action) => {
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