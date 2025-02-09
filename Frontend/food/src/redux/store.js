// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'; // import your cart slice
import userReducer from './features/userSlice'; // import your user slice

// Create the Redux store and export it
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
 export default store;