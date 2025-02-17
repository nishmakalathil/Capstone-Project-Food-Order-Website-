import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstances";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RestaurantOwnerSignUp() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const isRestaurantOwnerAuth = useSelector((state) => state.restaurantOwner.isRestaurantOwnerAuth);
    
    // if logged in user, redirect to profile 
    if (isRestaurantOwnerAuth) {
            navigate("/restaurantOwner/profile");
            return null;  // Prevent rendering anything if the user isn't authenticated
    }

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/restaurantOwner/signup", 
                data: data,
            });
            console.log("response====", response);
            navigate("/restaurantOwner/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Restaurant Owner - Signup now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                        aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="name" {...register("name")} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" {...register("email")} className="input input-bordered" required />
                        </div>

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

                        <label className="label">
                            <Link to={'/login'}>
                                <a href="#" className="label-text-alt link link-hover">
                                    Existing User?
                                </a>
                            </Link>
                        </label>

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
