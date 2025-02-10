import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";

function EditProfile() {
    const [profileData, isLoading, error] = UseFetch("/user/profile");
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPhone, setUpdatedPhone] = useState("");
    const [newProfilePic, setNewProfilePic] = useState(null);
    const navigate = useNavigate();

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") setUpdatedName(value);
        if (name === "email") setUpdatedEmail(value);
        if (name === "phone") setUpdatedPhone(value);
    };

    
    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePic(URL.createObjectURL(file)); 
        }
    };

    
    const handleSaveProfile = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", updatedName || profileData?.name);
        formData.append("email", updatedEmail || profileData?.email);
        formData.append("phone", updatedPhone || profileData?.phone);
        if (newProfilePic) {
            formData.append("profilePic", newProfilePic);
        }

        try {
            const response = await fetch("/user/edit-profile", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Profile updated successfully!");
                navigate("/profile"); 
            } else {
                console.error("Failed to update profile.");
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile.");
        }
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
            <div className="w-1/4 p-4 bg-gray-100">
                
                <div className="text-center">
                    <img
                        src={newProfilePic || profileData?.profilePic || "/default-avatar.jpg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-2 block mx-auto"
                        onChange={handleProfilePicChange}
                    />
                </div>
            </div>

            
            <div className="w-3/4 p-4 bg-white">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded"
                            placeholder="Enter your name"
                            value={updatedName || profileData?.name || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email"
                            value={updatedEmail || profileData?.email || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="w-full p-2 border rounded"
                            placeholder="Enter your phone number"
                            value={updatedPhone || profileData?.phone || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
