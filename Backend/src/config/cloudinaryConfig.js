
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const cloudinaryInstance = cloudinary;


// Exporting the cloudinary instance
module.exports = cloudinaryInstance ;


