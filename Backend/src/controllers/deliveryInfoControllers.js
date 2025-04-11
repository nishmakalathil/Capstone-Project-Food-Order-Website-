const mongoose = require('mongoose');  // Make sure mongoose is imported

const Order = require('../Models/orderModel.js');
const DeliveryInfo = require('../Models/deliveryInfoModel.js');

// Example: Adding a new address
const saveDeliveryInfo = async (req, res) => {
    try {
        const { deliveryAddress, contactNumber, deliveryInstructions } = req.body;
        const userId = req.user.id;  // Assuming req.user contains user info

        // Check if all required fields are present
        if (!deliveryAddress || !contactNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user's delivery info
        let deliveryInfo = await DeliveryInfo.findOne({ userId });

        // If no deliveryInfo exists, create a new one
        if (!deliveryInfo) {
            deliveryInfo = new DeliveryInfo({ userId, addresses: [] });
        }

        // Push the new address to the addresses array
        deliveryInfo.addresses.push({
            deliveryAddress,
            contactNumber,
            deliveryInstructions: deliveryInstructions || ""
        });

        // Save the updated delivery info document
        await deliveryInfo.save();

        // Respond with a success message
        res.status(200).json({
            message: "Delivery information saved successfully",
            data: deliveryInfo
        });
    } catch (error) {
        console.error('Error saving delivery info:', error);
        res.status(500).json({ message: "Error saving delivery info", error });
    }
};




//update delivery info

const updateDeliveryInfo = async (req, res) => {
    try {
        //console.log('here in delivery info');
        const { deliveryAddress, contactNumber, deliveryInstructions, _id } = req.body;
        const userId = req.user.id;

        // Check if the required fields are provided
        if ( !deliveryAddress || !contactNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user's delivery info
        const deliveryInfo = await DeliveryInfo.findOne({ userId });

        if (!deliveryInfo) {
            return res.status(404).json({ message: "No delivery information found" });
        }

        // Find the address by its ID and update it
        const address = deliveryInfo.addresses.id(_id);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Update the address fields
        address.deliveryAddress = deliveryAddress || address.deliveryAddress;
        address.contactNumber = contactNumber || address.contactNumber;
        address.deliveryInstructions = deliveryInstructions || address.deliveryInstructions;

        // Save the updated delivery information
        await deliveryInfo.save();

        res.status(200).json({
            message: "Delivery information updated successfully",
            data: deliveryInfo
        });
    } catch (error) {
        console.error('Error updating delivery info:', error.message);
        res.status(500).json({ message: "Error updating delivery info", error: error.message });
    }
};






// Get all delivery info

const getAllDeliveryInfo = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user's delivery info
        const deliveryInfo = await DeliveryInfo.findOne({ userId });

        // Check if delivery information is found
        if (!deliveryInfo || deliveryInfo.addresses.length === 0) {
            return res.status(200).json({ message: "No delivery information found" });
        }

        res.status(200).json({
            message: "Delivery information retrieved successfully",
            data: deliveryInfo.addresses // Return only the addresses array
        });
    } catch (error) {
        console.error('Error retrieving delivery info:', error);
        res.status(500).json({ message: "Error retrieving delivery info", error });
    }
};







//Delete Delivery Info (Delete a Specific Address)
const deleteDeliveryInfo = async (req, res) => {
    try {
        const { addressId } = req.params;  // Extract addressId from the URL
        const userId = req.user.id;        // User ID from the JWT token

        if (!addressId) {
            return res.status(400).json({ message: "Address ID is required" });
        }

        // Validate if the addressId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: "Invalid address ID format" });
        }

        console.log(`Searching for addressId: ${addressId} for userId: ${userId}`);

        // Find the user's delivery info
        const deliveryInfo = await DeliveryInfo.findOne({ userId });
        
        console.log('User delivery info:', deliveryInfo); // Log the whole delivery info

        if (!deliveryInfo) {
            return res.status(404).json({ message: "No delivery information found for the user" });
        }

        // Log all addresses to check the structure
        console.log('User addresses:', deliveryInfo.addresses);

        // Find the index of the address to remove
        const addressIndex = deliveryInfo.addresses.findIndex(address => address._id.toString() === addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Remove the address from the array by splicing it
        deliveryInfo.addresses.splice(addressIndex, 1);

        // Save the updated delivery information
        await deliveryInfo.save();

        res.status(200).json({
            message: "Address deleted successfully",
            data: deliveryInfo
        });
    } catch (error) {
        console.error('Error deleting delivery info:', error);
        res.status(500).json({ message: "Error deleting delivery info", error: error.message });
    }
};




module.exports =  {saveDeliveryInfo,updateDeliveryInfo,deleteDeliveryInfo,getAllDeliveryInfo} ;