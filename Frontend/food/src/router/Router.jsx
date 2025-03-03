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
import DeliveryInformation from "../pages/user/DeliveryInformation";
import SearchResults from "../pages/user/SearchResults";
import CreateOrder from "../pages/user/CreateOrder";
import EditProfile from "../pages/user/EditProfile";
import CreateMenuItemsPage from "../pages/restaurantOwner/CreateMenuItemsPage";  // Fixed import
import ProtectedRouteRestaurantOwner from "./ProtectedRouteRestaurantOwner";
import RestaurantOwnerProfile from "../pages/restaurantOwner/RestaurantOwnerProfile";
import RestaurantOwnerEditProfile from "../pages/restaurantOwner/RestaurantOwnerEditProfile";
import CreateRestaurantsPage from "../pages/restaurantOwner/CreateRestaurantsPage";
import MenuItemsPage from"../pages/restaurantOwner/MenuItemsPage";
import EditMenuItemPage from "../pages/restaurantOwner/EditMenuItemPage";
import PaymentCancelPage from "../pages/user/PaymentCancelPage";
import PaymentSuccessPage from "../pages/user/PaymentSuccessPage";

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
          { path: "payment-success", element: <PaymentSuccessPage /> },
          { path: "payment-cancel", element: <PaymentCancelPage /> },
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
          { path: "create-menu-items", element: <CreateMenuItemsPage /> },
          { path: "create-restaurant", element: <CreateRestaurantsPage /> },
          { path: "menu-items/:restaurantId", element: <MenuItemsPage /> },
          { path: "edit-menu-item/:menuitemId", element: <EditMenuItemPage/> },
        ],
      }
      
    ],
  },
]);

export default router;
