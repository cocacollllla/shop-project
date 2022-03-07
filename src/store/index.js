import { configureStore } from "@reduxjs/toolkit";

import cartSlice from './cart-slice';
import boardSlice from './board-slice';
import usersSlice from './users-slice';



const store = configureStore({
  reducer: {cart: cartSlice.reducer, board: boardSlice.reducer, users: usersSlice.reducer}
});

export default store;