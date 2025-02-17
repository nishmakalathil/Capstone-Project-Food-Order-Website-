const jwt = require('jsonwebtoken');
const restaurantOwnerModel = require('../Models/restaurantOwnerModel.js'); 


const restaurantOwnerAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: "Restaurant owner not authorized", success: false });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


        if (!decoded) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

       
        if (decoded.role !== 'restaurantOwner' ) {
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions", success: false });
        }

       
        req.restaurantOwner = decoded;

        
        next();
    } catch (error) {
        console.error('Authorization Error:', error);  // Log the error for debugging
        return res.status(401).json({ message: error.message || "Authorization failed", success: false });
    }
};

module.exports = restaurantOwnerAuth;

