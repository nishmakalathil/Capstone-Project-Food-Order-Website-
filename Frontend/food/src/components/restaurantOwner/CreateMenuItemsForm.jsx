import React, { useState, useEffect } from "react";
import axiosInstance from '../../config/axiosInstances';  // Importing the Axios instance

function CreateMenuItemsForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    ingredients: '',
    restaurant_id: '', // Ensure this is dynamically set or passed as a prop
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ownerId, setOwnerId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile");
        setOwnerId(response.data.data._id); 
      } catch (err) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (ownerId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axiosInstance.get(`/restaurants/owner/${ownerId}`);
          if (Array.isArray(response.data)) {
            setRestaurants(response.data);
          } else {
            setError("Invalid data received for restaurants");
          }
        } catch (error) {
          setError("Error fetching restaurants");
        }
      };
      fetchRestaurants();
    }
  }, [ownerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('isAvailable', formData.isAvailable);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('restaurant_id', formData.restaurant_id);
    formDataToSend.append('image', image); // Append the selected image file
  
    try {
      const response = await axiosInstance.post('/menu-items/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-3xl text-center text-gray-800 mb-6">Create Menu Item</h2>
      
      {success && <div className="text-green-600 mb-4">{success}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700">Restaurant</label>
          <select
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a restaurant</option>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))
            ) : (
              <option>No restaurants found.</option>
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Is Available</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
            className="h-5 w-5"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300 focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Menu Item'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMenuItemsForm;
