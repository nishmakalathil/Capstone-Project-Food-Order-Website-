const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        // Verify the token
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Add the verified user to the request object
        req.user = tokenVerified;

        // Log the user for debugging purposes (remove in production)
        console.log('Authenticated user:', req.user);

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle specific token expiration errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired', success: false });
        }

        // Log generic error details for debugging
        console.error('Authorization failed:', error.message);

        // Respond with a generic error message for any other errors
        return res.status(401).json({ message: error.message || "User authorization failed", success: false });
    }
};

module.exports = userAuth;
