const mongoose = require('mongoose');


//  restaurant owner schema
const restaurantOwnerSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ['restaurantOwner', 'admin'], default: 'restaurantOwner' }, 
    phoneNumber: { type: String, required: true },

    profilePic: { type: String, 
        
        default: 'https://tcap.pbworks.com/f/1435170280/myAvatar.png' 
    },
        

   
    createdAt: { type: Date, default: Date.now },
   
});






const restaurantOwner = mongoose.model('RestaurantOwner', restaurantOwnerSchema);

module.exports = restaurantOwner;
