const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cookieParser());

const dbpassword = process.env.DB_PASSWORD;

console.log("DB_PASSWORD:", dbpassword); // Ensure you do not log sensitive data in production
const apiRouter = require('./src/routes/index.js'); // Import the apirouter

mongoose.connect(`mongodb+srv://anukthanish:${dbpassword}@fow1.1f9gk.mongodb.net/?retryWrites=true&w=majority&appName=FOW1`, {
})
.then(() => {
    console.log("DB connected successfully");
})
.catch(error => {
    console.error("DB connection failed:", error);
});

app.use("/api", apiRouter);

// Your routes go here

app.listen(3006, () => {
  console.log('Server is running on port 3006');  // Correct port number
});
