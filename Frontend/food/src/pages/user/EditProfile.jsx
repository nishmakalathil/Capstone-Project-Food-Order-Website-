import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstances';

const EditProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        profilePic: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch the current user data and populate the form
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get('/user/profile');
                setUser(response.data.data);  // Populate the form with existing user data
            } catch (error) {
                console.error('Error fetching user profile for editing', error);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle the form submission to update the profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.put('/user/update', user);
            // Redirect to profile page after successful update
            navigate('/user/profile');
        } catch (error) {
            setError('Failed to update profile');
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Logout action
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/user/logout');
            navigate('/login'); // Redirect to login page after successful logout
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Welcome message */}
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to ReshRajans' Profile</h1>

            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-sm font-medium">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="profilePic" className="block text-sm font-medium">Profile Picture URL</label>
                    <input
                        type="text"
                        id="profilePic"
                        name="profilePic"
                        value={user.profilePic}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">New Password (optional)</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 focus:outline-none transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>

            {/* Logout Button with Tailwind CSS for oval shape */}
            <button
                onClick={handleLogout}
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 focus:outline-none transition duration-300 mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default EditProfile;
