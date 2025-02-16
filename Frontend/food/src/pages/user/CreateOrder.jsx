import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createOrder,
  } from '../../redux/features/createOrderSlice';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from redux store
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    // Get selected address from localStorage
    const savedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
    setSelectedAddress(savedAddress);

    // Set cart items (if any) from Redux store
    if (cart && cart.menuItems) {
      setCartItems(cart.menuItems);
    }

    // Set deliveryCharges to a fixed value of 50
    const deliveryCharges = 50;

    // Calculate total amount (cart totalPrice + fixed deliveryCharges of 50)
    if (cart) {
      setTotalAmount(cart.totalPrice + deliveryCharges);
    }
  }, [cart]);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    // Here you can dispatch an action to create the order
    // For example:
    dispatch(createOrder({ cartItems, deliveryInfo: selectedAddress, totalAmount }));

    //alert('Order placed successfully!');
    navigate('/order-payment');  // Redirect to order success page after placing the order
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Delivery Address</h3>
        {selectedAddress ? (
          <div>
            <p><strong>Address:</strong> {selectedAddress.deliveryAddress}</p>
            <p><strong>Contact Number:</strong> {selectedAddress.contactNumber}</p>
            <p><strong>Delivery Time:</strong> {selectedAddress.deliveryTime}</p>
            <p><strong>Instructions:</strong> {selectedAddress.deliveryInstructions}</p>
          </div>
        ) : (
          <p>No address selected</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.menuItemId._id} className="mb-4 flex items-center">
                  {/* Display image if available */}
                  <img
                    src={item.image || "/path/to/placeholder-image.jpg"}
                    alt={item.menuItemId.name}
                    className="w-20 h-20 object-cover mr-4"
                    onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")}
                  />
                  <div>
                    <p><strong>{item.menuItemId.name}</strong></p> {/* Display Menu Item Name */}
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${item.price * item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p><strong>Total Price: ${cart.totalPrice}</strong></p>
              <p><strong>Delivery Charges: $50</strong></p>
              <p><strong>Total Amount: ${totalAmount}</strong></p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          className="px-6 py-2 bg-pink-500 text-white rounded-full"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;