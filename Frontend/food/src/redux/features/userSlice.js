import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuth: false,  
  user: null,          
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserAuth = true;
      state.user = action.payload;  
    },
    clearUser: (state) => {
      state.isUserAuth = false;
      state.user = null;  
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
