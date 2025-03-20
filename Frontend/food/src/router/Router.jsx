import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import RestaurantOwnerLayout from "../layout/RestaurantOwnerLayout";
import AdminLayout from "../layout/AdminLayout"; 
import ErrorPage from "../pages/shared/ErrorPage";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import MenuItems from "../pages/user/MenuItems";
import MenuItemsDetails from "../pages/user/MenuItemsDetails";
import Login from "../pages/shared/Login";
import Profile from "../pages/user/Profile";
import SignUp from "../pages/shared/SignUp";
import RestaurantOwnerSignUp from "../pages/shared/RestaurantOwnerSignUp";
import ProtectedRoute from "../router/ProtectedRoute";
import ProtectedRouteRestaurantOwner from "./ProtectedRouteRestaurantOwner";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin"; 
import Cart from "../pages/user/Cart";
import DeliveryInformation from "../pages/user/DeliveryInformation";
import SearchResults from "../pages/user/SearchResults";
import CreateOrder from "../pages/user/CreateOrder";
import EditProfile from "../pages/user/EditProfile";
import CreateMenuItemsPage from "../pages/restaurantOwner/CreateMenuItemsPage";
import RestaurantOwnerProfile from "../pages/restaurantOwner/RestaurantOwnerProfile";
import RestaurantOwnerEditProfile from "../pages/restaurantOwner/RestaurantOwnerEditProfile";
import RestaurantOwnerRestaurants from "../pages/restaurantOwner/RestaurantOwnerRestaurants";
import CreateRestaurantsPage from "../pages/restaurantOwner/CreateRestaurantsPage";
import MenuItemsPage from "../pages/restaurantOwner/MenuItemsPage";
import EditMenuItemPage from "../pages/restaurantOwner/EditMenuItemPage";
import PaymentCancelPage from "../pages/user/PaymentCancelPage";
import PaymentSuccessPage from "../pages/user/PaymentSuccessPage";
import OrderDisplay from "../pages/user/OrderDisplay";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageRestaurantOwners from "../pages/admin/ManageRestaurantOwners";
import ManageMenuItems from "../pages/admin/ManageMenuitems";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageCoupons from "../pages/admin/ManageCoupons";
import EditRestaurantPage from "../pages/restaurantOwner/EditRestaurantPage";
import LeaveReview from "../pages/user/LeaveReview";

// ✅ Import Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
// import ManageUsers from "../pages/admin/ManageUsers";
// import ManageRestaurants from "../pages/admin/ManageRestaurants";
// import ManageMenuItems from "../pages/admin/ManageMenuItems";
// import ManageOrders from "../pages/admin/ManageOrders";

const router = createBrowserRouter([
  // ✅ User Routes
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage role="user" />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "menu-items", element: <MenuItems /> },
      { path: "menu-items/details/:id", element: <MenuItemsDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        element: <ProtectedRoute />,
        path: "user",
        children: [
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "cart", element: <Cart /> },
          { path: "deliveryInfo", element: <DeliveryInformation /> },
          { path: "search", element: <SearchResults /> },
          { path: "create-order", element: <CreateOrder /> },
          { path: "payment-success", element: <PaymentSuccessPage /> },
          { path: "payment-cancel", element: <PaymentCancelPage /> },
          { path: "order-display", element: <OrderDisplay /> },
          { path: "leave-review/:id", element: < LeaveReview/> },
          
        ],
      },
    ],
  },

  // ✅ Restaurant Owner Routes
  {
    path: "restaurantOwner",
    element: <RestaurantOwnerLayout />,
    errorElement: <ErrorPage role="restaurantOwner" />,
    children: [
      { path: "login", element: <Login role="restaurantOwner" /> },
      { path: "signup", element: <RestaurantOwnerSignUp /> },
      {
        element: <ProtectedRouteRestaurantOwner />,
        children: [
          { path: "profile", element: <RestaurantOwnerProfile /> },
          { path: "update", element: <RestaurantOwnerEditProfile /> },
          { path: "create-menu-items", element: <CreateMenuItemsPage /> },
          { path: "get-restaurants", element: <RestaurantOwnerRestaurants /> },
          { path: "create-restaurant", element: <CreateRestaurantsPage /> },
          { path: "menu-items/:restaurantId", element: <MenuItemsPage /> },
          { path: "edit-menu-item/:menuitemId", element: <EditMenuItemPage /> },
          { path: "edit-restaurant/:restaurantId", element: <EditRestaurantPage /> },
        ],
      },
    ],
  },

  // ✅ Admin Routes
  {
    path: "admin",
    element: <AdminLayout />, // ✅ Admin Layout
    errorElement: <ErrorPage role="admin" />,
    children: [
      { path: "login", element: <Login role="admin" /> },
      {
        element: <ProtectedRouteAdmin />, // ✅ Protect Admin Routes
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
           { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-restaurant-owners", element: <ManageRestaurantOwners /> },
           { path: "get-menu-items", element: <ManageMenuItems /> },
           { path: "get-orders", element: <ManageOrders /> },
           { path: "get-coupons", element: <ManageCoupons /> },
        ],
      },
    ],
  },
]);

export default router;
