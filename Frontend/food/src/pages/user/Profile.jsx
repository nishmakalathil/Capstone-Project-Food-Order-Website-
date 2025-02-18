import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstances';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Send request to fetch the user profile
                const response = await axiosInstance.get('/user/profile');
                setUser(response.data.data); // Set the user data
            } catch (error) {
                console.error('Error fetching user profile', error);
                
                // Check for 401 error (unauthorized) and redirect to login page
                if (error.response && error.response.status === 401) {
                    navigate('/login');  // Redirect to login if not authenticated
                }
            }
        };

        fetchUserProfile();  // Call the function to fetch user profile
    }, [navigate]);

    const handleEditClick = () => {
        navigate('/user/edit-profile');  // Navigate to edit profile page
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/user/logout');  // Log the user out
            navigate('/login');  // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Profile</h1>

                {user ? (
                    <>
                        <div className="flex justify-center mb-6">
                            <img 
                                src={user.profilePic || 'https://res.cloudinary.com/dbkexrtm3/image/upload/v1739786132/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866_njdxig.avif'} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full" 
                            />
                        </div>

                        <div className="text-center mb-6">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Mobile:</strong> {user.mobile}</p>
                        </div>

                        <div className="flex justify-between gap-4">
                            <button 
                                onClick={handleEditClick} 
                                className="w-full py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                                Edit Profile
                            </button>

                            <button 
                                onClick={handleLogout} 
                                className="w-full py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>  // Display "Loading..." until the user profile is fetched
                )}
            </div>
        </div>
    );
};

export default Profile;
