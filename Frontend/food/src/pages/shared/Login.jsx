import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstances";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdmin, saveAdmin } from "../../redux/features/adminSlice";
import { clearRestaurantOwner, saveRestaurantOwner } from "../../redux/features/restaurantOwnerSlice";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { toast } from "react-hot-toast";

function Login({ role }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  const roleConfig = {
    user: {
      loginAPI: "/user/login",
      signupRoute: "/signup",
      
    },
    restaurantOwner: {
      loginAPI: "/restaurantOwner/login",
      signupRoute: "/restaurantOwner/signup",
      
    },
    admin: {
      loginAPI: "/admin/login",
      signupRoute: "/admin/signup",
    },
  };

  let profileRoute = "/user/profile";

  const config = roleConfig[role] || roleConfig.user;

  const onSubmit = async (data) => {
    try {
      // Clear old session before logging in
      dispatch(clearUser());
      dispatch(clearRestaurantOwner());
      dispatch(clearAdmin());

      console.log("Attempting login with:", config.loginAPI, data);
      const response = await axiosInstance.post(config.loginAPI, data, { withCredentials: true });

      const loggedInUser = response?.data?.data;
      if (!loggedInUser) throw new Error("Invalid user data received.");

      console.log("Logged-in user:", loggedInUser);


      // Assign correct authentication state
      if (loggedInUser.role == "restaurantOwner") {
        dispatch(saveRestaurantOwner(loggedInUser));
        profileRoute = "/restaurantOwner/profile";
        console.log("Restaurant Owner logged in");
      } else if (loggedInUser.role == "admin") {
        dispatch(saveAdmin(loggedInUser));
        profileRoute = "/admin/dashboard";
        console.log("Admin logged in");
      } else if (loggedInUser.role == "user") {
        dispatch(saveUser(loggedInUser));
        console.log("User logged in, isUserAuth should be true");
      }

      localStorage.setItem("authToken", loggedInUser.token);
      localStorage.setItem("userRole", loggedInUser.role);

      toast.success("Login successful!", { position: "top-center" });


      navigate(profileRoute);
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed, please try again.", { position: "top-center" });
      setError(error.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse" ref={loginRef}>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now! {role}</h1>
          <p className="py-6">Please login to access your account.</p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" {...register("email")} className="input input-bordered" required autoComplete="email" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" {...register("password")} className="input input-bordered" required autoComplete="current-password" />
              <div className="flex items-center justify-between">
                <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                <Link to={config.signupRoute} className="label-text-alt link link-hover">New User?</Link>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;