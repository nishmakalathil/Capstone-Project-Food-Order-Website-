
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
    clearRestaurantOwner: () => initialState, // ✅ Resets state completely
  }
});

export const { saveRestaurantOwner, clearRestaurantOwner } = restaurantOwnerSlice.actions;
export default restaurantOwnerSlice.reducer;
