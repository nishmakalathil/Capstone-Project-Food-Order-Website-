import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstances';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Use the axiosInstance to make the API call
                const response = await axiosInstance.get('/user/profile');
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };
        fetchUserProfile();
    }, []);  // Empty dependency array ensures this runs only once after the initial render

    const handleEditClick = () => {
        navigate('/user/edit-profile');  // Redirect to the edit profile page
    };

    const handleLogout = async () => {
        try {
            // Make an API call to the logout endpoint
            const response = await axiosInstance.post('/user/logout');
            // Redirect to the login page after successful logout
            navigate('/login');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Welcome message */}
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to Your Profile</h1>

            {user ? (
                <>
                    <h2 className="text-xl font-semibold">Name: {user.name}</h2>
                    <p className="font-bold">Email: {user.email}</p>  {/* Make email bold */}
                    <p className="font-bold">Mobile: {user.mobile}</p>  {/* Make mobile bold */}

                    {/* Profile Picture with fallback */}
                    <img 
                        src={user.profilePic || 'https://res.cloudinary.com/dbkexrtm3/image/upload/v1739434486/Profile_PIC_tjmsma.jpg'} 
                        alt="Profile" 
                        className="mt-4 w-32 h-32 rounded-full" 
                    />
                    
                    <button 
                        onClick={handleEditClick} 
                        className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 focus:outline-none transition duration-300 mt-4">
                        Edit Profile
                    </button>

                    {/* Logout Button - Pink and Oval Shape */}
                    <button 
                        onClick={handleLogout} 
                        className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 focus:outline-none transition duration-300 mt-4">
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
