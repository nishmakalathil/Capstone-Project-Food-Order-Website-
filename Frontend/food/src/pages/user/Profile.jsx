import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";

function Profile() {
    const [profileData, isLoading, error] = UseFetch("/user/profile");
    const [newProfilePic, setNewProfilePic] = useState(null); 
    const navigate = useNavigate();

    
    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePic(URL.createObjectURL(file)); 

            
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
                    
                    setNewProfilePic(data.profilePic); 
                } else {
                    console.error("Failed to upload profile picture.");
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
    };

    
    const handleLogOut = () => {
        localStorage.removeItem("authToken"); 
        navigate("/login"); 
    };

    
    if (isLoading) {
        return (
            <div className="text-center mt-10">
                <div className="loader"></div> 
                <p>Loading...</p>
            </div>
        );
    }

    
    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    return (
        <div className="flex">
            
            <div className="w-1/4 p-4 bg-gray-100 space-y-6">
                
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

                
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{profileData?.name}</h2>
                    <p className="text-gray-600">{profileData?.email}</p>
                    <p className="text-gray-600">{profileData?.phone}</p>
                </div>

                
                <div className="text-center">
                    <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                        onClick={() => navigate("user/edit-profile")} // Navigate to Edit Profile page
                    >
                        Edit Profile
                    </button>
                </div>

            
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

                    
                    <div className="mt-6">
                        <button
                            className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm w-auto"
                            onClick={handleLogOut} 
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        
            <div className="w-3/4 p-4 bg-white">
                
            </div>
        </div>
    );
}

export default Profile;
