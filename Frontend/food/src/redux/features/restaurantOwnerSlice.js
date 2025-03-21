import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRestaurantOwnerAuth: false, 
  restaurantOwner: null,  // Renamed for consistency with userSlice
};

const restaurantOwnerSlice = createSlice({
  name: 'restaurantOwner',
  initialState,
  reducers: {
    saveRestaurantOwner: (state, action) => {
      return {
        ...state,
        isRestaurantOwnerAuth: true,
        restaurantOwner: action.payload, 
      };
    },
    clearRestaurantOwner: () => {
      return {
        isRestaurantOwnerAuth: false,
        restaurantOwner: null, 
      };
    },
  },
});

export const { saveRestaurantOwner, clearRestaurantOwner } = restaurantOwnerSlice.actions;
export default restaurantOwnerSlice.reducer;
