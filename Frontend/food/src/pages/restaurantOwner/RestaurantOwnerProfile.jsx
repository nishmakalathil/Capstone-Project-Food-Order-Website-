import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const navigate = useNavigate();

  // Fetch profile and ownerId
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile");
        setProfile(response.data.data);
        setOwnerId(response.data.data._id);
        setLoading(false);
      } catch (err) {
        setError("Error fetching profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch restaurants for the owner
  useEffect(() => {
    if (ownerId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axiosInstance.get(`/restaurants/owner/${ownerId}`);
          if (response.data.msg === "No restaurants found for this owner") {
            setRestaurants([]);
          } else {
            setRestaurants(response.data);
          }
        } catch (error) {
          setError("Error fetching restaurants");
        }
      };
      fetchRestaurants();
    }
  }, [ownerId]);

  const handleEditProfile = () => navigate("/restaurantOwner/update");

  const handleCreateRestaurant = () => navigate("/restaurants/create");

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/restaurantOwner/logout");
      if (response.data.success) navigate("/restaurantOwner/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Restaurant Owner Profile
        </h2>

        {/* Profile Information */}
        <div className="flex items-center space-x-8 mb-8">
          <img
            src={profile.profilePic || "/path/to/default-image.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            onError={(e) => (e.target.src = "/path/to/default-image.jpg")}
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {profile.name}
            </h3>
            <p className="text-gray-600">📧 {profile.email}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-700">
              <strong>Address:</strong> {profile.address}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-700">
              <strong>Phone:</strong> {profile.phoneNumber}
            </p>
          </div>

          {/* Restaurants Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Restaurants Owned by {profile.name}
            </h3>
            <ul className="space-y-2">
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <li
                    key={restaurant._id}
                    className="text-lg text-gray-700 bg-gray-100 p-3 rounded-lg"
                  >
                    🍽️ {restaurant.name}
                  </li>
                ))
              ) : (
                <li className="text-lg text-gray-500">No restaurants found.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 text-white text-lg py-3 px-8 rounded transition duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={handleCreateRestaurant}
            className="bg-green-500 text-white text-lg py-3 px-8 rounded transition duration-300"
          >
            Create Restaurant
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-lg py-3 px-8 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantOwnerProfile;
