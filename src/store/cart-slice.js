import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    replaceData: (state, action) => 
      // state.push(...action.payload)
      state = [...action.payload]
    ,
    plus: (state, action) => {
      const existingItem = state.find(el => el.id === action.payload);
      existingItem.quantity++;
      
    },
    minus: (state, action) => {
      const existingItem = state.find(el => el.id === action.payload);
      existingItem.quantity--;
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;