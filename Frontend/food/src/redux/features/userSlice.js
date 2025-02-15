import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuth: false,  // Default value is false
  user: null,          // Store user information after successful login
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserAuth = true;
      state.user = action.payload;  // Store user data in the state
    },
    clearUser: (state) => {
      state.isUserAuth = false;
      state.user = null;  // Clear user data from the state
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
