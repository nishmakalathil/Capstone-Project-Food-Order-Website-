import React from "react";
import  CreateMenuItemsForm  from "../../components/restaurantOwner/CreateMenuItemsForm";

 const CreateMenuItemsPage = () => {
    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                <h2 className="font-semibold text-center text-2xl my-5 underline">Create new MenuItem</h2>
                < CreateMenuItemsForm />
            </section>
        </main>
    );
};

export default CreateMenuItemsPage;