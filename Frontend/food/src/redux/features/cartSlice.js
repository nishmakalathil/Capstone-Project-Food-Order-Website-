import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const { menuItemId, quantity, price, name, image } = action.payload;
        const existingItem = state.items.find(item => item.menuItemId === menuItemId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ menuItemId, quantity, price, name, image });
        }
        state.totalQuantity += quantity;
        state.totalPrice += price * quantity;
      },
      //
    removeFromCart: (state, action) => {
      const { menuItemId } = action.payload;
      const itemToRemove = state.items.find(item => item.menuItemId === menuItemId);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.quantity * itemToRemove.price;
        state.items = state.items.filter(item => item.menuItemId !== menuItemId);
      }
    },
    updateQuantity: (state, action) => {
      const { menuItemId, quantity, price } = action.payload;
      const existingItem = state.items.find(item => item.menuItemId === menuItemId);
      if (existingItem) {
        const quantityChange = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityChange;
        state.totalPrice += price * quantityChange;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;