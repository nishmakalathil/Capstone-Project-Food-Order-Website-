import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ role }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null); 

  const user = {
    role: "user",
    loginAPI: "/user/login",
    profileRoute: "/user/profile", 
    signupRoute: "/signup",
  };

  if (role === "restaurantOwner") {
    user.role = "restaurantOwner";
    user.loginAPI = "/restaurantOwner/login";
    user.profileRoute = "/restaurantOwner/dashboard"; 
    user.signupRoute = "/restaurantOwner/signup";
  }

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        `http://localhost:3006/api${user.loginAPI}`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        const token = response.data.data.token;
        localStorage.setItem("authToken", token); 
        navigate(user.profileRoute); 

        
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now! {user.role}</h1>
          <p className="py-6">Please login to access your account.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email")}
                className="input input-bordered"
                required
                autoComplete="email"
              />
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
                autoComplete="current-password"
              />
              <div className="flex items-center justify-between">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <Link to={user.signupRoute} className="label-text-alt link link-hover">
                    New User?
                  </Link>
                </label>
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
