import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import {
  fetchCart,
  addToCart,
  removeMenuItemFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/features/cartSlice"; 

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [carterror, setError] = useState("");
  const [finalTotal, setFinalTotal] = useState(0); 

  useEffect(() => {
    const total = cart?.menuItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    setFinalTotal(total - discount); // Subtract discount when cart updates
  }, [cart, discount]); // Recalculate total when cart or discount changes


  const makePayment = async () => {
    try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

        const session = await axiosInstance({
            url: "/payment/create-checkout-session",
            method: "POST",
            data: { products: cartDetails?.courses },
        });

        console.log(session, "=======session");
        const result = stripe.redirectToCheckout({
            sessionId: session.data.sessionId,
        });
    } catch (error) {
        console.log(error);
    }
};




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

  

  const handleApplyCoupon = async () => {
    try {
      setError(""); // Reset error message
      const response = await fetch("http://localhost:3006/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          orderAmount: finalTotal,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to apply coupon");
      }

      setDiscount(data.discount);
      setFinalTotal(data.finalAmount);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    if (cart && cart.menuItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cart));
      navigate("/user/deliveryinfo");
    } else {
      alert('Your cart is empty, add items before proceeding to checkout.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart && cart.menuItems.length === 0 && <p>Your cart is empty!</p>}
      {cart && cart.menuItems.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {cart.menuItems.map((item) => (
            <div key={item.menuItemId._id} className="flex items-center mb-6 border-b pb-4">
              <img
                src={item.image || "/path/to/placeholder-image.jpg"} 
                alt={item.menuItemId.name}
                className="w-32 h-32 object-cover rounded-lg mr-4"
                onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")}
              />
              <div className="flex flex-col flex-grow">
                <p className="font-semibold text-lg">{item.menuItemId.name}</p>
                <p className="font-semibold text-md">
                  ${item.price} x {item.quantity}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="mt-3 bg-pink-500 text-white px-4 py-1 w-20 text-sm rounded-full hover:bg-pink-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="font-semibold text-xl mt-4">Total Price: ${cart.totalPrice}</h3>
          <h3 className="font-semibold text-xl">Total Quantity: {cart.totalQuantity}</h3>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Apply Coupon</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon} 
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
              >
                Apply Coupon
              </button>

              {discount > 0 && <p style={{ color: "green" }}>Discount Applied: -${discount}</p>}
              {carterror && <p style={{ color: "red" }}>{carterror}</p>}

              <h3 className="font-semibold text-xl">Total after discount: ${finalTotal}</h3>

            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleClearCart}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
            >
              Clear Cart
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
