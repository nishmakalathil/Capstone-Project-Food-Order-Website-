import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeMenuItemFromCart,
  updateQuantity,
  applyCoupon,
  clearCart,
} from "../../redux/features/cartSlice"; 
const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const handleRemoveFromCart = (menuItemId) => {
    dispatch(removeMenuItemFromCart(menuItemId));
  };
  const handleUpdateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) return;
    dispatch(updateQuantity({ menuItemId, quantity }));
  };
  const handleApplyCoupon = () => {
    if (couponCode && discount) {
      dispatch(applyCoupon({ couponCode, discount }));
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {cart && cart.menuItems.length === 0 && <p>Your cart is empty!</p>}
      {cart && cart.menuItems.length > 0 && (
        <div>
          {cart.menuItems.map((item) => (
            <div key={item.menuItemId._id} className="flex items-center mb-4">
              
              <img
                src={item.image || "/path/to/placeholder-image.jpg"} 
                alt={item.menuItemId.name}
                className="w-20 h-20 object-cover mr-4"
                onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")} 
              />
              <div className="flex flex-col justify-between">
                <p className="font-semibold text-lg">{item.menuItemId.name}</p>
                <p className="font-semibold text-md">
                  ${item.price} x {item.quantity}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-6 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition duration-300"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                    className="px-6 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition duration-300"
                  >
                    +
                  </button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="font-semibold text-xl mt-4">Total Price: ${cart.totalPrice}</h3>
          <h3 className="font-semibold text-xl">Total Quantity: {cart.totalQuantity}</h3>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Apply Coupon</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border p-2 rounded-md w-1/3"
              />
              <input
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="border p-2 rounded-md w-1/3"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode || !discount}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
              >
                Apply Coupon
              </button>
            </div>
          </div>
        
          <div className="mt-6">
            <button
              onClick={handleClearCart}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;