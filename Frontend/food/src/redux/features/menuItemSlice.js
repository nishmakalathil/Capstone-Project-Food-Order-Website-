import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstances';




export const updateDeliveryInfo = createAsyncThunk(
  'deliveryInfo/updateDeliveryInfo',
  async (deliveryData) => {
    const response = await axiosInstance.put('/deliveryInfo/update', deliveryData);
    
    return response.data.data;
  }
);


const menuItemSlice = createSlice({
  name: 'menuItem',
  initialState: {
    addresses: [], 
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllDeliveryInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeliveryInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload; 
      })
      .addCase(getAllDeliveryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(saveDeliveryInfo.fulfilled, (state, action) => {
        state.addresses.push(action.payload);  
      })

      
      .addCase(updateDeliveryInfo.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (address) => address._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload; 
        }
      })

      
      .addCase(deleteDeliveryInfo.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload 
        );
      });
  },
});

export default menuItemSlice.reducer;
