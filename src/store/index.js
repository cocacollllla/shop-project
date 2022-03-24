import { configureStore } from "@reduxjs/toolkit";

import cartSlice from './cart-slice';
import boardSlice from './board-slice';
import usersSlice from './users-slice';
import productsSlice from './products-slice';



const store = configureStore({
  reducer: {cart: cartSlice.reducer, board: boardSlice.reducer, users: usersSlice.reducer, products: productsSlice.reducer}
});

export default store;