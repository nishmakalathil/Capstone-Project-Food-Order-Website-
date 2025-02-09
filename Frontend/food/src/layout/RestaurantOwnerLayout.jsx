import React from "react";
import  Footer  from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import RestaurantOwnerHeader  from "../components/restaurantowner/RestaurantOwnerHeader";
import  Header  from "../components/restaurantowner/Header";

function RestaurantOwnerLayout() {
    const isUserAuth = false;

    return (
        <div>
            {isUserAuth ? <RestaurantOwnerHeader /> : <Header />}

            <div className="min-h-96">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}

export default RestaurantOwnerLayout;
