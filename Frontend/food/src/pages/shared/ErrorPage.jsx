import React from "react";
import { useNavigate } from "react-router-dom";

// Regular function declaration for ErrorPage component
function ErrorPage({ role }) {
    const navigate = useNavigate();
    const user = {
        home_route: "",
    };

    // Conditionally set the home route based on the role
    if (role === "restaurantOwner") {
        user.home_route = "/owner/dashboard";  // Update this to the restaurant owner's dashboard or home page
    }

    return (
        <div className="text-center p-6">
            <h1 className="text-4xl font-bold">404 - Page Not Found!</h1>
            <p className="mt-4">The page you are looking for doesn't exist.</p>
            <button 
                className="btn btn-accent mt-6" 
                onClick={() => navigate(user.home_route)}
            >
                Navigate to Home
            </button>
        </div>
    );
}

// Default export
export default ErrorPage;
