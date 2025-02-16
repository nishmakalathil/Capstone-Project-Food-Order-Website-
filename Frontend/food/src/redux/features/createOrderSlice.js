import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstances';

// Create Async Thunk to handle order creation
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('order/create-order', orderData);
      return response.data; // Success, return the data to the reducer
    } catch (error) {
      return rejectWithValue(error.response.data); // Error, pass the error data to the reducer
    }
  }
);

// Create the slice for createOrder
const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // Save the created order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      });
  },
});

export default createOrderSlice.reducer;
