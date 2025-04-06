import React from "react";
import { useSelector } from "react-redux";
import UseFetch from "../../hooks/UseFetch";
import MenuItemsSkeleton from "../../components/shared/Skeltons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function MenuItems() {
    const [menuItemsList, isLoading, error] = UseFetch("/menu-items/get-menu");
    const navigate = useNavigate();

    
    const isUserAuth = useSelector((state) => state.user.isUserAuth);

    
    const handleMenuItemClick = (menuItemId) => {
        if (!isUserAuth) {
            toast.error("You need to log in to view menu item details!", {
                position: "top-center",
                duration: 3000,
                style: {
                    background: "#D32F2F",
                    color: "#fff",
                    fontWeight: "bold",
                },
            });

            
            setTimeout(() => {
                navigate("/login", { state: { from: `/menu-items/details/${menuItemId}` } });
            }, 2000);

            return;
        }

        navigate(`/menu-items/details/${menuItemId}`); 
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
        <div className="flex flex-col items-center justify-start px-4 sm:px-10 md:px-20 py-8 sm:py-12 md:py-16">
            <section className="mb-8 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Menu Item Listing Page</h1>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-7xl">
                {menuItemsList.map((menuitem) => (
                <div key={menuitem._id} className="flex justify-center">
                    <div className="w-full max-w-sm p-4 border rounded-lg shadow-md">
                    <img
                        src={menuitem.image || "/path/to/placeholder-image.jpg"}
                        alt={menuitem.name || "Menu Item"}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold mt-4">{menuitem.name}</h3>
                    <p className="text-base sm:text-lg font-medium text-gray-700 mt-2">{menuitem.price}</p>
                    <button
                        onClick={() => handleMenuItemClick(menuitem._id)}
                        className="text-white bg-pink-500 hover:bg-pink-600 mt-4 inline-block py-2 px-6 sm:px-8 rounded-full text-center transition duration-300"
                    >
                        Read More
                    </button>
                    </div>
                </div>
                ))}
            </section>
        </div>


        
    );
}

export default MenuItems;
