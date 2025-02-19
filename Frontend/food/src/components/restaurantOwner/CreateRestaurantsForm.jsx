import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";

const CreateRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
    delivery_hours: "",
    delivery_areas: "",
    average_delivery_time: "",
  });
  const [image, setImage] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the owner's profile
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.address || !formData.phone_number || !formData.delivery_hours || !formData.delivery_areas || !formData.average_delivery_time || !ownerId) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (!image) {
      setError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("delivery_hours", formData.delivery_hours);
    formDataToSend.append("delivery_areas", formData.delivery_areas);
    formDataToSend.append("average_delivery_time", formData.average_delivery_time);
    formDataToSend.append("owner_id", ownerId); // Attach owner_id from profile
    formDataToSend.append("image", image);

    try {
      const response = await axiosInstance.post("/restaurants/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Restaurant created successfully!");
      setFormData({
        name: "",
        address: "",
        phone_number: "",
        delivery_hours: "",
        delivery_areas: "",
        average_delivery_time: "",
      });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating restaurant");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Restaurant</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="delivery_hours" placeholder="Delivery Hours" value={formData.delivery_hours} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="delivery_areas" placeholder="Delivery Areas" value={formData.delivery_areas} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="average_delivery_time" placeholder="Average Delivery Time" value={formData.average_delivery_time} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurantForm;
