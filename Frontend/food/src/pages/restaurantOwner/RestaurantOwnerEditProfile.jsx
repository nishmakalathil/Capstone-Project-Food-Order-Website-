import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerEditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    restaurantName: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(""); // Error state for any API error
  const [successMessage, setSuccessMessage] = useState(""); // Success message after profile update
  const navigate = useNavigate();

  // Fetch the current profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile"); // Get profile data
        setProfile(response.data.data); // Set profile data into state
      } catch (err) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axiosInstance.put("/restaurantOwner/update", profile); // Update profile
      setSuccessMessage(response.data.message); // Show success message
      setLoading(false); // Stop loading
      setTimeout(() => {
        navigate("/restaurant-owner/profile"); // Redirect to profile page after successful update
      }, 1500); // Delay for 1.5 seconds before redirecting
    } catch (err) {
      setLoading(false); // Stop loading
      setError("Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading state if form is submitting

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center">Edit Restaurant Owner Profile</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">{successMessage}</div>
        )}

        {/* Error Message */}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-1"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-1"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-1"
              required
            />
          </div>

          {/* Restaurant Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              value={profile.restaurantName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-1"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-1"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantOwnerEditProfile;
