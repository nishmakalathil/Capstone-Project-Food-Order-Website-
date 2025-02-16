import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstances';

const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axiosInstance.get('/cart/get-cart');
  return response.data.cart; // Return cart data
});

const addToCart = createAsyncThunk('cart/addToCart', async ({ menuItemId, quantity }) => {
  console.log('In cart slice');
  console.log(menuItemId+ ""+ quantity);
  if (!menuItemId || quantity <= 0) {
    throw new Error('Menu item ID and quantity are required');
  }
  const response = await axiosInstance.post('/cart/add-to-cart', { menuItemId, quantity });
  return response.data.cart; 
});

const removeMenuItemFromCart = createAsyncThunk('cart/removeFromCart', async (menuItemId) => {
  const response = await axiosInstance.delete('/cart/remove-from-cart', { data: { menuItemId } });
  return response.data.cart;
});

const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ menuItemId, quantity }) => {
  const response = await axiosInstance.put('/cart/update-quantity', { menuItemId, quantity });
  return response.data.cart; 
});


const clearCart = createAsyncThunk('cart/clearCart', async () => {
    const response = await axiosInstance.post('/cart/clear-cart');  
    return response.data.cart;  
  });
  


const applyCoupon = createAsyncThunk('cart/applyCoupon', async ({ couponCode, discount }) => {
  const response = await axiosInstance.post('/cart/apply-coupon', { couponCode, discount });
  return response.data.cart; // Return updated cart
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      
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
      
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      
      .addCase(removeMenuItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      
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
// 
export { fetchCart, addToCart, removeMenuItemFromCart, updateQuantity, applyCoupon ,clearCart};
//
export default cartSlice.reducer;