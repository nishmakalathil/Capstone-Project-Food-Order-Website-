import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerRestaurants() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ownerId, setOwnerId] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

  
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
  
  useEffect(() => {
    if (ownerId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axiosInstance.get(`/restaurants/owner/${ownerId}`);
          setRestaurants(response.data.msg === "No restaurants found for this owner" ? [] : response.data);
        } catch (error) {
          setError("Error fetching restaurants");
        }
      };
      fetchRestaurants();
    }
  }, [ownerId]);

  const handleCreateRestaurant = () => navigate("/restaurantOwner/create-restaurant");
  const handleManageMenuItems = (restaurantId) => {
    navigate(`/restaurantOwner/menu-items/${restaurantId}`);
  };

  const handleEditRestaurant = (restaurantId) => {
    navigate(`/restaurantOwner/edit-restaurant/${restaurantId}`);
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Restaurants of {profile.name}
        </h2>

        <div className="space-y-4">
         
          <ul className="space-y-2">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <li key={restaurant._id} className="text-lg text-gray-700 bg-gray-100 p-3 rounded-lg">
                  🍽️ {restaurant.name}
                  <div className="mt-4 flex justify-end space-x-2">
                  <button 
                      onClick={() => handleEditRestaurant(restaurant._id)} 
                      className="bg-blue-500 text-white text-sm py-2 px-4 rounded-full hover:bg-pink-600 transition">
                      Edit Restaurant
                    </button>

                    <button 
                      onClick={() => handleManageMenuItems(restaurant._id)} 
                      className="bg-pink-500 text-white text-sm py-2 px-4 rounded-full hover:bg-pink-600 transition">
                      Edit Menu Items
                    </button>


                  </div>
                </li>
              ))
            ) : (
              <li className="text-lg text-gray-500">No restaurants found.</li>
            )}
          </ul>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <button 
            onClick={handleCreateRestaurant} 
            className="bg-pink-500 text-white text-lg py-3 px-8 rounded-full hover:bg-pink-600 transition">
            Create Restaurant
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantOwnerRestaurants;
