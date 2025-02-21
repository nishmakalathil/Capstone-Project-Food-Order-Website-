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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/restaurantOwner/profile");
        setProfile(response.data.data);
      } catch (err) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put("/restaurantOwner/update", profile);
      setSuccessMessage(response.data.message);
      setLoading(false);
      setTimeout(() => {
        navigate("/restaurantOwner/profile");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError("Error updating profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Edit Profile</h2>

        {successMessage && <div className="mt-4 text-green-500 text-center">{successMessage}</div>}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {[ 
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Restaurant Name", name: "restaurantName", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={profile[name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300 outline-none"
                required
              />
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
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
