import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDeliveryInfo,
  saveDeliveryInfo,
  updateDeliveryInfo,
  deleteDeliveryInfo,
} from '../../redux/features/deliveryInfoSlice';
import { useNavigate } from 'react-router-dom';

const DeliveryInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, loading, error } = useSelector((state) => state.deliveryInfo);
  //const { cartItems } = useSelector((state) => state.cart); // Assuming cartItems are stored in Redux
  const [newAddress, setNewAddress] = useState({
    deliveryAddress: '',
    contactNumber: '',
    deliveryInstructions: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  
  useEffect(() => {
    dispatch(getAllDeliveryInfo());
  }, [dispatch]);

  
  const handleSaveAddress = async () => {
    if (!newAddress.deliveryAddress || !newAddress.contactNumber) {
      alert('Please fill in all fields');
      return;
    }

    console.log("handlesave address");
  
    try {
      console.log("before result action");
      
      const resultAction = await dispatch(saveDeliveryInfo(newAddress));
      
      console.log("resultAction");
      console.log(resultAction);
  
      if (saveDeliveryInfo.fulfilled.match(resultAction)) {
        await dispatch(getAllDeliveryInfo()); // 🔥 Refetch addresses immediately
        alert('Delivery address added successfully');
        resetForm();
      } else {
        alert('Failed to add delivery address');
      }
    } catch (err) {
      console.error('Error while saving delivery info:', err);
      alert('An error occurred while adding the delivery address');
    }
  };
  

  
  const handleUpdateAddress = async () => {
    if (!newAddress.deliveryAddress || !newAddress.contactNumber) {
      alert('Please fill in all required fields');
      return;
    }
  
    const updatedAddress = {
      ...newAddress,
      _id: editingAddressId,
    };
  
    try {
      const resultAction = await dispatch(updateDeliveryInfo(updatedAddress));
  
      if (updateDeliveryInfo.fulfilled.match(resultAction)) {
        await dispatch(getAllDeliveryInfo()); // 🔥 Refetch the updated addresses list
        alert('Delivery address updated successfully');
        setIsEditing(false);
        resetForm();
      } else {
        alert('Failed to update delivery address');
      }
    } catch (err) {
      alert('An error occurred while updating the delivery address');
    }
  };
  

  
  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteDeliveryInfo(addressId));
      alert('Delivery address deleted successfully');
    } catch (err) {
      alert('Failed to delete delivery address');
    }
  };

  
  const handleEditClick = (address) => {
    setNewAddress({
      deliveryAddress: address.deliveryAddress,
      contactNumber: address.contactNumber,
      deliveryInstructions: address.deliveryInstructions,
    });
    setEditingAddressId(address._id);
    setIsEditing(true);
  };

  
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };


  const handleProceedToCreateOrder = () => {
    if (selectedAddress) {
      
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
      

      
      navigate('/user/create-order');
    } else {
      alert('Please select a delivery address');
    }
  };

  
  const resetForm = () => {
    setNewAddress({
      deliveryAddress: '',
      contactNumber: '',
      deliveryInstructions: '',
    });
    setEditingAddressId(null);
    setSelectedAddress(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Delivery Information</h2>
      <div className="mb-6">
        <h3 className="text-xl mb-4">{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
        {/* Form Fields for New Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="deliveryAddress">
            Delivery Address
          </label>
          <input
            id="deliveryAddress"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={newAddress.deliveryAddress}
            onChange={(e) => setNewAddress({ ...newAddress, deliveryAddress: e.target.value })}
            placeholder="Enter delivery address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={newAddress.contactNumber}
            onChange={(e) => setNewAddress({ ...newAddress, contactNumber: e.target.value })}
            placeholder="Enter contact number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="deliveryInstructions">
            Delivery Instructions
          </label>
          <textarea
            id="deliveryInstructions"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={newAddress.deliveryInstructions}
            onChange={(e) => setNewAddress({ ...newAddress, deliveryInstructions: e.target.value })}
            placeholder="Enter any delivery instructions"
          />
        </div>
        <div className="mt-4">
          {isEditing ? (
            <button
              className="px-6 py-2 bg-pink-500 text-white rounded-full"
              onClick={handleUpdateAddress}
            >
              Update Address
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-pink-500 text-white rounded-full"
              onClick={handleSaveAddress}
            >
              Add Address
            </button>
          )}
        </div>
      </div>

      
      <h3 className="text-xl mb-4">Your Saved Addresses</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {!addresses || addresses.length === 0 ? (
            <p>No delivery addresses available.</p>
          ) : (
            <ul className="space-y-4">
              {addresses.map((address) => (
                <li key={address._id} className="border p-4 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{address.deliveryAddress}</h4>
                    <p>{address.contactNumber}</p>
                    <p>{address.deliveryInstructions}</p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleEditClick(address)}
                      className="px-4 py-1 bg-pink-500 text-white rounded-full text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="px-4 py-1 bg-pink-500 text-white rounded-full text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAddressSelect(address)}
                      className={`px-4 py-1 bg-pink-500 text-white rounded-full text-sm ${selectedAddress && selectedAddress._id === address._id ? 'font-bold' : ''}`}
                    >
                      {selectedAddress && selectedAddress._id === address._id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6">
        <button
          className="px-6 py-2 bg-pink-500 text-white rounded-full"
          onClick={handleProceedToCreateOrder}
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

export default DeliveryInformation;