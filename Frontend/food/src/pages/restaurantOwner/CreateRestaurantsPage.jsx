import React from "react";
import  CreateRestaurantsForm  from "../../components/restaurantOwner/CreateRestaurantsForm";

 const CreateRestaurantsPage = () => {
    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                <h2 className="font-semibold text-center text-2xl my-5 underline">Create new Restaurant</h2>
                < CreateRestaurantsForm />
            </section>
        </main>
    );
};

export default CreateRestaurantsPage;