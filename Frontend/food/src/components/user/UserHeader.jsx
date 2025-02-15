import React, { useState } from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

function UserHeader() {
  const [query, setQuery] = useState(""); // State for storing search query
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const navigate = useNavigate();

  // Handle change in the search bar
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to handle search
  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!query.trim()) return; // Prevent search if query is empty
      setLoading(true); // Show loading indicator

      try {
        const response = await axiosInstance.get(
          `menu-items/search?query=${query}`
        );
        setSearchResults(response.data); // Store the search results
        // Pass the search results to the search results page
        navigate("/user/search", { state: { results: response.data } });
        setQuery(""); // Clear the search bar after the search
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-14 h-auto shadow-2xl flex-wrap bg-black"> {/* Black background */}
      {/* Logo and Search Bar Section */}
      <div className="flex items-center gap-1 flex-wrap md:flex-nowrap w-full md:w-auto">
        <img
          src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738607157/Logo_xpryjc.png"
          alt="Logo"
          className="w-20 h-20 object-contain -mr-3"
        />
        <h1 className="text-3xl font-bold text-white">Nish Delight</h1> {/* White text for contrast */}

        {/* Search Bar */}
        <div className="relative ml-4 w-full md:w-auto mt-3 md:mt-0">
          <button
            className="flex items-center justify-between bg-pink-500 text-white rounded-full px-4 py-2 w-full md:w-auto"
            onClick={handleSearch} // Trigger search on button click
          >
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
              onKeyPress={handleSearch} // Trigger search on pressing "Enter"
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white w-full pr-10"
            />
            <span className="text-white absolute right-3">
              🔍
            </span>
          </button>
        </div>

        {/* Show search results dropdown only if there are results and user is typing */}
        {query.length > 0 && searchResults.length > 0 && (
          <div className="absolute bg-white shadow-lg rounded-lg w-full md:w-60 mt-2">
            {searchResults.map((result) => (
              <Link
                to={`/item/${result._id}`} // Link to individual item details page
                key={result._id}
                className="block p-2 text-black hover:bg-gray-100"
              >
                {result.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center items-center gap-4 md:gap-16 w-full md:w-auto mt-4 md:mt-0">
        <nav>
          <ul className="flex justify-center items-center gap-6 text-md">
            <li>
              <Link to={"/"} className="font-bold text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="font-bold text-white">
                About
              </Link>
            </li>
            <li>
              <Link to={"/menu-items"} className="font-bold text-white">
                Menu Items
              </Link>
            </li>
            <Link to={"/user/profile"} className="text-white">
              <CircleUser size={24} />
            </Link>
          </ul>
        </nav>

        {/* Cart */}
        <div className="flex gap-6 items-center">
          <Link to={"/user/cart"} className="relative">
            <ShoppingBag size={24} className="text-white" />
            <span className="absolute top-0 right-0 text-xs bg-pink-600 text-white rounded-full px-2">
              3 {/* Example count */}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
