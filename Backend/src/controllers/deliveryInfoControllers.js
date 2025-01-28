const Order = require('../Models/orderModel.js');
const DeliveryInfo = require('../Models/deliveryInfoModel.js');


const saveDeliveryInfo = async (req, res) => {
    try {
        // Get the required fields from the request body
        const { deliveryAddress, deliveryTime, contactNumber, deliveryInstructions } = req.body;
        const userId = req.user.id;  // Get the logged-in user's ID

        // Validate input data
        if (!deliveryAddress || !deliveryTime || !contactNumber) {
            return res.status(400).json({ message: "Delivery details are required" });
        }

        console.log("Adding delivery info for user:", userId);

        // Find or create delivery info for the user
        let deliveryInfo = await DeliveryInfo.findOne({ userId });

        if (!deliveryInfo) {
            // If no delivery info exists, create new delivery info
            deliveryInfo = new DeliveryInfo({
                userId,
                deliveryAddress,
                deliveryTime,
                contactNumber,
                deliveryInstructions: deliveryInstructions || "",  // Optional field
            });

            await deliveryInfo.save();  // Save new delivery info
        } else {
            // If delivery info exists, update it
            deliveryInfo.deliveryAddress = deliveryAddress;
            deliveryInfo.deliveryTime = deliveryTime;
            deliveryInfo.contactNumber = contactNumber;
            deliveryInfo.deliveryInstructions = deliveryInstructions || "";
            await deliveryInfo.save();  // Save the updated delivery info
        }

        // Respond with success and the updated data
        res.status(200).json({
            message: "Delivery information saved successfully",
            data: deliveryInfo
        });

    } catch (error) {
        console.error('Error saving delivery info:', error);
        res.status(500).json({ message: "Error saving delivery info", error });
    }
};





module.exports =  saveDeliveryInfo ;
