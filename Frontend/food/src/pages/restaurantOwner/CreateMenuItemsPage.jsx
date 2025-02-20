import React from "react";
import  CreateMenuItemsForm  from "../../components/restaurantOwner/CreateMenuItemsForm";

 const CreateMenuItemsPage = () => {
    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                < CreateMenuItemsForm />
            </section>
        </main>
    );
};

export default CreateMenuItemsPage;