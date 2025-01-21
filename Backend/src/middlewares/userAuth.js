const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        console.log('User auth');
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        const tokenVerified = jwt.verify(token, process.env. JWT_SECRET_KEY);
        
        if (!tokenVerified) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        req.user = tokenVerified; 
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired', success: false });
        }
        return res.status(401).json({ message: error.message || "User authorization failed", success: false });
    }
};

module.exports = userAuth;
