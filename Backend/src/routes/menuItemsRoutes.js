const express = require("express");
const menuItemsRouter = express.Router();
const { createMenuItems, getAllMenuItems, getSingleMenuItem,getMenuItemDetails,deleteMenuItem,updateMenuItem } = require("../controllers/menuItemsControllers.js");
const restaurantOwnerAuth = require("../middlewares/restaurantOwnerAuth.js");
const upload = require("../middlewares/multer.js");

// Route for creating a menu item with an image
menuItemsRouter.post('/create', restaurantOwnerAuth, upload.single('image'), createMenuItems);

// Route to get all menu items
menuItemsRouter.get("/get-menu", getAllMenuItems);

// Route to update a menu item
menuItemsRouter.put("/update/:id", restaurantOwnerAuth, upload.single('image'), updateMenuItem);

//get single menu item
menuItemsRouter.get("/get-single/:id", getSingleMenuItem);

//menuitemdetails
menuItemsRouter.get("/details/:id", getMenuItemDetails);


//delete menuitems
menuItemsRouter.delete("/delete/:id", deleteMenuItem);




module.exports = menuItemsRouter;


