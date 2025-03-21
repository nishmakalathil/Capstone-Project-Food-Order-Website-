import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ownerId, setOwnerId] = useState(null);
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

  const handleEditProfile = () => navigate("/restaurantOwner/update");
  
 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Restaurant Owner Profile
        </h2>

        <div className="flex items-center space-x-8 mb-8">
          <img
            src={profile.profilePic || "/path/to/default-image.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
            onError={(e) => (e.target.src = "/path/to/default-image.jpg")}
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{profile.name}</h3>
            <p className="text-gray-600">📧 {profile.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700"><strong>Address:</strong> {profile.address}</p>
          <p className="text-lg text-gray-700"><strong>Phone:</strong> {profile.phoneNumber}</p>


        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <button 
            onClick={handleEditProfile} 
            className="bg-pink-500 text-white text-lg py-3 px-8 rounded-full hover:bg-pink-600 transition">
            Edit Profile
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default RestaurantOwnerProfile;
