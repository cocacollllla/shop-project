import { configureStore } from "@reduxjs/toolkit";

import cartSlice from './cart-slice';
import boardSlice from './board-slice';



const store = configureStore({
  reducer: {cart: cartSlice.reducer, board: boardSlice.reducer}
});

export default store;