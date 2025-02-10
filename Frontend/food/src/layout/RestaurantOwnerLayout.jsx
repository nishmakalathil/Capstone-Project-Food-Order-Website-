import React from "react";
import  Footer  from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import RestaurantOwnerHeader  from "../components/restaurantOwner/RestaurantOwnerHeader";
import  Header  from "../components/restaurantOwner/Header";

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
