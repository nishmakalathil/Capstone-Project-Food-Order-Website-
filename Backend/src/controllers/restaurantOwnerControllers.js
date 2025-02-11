const restaurantOwner = require("../Models/restaurantOwnerModel.js");
const bcrypt = require('bcrypt');
const  generateToken  = require('../utils/token.js');


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

       
        const token = generateToken(newOwner._id);

      
        roleType = "Restaurant Owner";

        if (role === 'admin') {
            roleType = "Admin";
        }
        res.status(201).json({
            data: { name: newOwner.name, email: newOwner.email },
            message: roleType +' created successfully',
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

        console.log(existingOwner);

      
        const passwordMatch = await bcrypt.compare(password, existingOwner.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

      
        const token = generateToken(existingOwner._id, existingOwner.role); 

       
        res.cookie("token", token);

       
        if (existingOwner.role === 'admin') {
            return res.status(200).json({
                data: { name: existingOwner.name, email: existingOwner.email },
                message: 'Login successful as Admin',
                role: 'admin', 
            });
        } else if (existingOwner.role === 'restaurantOwner') {
            return res.status(200).json({
                data: { name: existingOwner.name, email: existingOwner.email },
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
        console.log(updatedData);

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
    try {
        
        res.clearCookie("token");

        
        return res.status(200).json({
            message: "Successfully logged out",
            success: true
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};







module.exports = { restaurantOwnerSignup ,restaurantOwnerLogin,getRestaurantOwnerProfile,updateRestaurantOwnerProfile,restaurantOwnerLogout}; // Ensure all functions are correctly exported








