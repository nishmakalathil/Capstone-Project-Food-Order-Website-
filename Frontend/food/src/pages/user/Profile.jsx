import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";

function Profile() {
    const [profileData, isLoading, error] = UseFetch("/user/profile");
    const [newProfilePic, setNewProfilePic] = useState(null); // For managing the uploaded picture
    const navigate = useNavigate();

    // Handle file change for profile picture upload
    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePic(URL.createObjectURL(file)); // Temporarily show the uploaded picture

            // Simulate uploading the file
            const formData = new FormData();
            formData.append("profilePic", file);

            try {
                const response = await fetch("/user/upload-profile-pic", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    // Update the profile data with the new profile picture URL
                    setNewProfilePic(data.profilePic); // Update profile picture after successful upload
                } else {
                    console.error("Failed to upload profile picture.");
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
    };

    // Logout functionality
    const handleLogOut = () => {
        localStorage.removeItem("authToken"); // Remove the token from localStorage
        navigate("/login"); // Redirect to login page after logout
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center mt-10">
                <div className="loader"></div> {/* You can add a loading spinner here */}
                <p>Loading...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="w-1/4 p-4 bg-gray-100 space-y-6">
                {/* Profile Picture */}
                <div className="text-center">
                    <img
                        src={newProfilePic || profileData?.profilePic || "/default-avatar.jpg"} // Default or uploaded image
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4" // Oval shape
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-2 block mx-auto"
                        onChange={handleProfilePicChange} // Handle file upload
                    />
                </div>

                {/* User Info */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{profileData?.name}</h2>
                    <p className="text-gray-600">{profileData?.email}</p>
                    <p className="text-gray-600">{profileData?.phone}</p>
                </div>

                {/* Edit Profile Button */}
                <div className="text-center">
                    <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                        onClick={() => navigate("user/edit-profile")} // Navigate to Edit Profile page
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Additional Navigation Links */}
                <div className="space-y-4 mt-6 flex flex-col items-center"> {/* Use flex column for vertical alignment */}
                    <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                        onClick={() => navigate("/orders")}
                    >
                        Your Orders
                    </button>

                    <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                        onClick={() => navigate("/account-settings")}
                    >
                        Account Settings
                    </button>

                    {/* Logout Button */}
                    <div className="mt-6">
                        <button
                            className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                            onClick={handleLogOut} // Trigger logout
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="w-3/4 p-4 bg-white">
                {/* Additional content can go here based on navigation */}
            </div>
        </div>
    );
}

export default Profile;
