import React, { useState, useEffect } from "react";
import axiosInstance from '../../config/axiosInstances';  // Importing the Axios instance

function CreateMenuItemsForm() {
  // State for form fields and the image file
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
  const [isSubmitting, setIsSubmitting] = useState(false); // to handle submit button state
  const [error, setError] = useState(''); // for displaying any error message
  const [success, setSuccess] = useState(''); // for displaying success message
  const [ownerId, setOwnerId] = useState(null); // State to store ownerId
  const [restaurants, setRestaurants] = useState([]);
  
  // Fetch profile data and set ownerId
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile");
        setOwnerId(response.data.data._id); // Set ownerId from profile data
      } catch (err) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []); // This runs once when the component mounts

  // Fetch restaurants when ownerId is available
  useEffect(() => {
    if (ownerId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axiosInstance.get(`/restaurants/owner/${ownerId}`);
          console.log("Fetched Restaurants:", response.data); // Log the response to check the structure
          if (Array.isArray(response.data)) {
            setRestaurants(response.data); // Set the fetched restaurants
          } else {
            console.error("Unexpected data structure:", response.data);
            setError("Invalid data received for restaurants");
          }
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          setError("Error fetching restaurants");
        }
      };
      fetchRestaurants();
    }
  }, [ownerId]); // This effect runs when ownerId is set

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input (image) change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading state
    // Create a new FormData object to send the form data and the image
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('isAvailable', formData.isAvailable);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('restaurant_id', formData.restaurant_id);
    formDataToSend.append('image', image);

    try {
      // Make the POST request to the backend
      const response = await axiosInstance.post('/menu-items/create', formDataToSend);
      // On success, clear the form and show success message
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        isAvailable: true,
        ingredients: '',
        restaurant_id: '', // Reset restaurant_id
      });
      setImage(null);
      setError('');
      setSuccess('Menu item created successfully!');
      console.log('Menu item created:', response.data);
    } catch (error) {
      // On error, show the error message
      setSuccess('');
      setError('Error creating menu item: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

  return (
    <div className="form-container">
      <h2 className="font-bold text-2xl mb-4">Create Menu Item</h2>
      {/* Display Success or Error Messages */}
      {success && <div className="text-green-500">{success}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-bold">Restaurant</label>
          <select
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleInputChange}
            required
            className="input-field"
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
          <label className="font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="font-bold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="textarea-field"
          />
        </div>

        <div>
          <label className="font-bold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="font-bold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="font-bold">Is Available</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
            className="checkbox-field"
          />
        </div>

        <div>
          <label className="font-bold">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            required
            className="textarea-field"
          />
        </div>

        <div>
          <label className="font-bold">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="file-input"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Menu Item'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMenuItemsForm;
