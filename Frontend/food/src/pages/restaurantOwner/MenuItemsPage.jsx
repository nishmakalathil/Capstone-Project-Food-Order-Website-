// MenuItemsPage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstances';
import { useNavigate, useParams } from 'react-router-dom';

function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {

    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get(`/menu-items/menu-items-restaurant/${restaurantId}`, {
          withCredentials: true,
        });
        console.log('Menu items page');
        console.log(response);
        setMenuItems(response.data);
      } catch (err) {
        console.error('Error fetching menu items:', err.response || err.message);
        setError('Error fetching menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleEdit = (id) => {
    navigate(`/edit-menu-item/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/menu-items/${id}`, { withCredentials: true });
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err) {
      setError('Error deleting menu item');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-3xl text-center text-gray-800 mb-6">Menu Items</h2>
      {menuItems.length === 0 ? (
        <p className="text-gray-600 text-center">No menu items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="p-4 border rounded-lg shadow-md bg-gray-100">
              <img
                src={item.image || '/path/to/default-image.jpg'}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => (e.target.src = '/path/to/default-image.jpg')}
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-700 font-bold">${item.price}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuItemsPage;
