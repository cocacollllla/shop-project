import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: [],
  reducers: {
    replaceData: (state, action) => 
      // state.push(...action.payload)
      state = [...action.payload]
    ,
    delete: (state, action) => 
      state.filter(el => el.id !== action.payload)
    ,
  }
});

export const boardActions = boardSlice.actions;
export default boardSlice;