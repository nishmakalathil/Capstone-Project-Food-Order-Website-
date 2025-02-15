import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";  // Modify the axios instance import
import toast from "react-hot-toast";

 const CreateMenuItemForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data, "=====data");
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("image", data.image[0]);

            setLoading(true); // Show loading spinner

            const response = await axiosInstance({
                url: "/menu/create-item",  // Modify endpoint as needed
                method: "POST",
                data: formData,
            });
            toast.success("Menu item created successfully");
            navigate("/restaurantowner/menu-items");  // Redirect to menu items page after successful creation
        } catch (error) {
            console.log(error);
            toast.error("Error while creating menu item");
        } finally {
            setLoading(false);  // Hide loading spinner after API call
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Dish Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Dish Name"
                    className={`input input-bordered text-sm ${errors.name ? "input-error" : ""}`}
                    {...register("name", {
                        required: "Dish name is required",
                    })}
                />
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
            </div>

            {/* Image */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Upload Image</span>
                </label>
                <input
                    type="file"
                    className={`input text-sm ${errors.image ? "input-error" : ""}`}
                    {...register("image", { required: "Image is required" })}
                />
                {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
            </div>

            {/* Price */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Price"
                    className={`input input-bordered text-sm ${errors.price ? "input-error" : ""}`}
                    {...register("price", {
                        required: "Price is required",
                    })}
                />
                {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
            </div>

            {/* Category */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Category</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Category (e.g. Appetizer, Main Course)"
                    className={`input input-bordered text-sm ${errors.category ? "input-error" : ""}`}
                    {...register("category", {
                        required: "Category is required",
                    })}
                />
                {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>}
            </div>

            {/* Description */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    placeholder="Dish Description"
                    className={`input input-bordered text-sm ${errors.description ? "input-error" : ""}`}
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
                {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
            </div>

            <div className="form-control mt-6">
                <button
                    type="submit"
                    className="btn primary-bg text-white font-semibold w-full md:w-1/2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "Create Menu Item"
                    )}
                </button>
            </div>
        </form>
    );
};


export default CreateMenuItemForm;