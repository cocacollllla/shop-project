import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    replaceData: (state, action) => 
      // state.push({...action.payload})
      state = [action.payload]
    ,
    delete: (state, action) => 
      state.filter(el => el.id !== action.payload)
    ,
  }
});

export const usersActions = usersSlice.actions;

export default usersSlice;