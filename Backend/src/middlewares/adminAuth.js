const adminAuth = async (req, res, next) => {
    try {
        if (!req.restaurantOwner || req.restaurantOwner.role !== "admin") {
            return res.status(403).json({
                message: "Access forbidden: Admins only",
                success: false,
            });
        }
        next();
    } catch (error) {
        console.error("Admin Authorization Error:", error);
        return res.status(401).json({
            message: error.message || "Authorization failed",
            success: false,
        });
    }
};

module.exports =  adminAuth ;
