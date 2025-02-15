// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'; 
import userReducer from './features/userSlice'; 
import deliveryInfoReducer from  './features/deliveryInfoSlice';
import createOrderReducer from  './features/createOrderSlice';
import restaurantOwnerReducer from './features/restaurantOwnerSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    deliveryInfo: deliveryInfoReducer,
    createOrder: createOrderReducer,
    restaurantOwner: restaurantOwnerReducer,
  },
});
 export default store;