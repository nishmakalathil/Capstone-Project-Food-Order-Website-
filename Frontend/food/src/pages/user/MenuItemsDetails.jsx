import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";
import MenuItemsSkeleton from "../../components/shared/Skeltons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";


function MenuItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuItem, isLoading, error] = UseFetch(`/menu-items/details/${id}`);
  const [quantity, setQuantity] = useState(1);
  
  
  useEffect(() => {
    console.log("MenuItemDetails:", menuItem || "No Data");
    console.log("isLoading:", isLoading);
  }, [menuItem, isLoading]);
  
  if (isLoading) {
    return <MenuItemsSkeleton />;
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message || "Failed to load menu item."}</div>;
  }
  if (!menuItem) {
    return <div className="text-red-500">No menu item found.</div>;
  }
  
  
  const handleAddToCart = () => {
    if (!menuItem || typeof menuItem !== "object") {
      console.error("Error: menuItem is undefined or invalid.");
      return;
    }
    if (!menuItem._id || !menuItem.name || !menuItem.price) {
      console.error("Error: menuItem is missing required properties.");
      return;
    }
    console.log('Add to cart clicked');
    dispatch(
      addToCart({
        _id: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image || "",
        quantity: quantity,
        menuItemId: menuItem._id,
      })
    );
    navigate("/user/cart");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{menuItem.name}</h1>
        <img
          src={menuItem.image || "/path/to/placeholder-image.jpg"} // Use default image if no image
          alt={menuItem.name}
          className="w-full h-60 object-cover mb-4 rounded-lg"
        />
        {menuItem.restaurant_id && (
          <div className="flex items-center mb-4">
            <h6 className="text-lg font-bold mr-2">Restaurant Name:</h6>
            <h2 className="text-xl font-bold">{menuItem.restaurant_id.name}</h2>
          </div>
        )}
        <h6 className="text-xl font-bold mb-2">Price</h6>
        <p className="text-xl mb-4">₹{menuItem.price}</p>
        <h6 className="text-lg font-bold mb-2">Description</h6>
        <p className="mb-4 text-sm sm:text-base">{menuItem.description}</p>
        <h6 className="text-lg font-bold mb-2">Ingredients</h6>
        <p className="mt-4 text-lg">
          {menuItem.ingredients ? menuItem.ingredients.join(", ") : "N/A"}
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 transition duration-200"
          >
            <button>
              {isLoading ? "Loading..." : "Add to Cart"}
            </button>

          </button>
        </div>
      </div>
    </div>
  );
}
export default MenuItemDetails;