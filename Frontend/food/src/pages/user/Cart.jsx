import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../../redux/features/cartSlice';
function Cart() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, loading, error } = useSelector((state) => state.cart);
  useEffect(() => {
    // Optionally fetch cart data from the backend if needed
    // dispatch(fetchCart());
  }, [dispatch]);
  // Handle Add Item to Cart
  function handleAddToCart(menuItemId, price) {
    const quantity = 1; // Set a default quantity (can be adjusted based on user input)
    dispatch(addToCart({ menuItemId, quantity, price }));
  }
  // Handle Remove Item from Cart
  function handleRemoveFromCart(menuItemId) {
    dispatch(removeFromCart({ menuItemId }));
  }
  // Handle Update Item Quantity
  function handleUpdateQuantity(menuItemId, quantity, price) {
    dispatch(updateQuantity({ menuItemId, quantity, price }));
  }
  // Handle Clear Cart
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>
      {totalQuantity === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <section className="antialiased">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.menuItemId}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 flex items-center justify-between"
                      >
                        {/* Image, Item Name, and Price */}
                        <div className="flex items-center">
                          <img
                            className="h-20 w-20 object-cover rounded-md"
                            src={item.image}
                            alt={item.name}
                          />
                          <div className="ml-4 flex flex-col">
                            <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
                            {/* Total Quantity and Total Price below item price */}
                            <div className="mt-2 flex space-x-4">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Total Quantity: {item.quantity}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">Total Price: ${item.quantity * item.price}</span>
                            </div>
                          </div>
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity - 1, item.price)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            readOnly
                          />
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity + 1, item.price)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromCart(item.menuItemId)}
                          className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Clear Cart Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClearCart}
              className="bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;