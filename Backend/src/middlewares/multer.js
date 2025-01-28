const multer = require('multer');
const { diskStorage } = multer;



const storage = diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    },
    
       // Add a timestamp to the filename to avoid conflicts
    
  });

  const upload = multer({storage:storage});

  module.exports = upload;