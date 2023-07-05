import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  isLoggedIn: false,
};

export const templateSlice = createSlice({
    name: "users",
    initialState,
  
    reducers: {
      setLogin: (state, action) => {
        state.isLoggedIn = true;
        // state.users = action.payload;
      },
     },
  });
  export const {
    setLogin,
  } = templateSlice.actions;
  
  //selectors
  export const selectUser = (state) => state.users;
  
  export default templateSlice.reducer;