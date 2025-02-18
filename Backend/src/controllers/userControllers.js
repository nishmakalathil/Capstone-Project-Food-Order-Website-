const User = require('../Models/userModel.js'); 

const bcrypt = require('bcrypt');
const  generateToken  = require('../utils/token.js');

// Sign up
 const userSignup = async (req, res, next) => {
    try {
       

        const { name, email, password, mobile, profilePic } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "Signup - All fields are required" });
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userData = new User({ name, email, password: hashedPassword, mobile, profilePic });
        await userData.save();

        const token = generateToken(userData._id);
        res.cookie("token", token);

        return res.json({ data: userData, message: "user account created" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//Login
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const token = generateToken(userExist._id);

        // Set the cookie with secure options for production
        res.cookie('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Only true in production (ensures cookie is only sent over HTTPS)
            sameSite: 'Strict', // CSRF protection
            maxAge: 24 * 60 * 60 * 1000 // Optional: set an expiry for the cookie (24 hours here)
        });

        return res.json({ data: userExist, message: "User login success" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
//profile view

const userProfile = async (req, res, next) => {
    try {
        
        const userId = req.user.id; 

        console.log("Profile: ");
        console.log(req.user);

        const userData = await User.findById(userId).select("-password"); 
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ data: userData, message: "user profile fetched" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


// Profile update
const userUpdateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { name, email, mobile, profilePic,password } = req.body;  

      
        if (!name || !email || !mobile) {
            return res.status(400).json({ message: "Name, email, and mobile are required" });
        }

        
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: "Email is already taken by another user" });
        }

        
        const updatedUserData = {
            name,
            email,
            mobile,
            profilePic
        };

       
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            updatedUserData.password = hashedPassword;
        }

        
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        
        return res.json({ data: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



//logout


 const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        return res.json({ message: "user logout success" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//chec kuser
  
 
const checkUser = async (req, res, next) => {
    try {
      const user = req.user; // Get authenticated user from session or JWT
  
      if (user) {
        return res.json({
          authenticated: true,
          user: { id: user.id, name: user.name, email: user.email } // Send user data
        });
      }
  
      // If no user is authenticated, return authenticated: false
      return res.json({ authenticated: false });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  };
  




module.exports = { userSignup, userLogin, userProfile ,userLogout,userUpdateProfile,checkUser};
