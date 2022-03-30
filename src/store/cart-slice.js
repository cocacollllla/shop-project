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
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      
    },
    minus: (state, action) => {
      const existingItem = state.find(el => el.id === action.payload);
      existingItem.quantity--;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    },
    delete: (state, action) => 
      state.filter(el => el.id !== action.payload)
    ,
    singleCheck: (state, action) => 
      state.map((el) => el.id === action.payload ? { ...el, isChecked: !el.isChecked } : el )
    ,
    allCheck: (state, action) => 
      state.map((el) => action.payload === true ? { ...el, isChecked: true } : { ...el, isChecked: false }),
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;