import { createBrowserRouter } from "react-router-dom";
import UserLayout from '../layout/UserLayout';
import Home from '../pages/user/Home';
import ErrorPage from '../pages/shared/ErrorPage';
import About from '../pages/user/About';
import MenuItems from '../pages/user/MenuItems';
import MenuItemsDetails from '../pages/user/MenuItemsDetails';
import Login from '../pages/shared/Login';
import Profile from '../pages/user/Profile';
import SignUp from '../pages/shared/SignUp';
import RestaurantOwnerSignUp from '../pages/shared/RestaurantOwnerSignUp';
import RestaurantOwnerLayout from '../layout/RestaurantOwnerLayout';
import ProtectedRoute from '../router/ProtectedRoute';  
import Cart from "../pages/user/Cart";
import DeliveryInformation from "../pages/user/DeliveryInformations";
import SearchResults from "../pages/user/SearchResults";
import CreateOrder from "../pages/user/CreateOrder";
import EditProfile from "../pages/user/EditProfile";
import CreateMenuItems from "../pages/RestaurantOwner/CreateMenuItems";  // Fixed import
import ProtectedRouteRestaurantOwner from "./ProtectedRouteRestaurantOwner";
import RestaurantOwnerProfile from "../pages/RestaurantOwner/RestaurantOwnerProfile";
import RestaurantOwnerEditProfile from "../pages/RestaurantOwner/RestaurantOwnerEditProfile";

const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage role="user" />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "menu-items", element: <MenuItems /> },
      { path: "login", element: <Login /> },
      { path: "menu-items/details/:id", element: <MenuItemsDetails /> },
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
        ],
      },
    ],
  },
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
          { path: "profile", element: <RestaurantOwnerProfile /> },  // Route for restaurant owner profile
          { path: "update", element: <RestaurantOwnerEditProfile /> },
          { path: "create-menu-items", element: <CreateMenuItems /> },
        ],
      }
      
    ],
  },
]);

export default router;
