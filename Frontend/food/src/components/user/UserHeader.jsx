import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react"; // Icons for user, cart, and search
import { Link } from "react-router-dom";

function UserHeader() {
  return (
    <div className="flex justify-between items-center p-4 md:p-14 h-auto shadow-2xl flex-wrap">
      {/* Logo and Search Bar Section */}
      <div className="flex items-center gap-1 flex-wrap md:flex-nowrap w-full md:w-auto">
        {/* Logo on the left side */}
        <img
          src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738607157/Logo_xpryjc.png"
          alt="Logo"
          className="w-20 h-20 object-contain -mr-3"
        />

        {/* Foodie Text with pink color */}
        <h1 className="text-3xl font-bold text-pink-500">Nish Delight</h1>

        {/* Oval Search Bar with pink search icon */}
        <div className="relative ml-4 w-full md:w-auto mt-3 md:mt-0">
          <button className="flex items-center justify-between bg-pink-500 text-white rounded-full px-4 py-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white w-full pr-10"
            />
            <span className="text-white pr-2">
              🔍
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center items-center gap-4 md:gap-16 w-full md:w-auto mt-4 md:mt-0">
        <nav>
          <ul className="flex justify-center items-center gap-6 text-md">
            <li><Link to={"/"} className="font-bold">Home</Link></li>
            <li><Link to={"/about"} className="font-bold">About</Link></li>
            <li><Link to={"/menu-items"} className="font-bold">Menu Items</Link></li>
            <Link to={"/user/profile"}>
            <CircleUser size={24} />
          </Link>

           
          </ul>
        </nav>

        {/* Right Side - Cart, User Profile */}
        <div className="flex gap-6 items-center">
          {/* Extra Cart */}
          <Link to={"/user/cart"} className="relative">
            <ShoppingBag size={24} />
            <span className="absolute top-0 right-0 text-xs bg-pink-600 text-white rounded-full px-2">
              3 {/* Example count, dynamic based on cart */}
            </span>
          </Link>
         
          
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
