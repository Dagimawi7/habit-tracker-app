// Main server file for Habit Tracker backend

const express = require('express');        // Web framework
const dotenv = require('dotenv');          // Loads env variables from .env file
const connectDB = require('./config/db');  // MongoDB connection function
const cors = require('cors');              // Enables cross-origin requests (frontend can talk to backend)

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());               // Allow requests from different origins
app.use(express.json());       // Parse incoming JSON payloads

// Routes
app.use('/api/habits', require('./routes/habitRoutes')); // All habit-related API routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
