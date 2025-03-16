import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";
import { toast } from "react-hot-toast";

const EditRestaurantPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    phone_number: "",
    delivery_hours: "",
    delivery_areas: "",
    average_delivery_time: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch restaurant details
  useEffect(() => {
    if (!restaurantId || restaurantId.length !== 24) {
      toast.error("Invalid restaurant ID.");
      setError("Invalid restaurant ID.");
      return;
    }

    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/restaurants/get-single/${restaurantId}`, {
          withCredentials: true,
        });

        if (response.data) {
          setRestaurant(response.data);
          setImagePreview(response.data.image || "");
        } else {
          toast.error("Restaurant data not found.");
          setError("Restaurant data not found.");
        }
      } catch (err) {
        console.error("Fetch Error:", err.response?.data || err.message);
        toast.error("Failed to fetch restaurant details.");
        setError("Failed to fetch restaurant details.");
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  // Handle input changes
  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Updating restaurant:", restaurant);

      const formData = new FormData();
      formData.append("name", restaurant.name);
      formData.append("address", restaurant.address);
      formData.append("phone_number", restaurant.phone_number);
      formData.append("delivery_hours", restaurant.delivery_hours);
      formData.append("delivery_areas", restaurant.delivery_areas);
      formData.append("average_delivery_time", restaurant.average_delivery_time);
      if (image) {
        formData.append("image", image);
      }

      await axiosInstance.put(`/restaurants/update/${restaurantId}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Restaurant updated successfully!");
      navigate("/restaurantOwner/get-restaurants");
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Restaurant</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={restaurant.name || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={restaurant.address || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={restaurant.phone_number || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="delivery_hours"
          placeholder="Delivery Hours"
          value={restaurant.delivery_hours || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="delivery_areas"
          placeholder="Delivery Areas"
          value={restaurant.delivery_areas || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="average_delivery_time"
          placeholder="Average Delivery Time"
          value={restaurant.average_delivery_time || ""}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3">
            <img src={imagePreview} alt="Restaurant" className="w-full h-40 object-cover rounded-lg" />
          </div>
        )}

        {/* File Upload Input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default EditRestaurantPage;
