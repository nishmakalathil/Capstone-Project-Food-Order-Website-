import React from "react";
import UseFetch from "../../hooks/UseFetch"; 
import MenuItemsSkeleton from "../../components/shared/Skeltons"; 
import { Link } from "react-router-dom"; 

function MenuItems() {
    const [MenuItemsList, isLoading, error] = UseFetch("/menu-items/get-menu"); 

    if (isLoading) {
        return <MenuItemsSkeleton />; 
    }

    
    if (error) {
        return <div className="text-red-500">Error: {error.message || "Failed to load menu items."}</div>;
    }

    
    if (!MenuItemsList || MenuItemsList.length === 0) {
        return <div>No menu items found.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start px-20 py-16">
            <section>
                <h1 className="text-2xl font-bold">Menu Item Listing Page</h1>
            </section>
            <section className="grid grid-rows-3 grid-cols-3 gap-10 w-full">
                {MenuItemsList.map((menuitem) => (
                    <div key={menuitem._id} className="flex justify-center">
                        <div className="w-full max-w-sm p-4 border rounded-lg shadow-md">
                            <img
                                src={menuitem.image || "/path/to/placeholder-image.jpg"}  
                                alt={menuitem.name || "Menu Item"}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-semibold mt-4">{menuitem.name}</h3>
                            <p className="text-lg font-medium text-gray-700 mt-2">{menuitem.price}</p>
                            <Link 
                                to={`/menu-items/details/${menuitem._id}`}  
                                className="text-white bg-pink-500 hover:bg-pink-600 mt-4 inline-block py-2 px-8 rounded-full text-center transition duration-300"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default MenuItems;