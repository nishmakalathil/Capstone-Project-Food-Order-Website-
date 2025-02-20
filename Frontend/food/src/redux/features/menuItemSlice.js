import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstances';


// Update delivery info
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
    addresses: [], // Stores array of address objects
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetching all delivery info
      .addCase(getAllDeliveryInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeliveryInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload; // Populating the addresses array with fetched data
      })
      .addCase(getAllDeliveryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Saving a new delivery address
      .addCase(saveDeliveryInfo.fulfilled, (state, action) => {
        state.addresses.push(action.payload);  // Add new address to the addresses array
      })

      // Updating an existing address
      .addCase(updateDeliveryInfo.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (address) => address._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload; // Update the existing address
        }
      })

      // Deleting an address
      .addCase(deleteDeliveryInfo.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload // Remove the address by ID
        );
      });
  },
});

export default menuItemSlice.reducer;
