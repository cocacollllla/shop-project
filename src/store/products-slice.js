import { createSlice, configureStore } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const existingItem = state.find(item => item.color === action.payload.color);
      if(existingItem) {
        existingItem.quantity++;
      } else {
        state.push({...action.payload, quantity: 1});
      } 
    },
    plus: (state, action) => {
      const existingItem = state.find(item => item.color === action.payload);

        existingItem.quantity++;
   
    },
    minus: (state, action) => {
      const existingItem = state.find(item => item.color === action.payload);
      if(existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    remove: (state, action) => 
      state.filter(item => item.color !== action.payload)
      
  }
});

export const productsActions = productsSlice.actions;
export default productsSlice;