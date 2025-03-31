import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstances';

const Profile = () => {
    
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log('Sending request with cookies:', document.cookie);
                const response = await axiosInstance.get('/user/profile');
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        navigate('/user/edit-profile');
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/user/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    const handleOrdersClick = () => {
        navigate('/user/order-display'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl flex">
                
                <div className="w-1/3 flex flex-col items-center border-r-2 pr-6">
                    <img
                        src={user?.profilePic || 'https://res.cloudinary.com/dbkexrtm3/image/upload/v1739786132/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866_njdxig.avif'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full shadow-md border-2 border-gray-300"
                    />
                    <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-600">{user?.mobile}</p>
                </div>

                
                <div className="w-2/3 flex flex-col justify-center items-center gap-3 pl-6">
                    <button
                        onClick={handleEditClick}
                        className="px-6 py-2 text-sm bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all">
                        ✏️ Edit
                    </button>
                    <button
                        onClick={handleOrdersClick}
                        className="px-6 py-2 text-sm bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all">
                        📦 Orders
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 text-sm bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all">
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
