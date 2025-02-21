import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstances';

function EditMenuItemPage() {
  const { menuitemId } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    ingredients: '',
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axiosInstance.get(`/menu-items/get-single/${menuitemId}`, { withCredentials: true });
        setMenuItem(response.data);
        setImagePreview(response.data.image);
      } catch (err) {
        setError('Failed to fetch menu item data');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItem();
  }, [menuitemId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuItem({
      ...menuItem,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMenuItem({ ...menuItem, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('name', menuItem.name);
      formData.append('description', menuItem.description);
      formData.append('price', menuItem.price);
      formData.append('category', menuItem.category);
      formData.append('isAvailable', menuItem.isAvailable);
      formData.append('ingredients', menuItem.ingredients);

      if (menuItem.image) {
        formData.append('image', menuItem.image);
      }

      await axiosInstance.put(`/menu-items/update/${menuitemId}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('Menu item updated successfully! 🎉');

      // Navigate back after a short delay
      setTimeout(() => {
        navigate(`/restaurantOwner/menu-items/${menuItem.restaurant_id}`);
      }, 2000);
    } catch (err) {
      setError('Error updating menu item');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Menu Item</h2>
      
      {successMessage && <div className="mb-4 p-3 text-green-700 bg-green-200 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={menuItem.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={menuItem.isAvailable}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Available</label>
        </div>
        <div>
          <label className="block font-semibold">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={menuItem.ingredients}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded-lg" />}
        </div>
        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/menu-items/${menuItem.restaurant_id}`)}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMenuItemPage;
