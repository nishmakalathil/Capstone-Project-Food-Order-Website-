import React, { useState } from 'react';
import axiosInstance from '../../config/axiosInstances'; // Import your configured Axios instance
import { useNavigate } from 'react-router-dom';

function CreateRestaurantForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone_number: '',
    delivery_hours: '',
    delivery_areas: '',
    average_delivery_time: '',
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('delivery_hours', formData.delivery_hours);
    formDataToSend.append('delivery_areas', formData.delivery_areas);
    formDataToSend.append('average_delivery_time', formData.average_delivery_time);
    formDataToSend.append('image', image);

    try {
      const response = await axiosInstance.post('/restaurants/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert('Restaurant created successfully');
        navigate('/restaurantOwner/profile'); // Navigate back to the profile page
      }
    } catch (error) {
      setError('Error creating restaurant');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-3xl text-center text-gray-800 mb-6">Create Restaurant</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block font-semibold text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Delivery Hours</label>
          <input
            type="text"
            name="delivery_hours"
            value={formData.delivery_hours}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Delivery Areas</label>
          <input
            type="text"
            name="delivery_areas"
            value={formData.delivery_areas}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Average Delivery Time</label>
          <input
            type="text"
            name="average_delivery_time"
            value={formData.average_delivery_time}
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
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300 focus:outline-none ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Restaurant'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRestaurantForm;
