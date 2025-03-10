const mongoose = require('mongoose');


//  User schema
const userSchema = new  mongoose.Schema({

    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    mobile: { type: String, required: true, unique: true },
    profilePic: { type: String, 
        
        default: 'https://res.cloudinary.com/dbkexrtm3/image/upload/v1739434486/Profile_PIC_tjmsma.jpg' 
    },
    isActive: { type: Boolean, default: true },    
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
