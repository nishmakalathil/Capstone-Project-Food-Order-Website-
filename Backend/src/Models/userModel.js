const mongoose = require('mongoose');


//  User schema
const userSchema = new  mongoose.Schema({

    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    
    
    mobile: { type: String, required: true, unique: true },
    
    profilePic: { type: String, 
        
        default: 'https://example.com/default-profile-pic.jpg' 
    },
        
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
