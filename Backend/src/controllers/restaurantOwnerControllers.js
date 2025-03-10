const restaurantOwner = require("../Models/restaurantOwnerModel.js");
const bcrypt = require('bcrypt');
const  generateToken  = require('../utils/token.js');
const NODE_ENV = process.env.NODE_ENV;




// Restaurant Owner Signup Controller
const restaurantOwnerSignup = async (req, res, next) => {
    try {
        const { name, address, phoneNumber, email, password, role , profilePic} = req.body;

       
        if (!name || !address || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

       
        const existingOwner = await restaurantOwner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Restaurant owner already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const newOwner = new restaurantOwner({
            name,
            address,
            phoneNumber,
            email,
            profilePic,
            password: hashedPassword,  
        });

        await newOwner.save();

        const token = generateToken(newOwner._id, "restaurantOwner");

        //res.cookie("token", token);


        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });


        res.status(201).json({
            data: { name: newOwner.name, email: newOwner.email },
            message: 'Restaurant Owner created successfully',
            token: token 
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//restaurantOwnerLogin
const restaurantOwnerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const existingOwner = await restaurantOwner.findOne({ email });
        if (!existingOwner) {
            return res.status(404).json({ message: 'Restaurant owner not found' });
        }
        
        const passwordMatch = await bcrypt.compare(password, existingOwner.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = generateToken(existingOwner._id, existingOwner.role);
        
        console.log("Token "+ token);
        
        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
        if (existingOwner.role === 'admin') {
            return res.status(200).json({
                data: { name: existingOwner.name, email: existingOwner.email, role: existingOwner.role},
                message: 'Login successful as Admin',
                role: 'admin',
            });
        } else if (existingOwner.role === 'restaurantOwner') {
            return res.status(200).json({
                data: { name: existingOwner.name, email: existingOwner.email, role: existingOwner.role},
                message: 'Login successful as Restaurant Owner',
                role: 'restaurantOwner',
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller for Restaurant Owner profile

const getRestaurantOwnerProfile = async (req, res) => {
    try {
        const restaurantOwnerId = req.restaurantOwner.id; 

    
        const restaurantOwnerData = await restaurantOwner.findById(restaurantOwnerId).select("-password");

        if (!restaurantOwnerData) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (restaurantOwnerData.role === 'admin') {
            return res.json({
                data: restaurantOwnerData,
                message: "Welcome, Admin! You have access to admin features."
            });
        } else if (restaurantOwnerData.role === 'restaurantOwner') {
            return res.json({
                data: restaurantOwnerData,
                message: "Restaurant Owner profile fetched successfully."
            });
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

    } catch (error) {
        console.error('Error fetching profile:', error); 
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

//controller For Update Profile

const updateRestaurantOwnerProfile = async (req, res) => {
    try {
        const restaurantOwnerId = req.restaurantOwner.id; 
        const updateData = req.body; 
        
        if (updateData.password) {
            return res.status(400).json({ message: "Password cannot be updated here. Please use the change password endpoint." });
        }

       
        const restaurantOwnerData = await restaurantOwner.findById(restaurantOwnerId);

        if (!restaurantOwnerData) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const updatedData = await restaurantOwner.findByIdAndUpdate(restaurantOwnerId, updateData, { new: true, runValidators: true }).select("-password");
        //console.log(updatedData);

        roleType = "Restaurant Owner";
        if(restaurantOwnerData.role === "admin"){
            roleType = "Admin";
        }

        return res.json({
            data: updatedData,
            message: roleType+"profile updated successfully"
        });

    } catch (error) {
        console.error('Error updating profile:', error); 
        res.status(500).json({ message: 'Error updating profile' });
    }
};

// Restaurant Owner Logout Controller
const restaurantOwnerLogout = (req, res) => {
    
        
        //res.clearCookie("token");

 try {
        res.clearCookie("token", {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
        
        return res.status(200).json({
            message: "Successfully logged out",
            success: true
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//check Restaurant Owner
const checkRestaurantOwner = async (req, res) => {
    try {
        const user = req.restaurantOwner; // Access the authenticated user from the request
        
        if (!user) {
            return res.status(401).json({ authenticated: false, message: "Unauthorized: No user found" });
        }

        if (user.role !== 'restaurantOwner') {
            return res.status(403).json({ authenticated: false, message: "Forbidden: User is not a restaurant owner" });
        }

        return res.json({
            authenticated: true,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};




module.exports = { restaurantOwnerSignup ,restaurantOwnerLogin,getRestaurantOwnerProfile,updateRestaurantOwnerProfile,restaurantOwnerLogout,checkRestaurantOwner}; // Ensure all functions are correctly exported