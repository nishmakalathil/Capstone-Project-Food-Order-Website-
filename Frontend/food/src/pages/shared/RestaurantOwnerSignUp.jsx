import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstances";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RestaurantOwnerSignUp() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const isRestaurantOwnerAuth = useSelector((state) => state.restaurantOwner.isRestaurantOwnerAuth);
    
    // If logged in user, redirect to profile 
    if (isRestaurantOwnerAuth) {
        navigate("/restaurantOwner/profile");
        return null;  // Prevent rendering the form if the user is already authenticated
    }

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/restaurantOwner/signup", data);
            console.log("Signup Response:", response);
            navigate("/restaurantOwner/profile");
        } catch (error) {
            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign up now!</h1>
                    <p className="py-6">
                        Join as a Restaurant Owner or an Admin to manage operations seamlessly.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="name" {...register("name")} className="input input-bordered" required />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" {...register("email")} className="input input-bordered" required />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                {...register("password")}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="phone number"
                                {...register("phoneNumber")}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="address"
                                {...register("address")}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select {...register("role")} className="input input-bordered" required>
                                <option value="restaurantOwner">Restaurant Owner</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Existing User? */}
                        <label className="label">
                            <Link to={'/login'} className="label-text-alt link link-hover">
                                Existing User? Log in here
                            </Link>
                        </label>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantOwnerSignUp;
