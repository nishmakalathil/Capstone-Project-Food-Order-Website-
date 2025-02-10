import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstances';
// Fetch the cart data
const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    console
  const response = await axiosInstance.get('/cart/get-cart');
  return response.data.cart; // Return cart data
});
// Add item to cart
const addToCart = createAsyncThunk('cart/addToCart', async ({ menuItemId, quantity }) => {
  console.log('In cart slice');
  console.log(menuItemId+ ""+ quantity);
  if (!menuItemId || quantity <= 0) {
    throw new Error('Menu item ID and quantity are required');
  }
  const response = await axiosInstance.post('/cart/add-to-cart', { menuItemId, quantity });
  return response.data.cart; // Return updated cart
});
// Remove item from the cart
const removeMenuItemFromCart = createAsyncThunk('cart/removeFromCart', async (menuItemId) => {
  const response = await axiosInstance.delete('/cart/remove-from-cart', { data: { menuItemId } });
  return response.data.cart; // Return updated cart
});
// Update item quantity
const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ menuItemId, quantity }) => {
  const response = await axiosInstance.put('/cart/update-quantity', { menuItemId, quantity });
  return response.data.cart; // Return updated cart
});

// Frontend: Clear Cart function (Redux Slice)
const clearCart = createAsyncThunk('cart/clearCart', async () => {
    const response = await axiosInstance.post('/cart/clear-cart');  // Use DELETE request
    return response.data.cart;  // Return the updated cart after clearing it
  });
  

// Apply coupon
const applyCoupon = createAsyncThunk('cart/applyCoupon', async ({ couponCode, discount }) => {
  const response = await axiosInstance.post('/cart/apply-coupon', { couponCode, discount });
  return response.data.cart; // Return updated cart
});
// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart actions
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add item to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Remove item from cart
      .addCase(removeMenuItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Update item quantity
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Apply coupon
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
// Export actions
export { fetchCart, addToCart, removeMenuItemFromCart, updateQuantity, applyCoupon ,clearCart};
// Export the reducer to be used in the store
export default cartSlice.reducer;