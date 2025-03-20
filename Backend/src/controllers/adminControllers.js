const jwt = require("jsonwebtoken");
const User = require("../Models/userModel"); // User Model
const restaurantOwner = require("../Models/restaurantOwnerModel"); // Restaurant Owner Model
const MenuItem = require("../Models/menuItemsModel"); // Menu Item Model
const Order = require("../Models/orderModel"); // Order Model
const Coupon = require("../Models/couponModel");

const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const restaurantOwners = await restaurantOwner.countDocuments({ role: "restaurantOwner" });
    const menuItems = await MenuItem.countDocuments();
    const orders = await Order.countDocuments();
    const coupons = await Coupon.countDocuments();

    res.json({ users, restaurantOwners, menuItems, orders, coupons });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

const checkAdminAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ authenticated: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const adminUser = await restaurantOwner.findById(decoded.id);
    if (!adminUser || adminUser.role !== "admin") {
      return res.json({ authenticated: false, message: "Unauthorized" });
    }

    return res.json({
      authenticated: true,
      user: { id: adminUser._id, name: adminUser.name, email: adminUser.email },
    });
  } catch (error) {
    return res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
};

const logoutAdmin = (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
        });

        // Optional: Destroy session if using session-based authentication
        if (req.session) {
            return req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).json({ success: false, message: "Logout failed" });
                }

                return res.status(200).json({ success: true, message: "Admin logged out successfully" });
            });
        }

        return res.status(200).json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



//get Users
const getUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };
  
//delete Users
const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: `User ${isActive ? "activated" : "deactivated"} successfully`, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user status" });
    }
};



  // Get all restaurant owners

  const getRestaurantOwners = async (req, res) => {
    try {
        console.log("Fetching restaurant owners from database...");
        const owners = await restaurantOwner.aggregate([
            {
                $match: { role: "restaurantOwner" } // Fetch only restaurant owners
            },
            {
                $lookup: {
                    from: "restaurants",  // The actual collection name in MongoDB
                    localField: "_id",
                    foreignField: "owner_id",
                    as: "restaurants"
                }
            },
            {
                $project: { 
                    name: 1, 
                    email: 1, 
                    role: 1, 
                    restaurants: { name: 1, address: 1, phone_number: 1, image: 1 }
                } // Only include relevant fields
            }
        ]);
        
        console.log("Fetched owners:", owners);
        res.json({ owners });
    } catch (error) {
        console.error("Error in getRestaurantOwners:", error);
        res.status(500).json({ message: "Error fetching restaurant owners", error });
    }
};




// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        console.log("Fetching menu items...");
        const menuItems = await MenuItem.find()
            .populate("restaurant_id", "name");

        console.log("Fetched menu items:", menuItems);
        if (!menuItems || menuItems.length === 0) {
            console.warn("No menu items found in the database.");
        }

        res.status(200).json({ menuItems });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Error fetching menu items", error: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        console.log("Fetching orders from database...");
        const orders = await Order.find().populate("userId", "name").sort({ createdAt: -1 });

        console.log("Fetched orders:", orders);
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

const createCoupon = async (req, res) => {
    try {
        const { code, discount, expirationDate } = req.body;

        if (!code || !discount || !expirationDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if coupon already exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon code already exists" });
        }

        const newCoupon = new Coupon({ code, discount, expirationDate });
        await newCoupon.save();

        res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ message: "Error creating coupon", error: error.message });
    }
};


const deleteUnusedCoupon = async (req, res) => {
    try {
        const { couponCode } = req.params;

        // Check if the coupon exists
        const coupon = await Coupon.findOne({ code: couponCode });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        // Check if this coupon has been used in any orders
        const usedInOrder = await Order.exists({ "cart.couponCode": couponCode });
        if (usedInOrder) {
            return res.status(400).json({ message: "Cannot delete. Coupon is used in an order." });
        }

        // Delete the coupon if not used
        await Coupon.deleteOne({ code: couponCode });

        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting coupon", error: error.message });
    }
};

  
  



module.exports =  {checkAdminAuth,getDashboardStats,logoutAdmin,deactivateUser,getUsers,getRestaurantOwners,getAllOrders,getMenuItems, createCoupon, deleteUnusedCoupon} ;
