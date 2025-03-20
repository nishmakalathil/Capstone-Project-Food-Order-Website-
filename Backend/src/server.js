const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config(); // Load environment variables

// Initialize the Express app
const app = express();

const PORT = process.env.PORT || 3006;

// Example API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Set up CORS after initializing the Express app (and before your routes)
app.use(cors({
  origin: ["http://localhost:5179","https://capstone-project-food-order-website-5n5w.vercel.app"],  // This allows requests from your frontend (localhost:5301)
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,  // Allow cookies to be sent with requests
  
}));

// Other middlewares
app.use(express.json());   // To parse JSON data in request body
app.use(cookieParser());   // To parse cookies from request

// MongoDB connection setup
const dbpassword = process.env.DB_PASSWORD;
console.log("DB_PASSWORD:", dbpassword); // Be careful about logging sensitive data in production

// Import API routes
const apiRouter = require('./routes/index.js'); // Import your API routes

// Connect to MongoDB database
mongoose.connect(`mongodb+srv://anukthanish:${dbpassword}@fow1.1f9gk.mongodb.net/?retryWrites=true&w=majority&appName=FOW1`, {})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(error => {
    console.error("DB connection failed:", error);
  });

  

// Use API routes
app.use("/api", apiRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
