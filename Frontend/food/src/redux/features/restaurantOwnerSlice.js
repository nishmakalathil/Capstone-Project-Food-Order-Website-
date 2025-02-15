
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRestaurantOwnerAuth: false, // Authentication state
  restaurantOwnerData: null,    // To store restaurant owner info
};

const restaurantOwnerSlice = createSlice({
  name: 'restaurantOwner',
  initialState,
  reducers: {
    saveRestaurantOwner: (state, action) => {
      state.isRestaurantOwnerAuth = true;
      state.restaurantOwnerData = action.payload; // Save restaurant owner data in Redux state
    },
    clearRestaurantOwner: (state) => {
      state.isRestaurantOwnerAuth = false; // Set to false when clearing state
      state.restaurantOwnerData = null;    // Clear restaurant owner data
    }
  }
});

export const { saveRestaurantOwner, clearRestaurantOwner } = restaurantOwnerSlice.actions;
export default restaurantOwnerSlice.reducer;
