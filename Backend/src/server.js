const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config(); 


const app = express();

const PORT = process.env.PORT || 3006;


app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});


app.use(cors({
  origin: ["http://localhost:5174","https://capstone-project-food-order-website-5n5w.vercel.app"],  
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,  
  
}));


app.use(express.json());   
app.use(cookieParser());   


const dbpassword = process.env.DB_PASSWORD;
console.log("DB_PASSWORD:", dbpassword); 


const apiRouter = require('./routes/index.js'); 


mongoose.connect(`mongodb+srv://anukthanish:${dbpassword}@fow1.1f9gk.mongodb.net/?retryWrites=true&w=majority&appName=FOW1`, {})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(error => {
    console.error("DB connection failed:", error);
  });

  


app.use("/api", apiRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
