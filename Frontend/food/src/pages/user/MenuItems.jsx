import React, { useState } from "react";
import { useSelector } from "react-redux";
import UseFetch from "../../hooks/UseFetch";
import MenuItemsSkeleton from "../../components/shared/Skeltons";
import { useNavigate } from "react-router-dom";

function MenuItems() {
    const [menuItemsList, isLoading, error] = UseFetch("/menu-items/get-menu");
    const [showPopup, setShowPopup] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);
    const navigate = useNavigate();

    // Get authentication state from Redux
    const isUserAuth = useSelector((state) => state.user.isUserAuth);

    // Function to handle menu item click
    const handleMenuItemClick = (menuItemId) => {
        if (!isUserAuth) {
            setRedirectTo(`/menu-items/details/${menuItemId}`); // Store the intended page
            setShowPopup(true); // Show popup for non-logged-in users
            return;
        }
        navigate(`/menu-items/details/${menuItemId}`); // Allow navigation if logged in
    };

    if (isLoading) {
        return <MenuItemsSkeleton />;
    }
    if (error) {
        return <div className="text-red-500">Error: {error.message || "Failed to load menu items."}</div>;
    }
    if (!menuItemsList || menuItemsList.length === 0) {
        return <div>No menu items found.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start px-20 py-16">
            <section>
                <h1 className="text-2xl font-bold">Menu Item Listing Page</h1>
            </section>
            <section className="grid grid-cols-3 gap-10 w-full">
                {menuItemsList.map((menuitem) => (
                    <div key={menuitem._id} className="flex justify-center">
                        <div className="w-full max-w-sm p-4 border rounded-lg shadow-md">
                            <img
                                src={menuitem.image || "/path/to/placeholder-image.jpg"}
                                alt={menuitem.name || "Menu Item"}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-semibold mt-4">{menuitem.name}</h3>
                            <p className="text-lg font-medium text-gray-700 mt-2">{menuitem.price}</p>
                            <button
                                onClick={() => handleMenuItemClick(menuitem._id)}
                                className="text-white bg-pink-500 hover:bg-pink-600 mt-4 inline-block py-2 px-8 rounded-full text-center transition duration-300"
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Popup for login */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">
                            You need to log in to view menu item details.
                        </p>
                        <button
                            onClick={() => navigate("/login", { state: { from: redirectTo } })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Go to Login
                        </button>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuItems;
