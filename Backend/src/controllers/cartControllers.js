const Cart = require("../Models/cartModel.js");
const MenuItem = require('../Models/menuItemsModel.js'); 

// Add to Cart controller
const addToCart = async (req, res) => {
    try {
        // Destructure userId, menuItem_id, and quantity from the request body
        const userId = req.user.id;
        const { menuItemId, quantity } = req.body; 
        

        // Validate input
        if (!menuItemId || !quantity) {
            return res.status(400).json({ message: "Menu item ID and quantity are required" });
        }

        // Find the menu item to ensure it exists and fetch its price
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        const price = menuItem.price; // Get price from the MenuItem document

        // Find the existing cart for the user
        let cart = await Cart.findOne({ userId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                userId,
                menuItems: [
                    {
                        menuItemId, // Corrected field name
                        quantity,
                        price,
                    },
                ],
                totalPrice: price * quantity, // Set the initial total price
                status: 'Pending', // Ensure the status matches the enum in your model
            });
        } else {
            // If the cart exists, check if the item already exists in the cart
            const existingItemIndex = cart.menuItems.findIndex(item => item.menuItemId.toString() === menuItemId.toString());

            if (existingItemIndex >= 0) {
                // Item already exists in the cart, so update the quantity and price
                cart.menuItems[existingItemIndex].quantity += quantity;
            } else {
                // Add the new item to the cart
                cart.menuItems.push({
                    menuItemId, // Corrected field name
                    quantity,
                    price,
                });
            }

            // Recalculate total price after adding/updating the item
            cart.calculateTotalPrice(); // This method will recalculate the total price based on menuItems
        }

        // Save the cart to the database
        await cart.save();

        // Send a success response with the updated cart
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error.message });
    }
};

//getcart
const getCart = async (req, res) => {
    try {
        // Extract userId from the request parameters
        //const { userId } = req.params;
        const userId = req.user.id;

        // Find the cart for the given userId
        const cart = await Cart.findOne({ userId }).populate("menuItems.menuItemId", "name price"); // Populate menuItem details

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the given user." });
        }

        // Send the cart as response
        res.status(200).json({
            message: "Cart retrieved successfully",
            cart,
        });
    } catch (error) {
        // Catch any errors and send a server error response
        res.status(500).json({ message: "Error: " + error.message });
    }
};


// Update the quantity of a menu item in the cart
const updateMenuItemQuantity = async (req, res) => {
    try {
        const userId = req.user.id;  // Get the authenticated user's ID
        const { menuItemId, quantity } = req.body;  // Get the item ID and new quantity from the request body

        // Validate input
        if (!menuItemId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Valid menu item ID and quantity are required" });
        }

        // Find the cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the index of the item to update
        const itemIndex = cart.menuItems.findIndex(item => item.menuItemId.toString() === menuItemId.toString());

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Get the menu item to ensure it exists and get its price
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update the quantity and recalculate the total price
        cart.menuItems[itemIndex].quantity = quantity;

        // Recalculate the total price of the cart
        cart.totalPrice = cart.menuItems.reduce((total, item) => {
            const itemPrice = item.price * item.quantity;  // Item price * quantity
            return total + itemPrice;
        }, 0);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};




//remove from cart
const removeMenuItemFromCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user.id comes from a middleware
        const { menuItemId } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the course from the cart
        cart.menuItems = cart.menuItems.filter((item) => !item.menuItemId.equals(menuItemId));

        // Recalculate the total price
        cart.calculateTotalPrice();

        // Save the cart
        await cart.save();

        res.status(200).json({ data: cart, message: "Item removed form cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Clear Cart Controller
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;  // Get the userId from the authenticated user

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Clear all items in the cart
        cart.menuItems = [];

        // Recalculate the total price (should now be 0)
        cart.totalPrice = 0;

        // Save the updated cart to the database
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};





  module.exports ={ addToCart,getCart, removeMenuItemFromCart,clearCart,updateMenuItemQuantity};