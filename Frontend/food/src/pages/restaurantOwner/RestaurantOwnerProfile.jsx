import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [ownerId, setOwnerId] = useState(null); // State to store ownerId
  const navigate = useNavigate();

  // Fetch profile data and set ownerId
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile");
        setProfile(response.data.data);
        setOwnerId(response.data.data._id); // Set ownerId from profile data
        setLoading(false);
      } catch (err) {
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // This runs once when the component mounts

  // Fetch restaurants when ownerId is available
  useEffect(() => {
    if (ownerId) {
      const fetchRestaurants = async () => {
        try {
            console.log(ownerId);
          const response = await axiosInstance.get(`/restaurants/owner/${ownerId}`);
          console.log("Fetched Restaurants:", response); // Log the response to check the structure
          if(response.data.msg == "No restaurants found for this owner")
          {
            setRestaurants('');  
          } 
          else
          {
            setRestaurants(response.data); // Set the fetched restaurants
          }

        } catch (error) {
          console.error("Error fetching restaurants:", error);
          setError("Error fetching restaurants");
        }
      };

      fetchRestaurants();
    }
  }, [ownerId]); // This effect runs when ownerId is set

  const handleEditProfile = () => {
    navigate("/restaurantOwner/update");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/restaurantOwner/logout");
      if (response.data.success) {
        // Clear local state (if necessary) and navigate to login page
        navigate("/restaurantOwner/login");  // Redirect to login after logout
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Restaurant Owner Profile</h2>
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">RestaurantOwner: {profile.name}</h3>
          <p className="text-gray-600 font-bold">Email: {profile.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <strong className="text-gray-700">Address:</strong>
          <p className="text-gray-600">{profile.address}</p>
        </div>
        <div>
          <strong className="text-gray-700">Phone:</strong>
          <p className="text-gray-600">{profile.phoneNumber}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Restaurants Owned by {profile.name}</h2>
          <ul>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <li key={restaurant._id}>
                  {restaurant.name}
                  {/* Optionally display other restaurant details here */}
                </li>
              ))
            ) : (
              <li>No restaurants found.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleEditProfile}
          className="bg-pink-500 text-white rounded-full py-2 px-6 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Edit Profile
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleLogout}
          className="bg-pink-500 text-white rounded-full py-2 px-6 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default RestaurantOwnerProfile;
