import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    registererror: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    registerSuccess: (state, action)=>{
      state.currentUser = action.payload;
    },
    registerError: (state)=>{
      state.registererror = true
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, registerSuccess, registerError  } = userSlice.actions;
export default userSlice.reducer;