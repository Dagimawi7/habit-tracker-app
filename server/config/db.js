// MongoDB connection setup using Mongoose
// Grabs URI from .env (never hardcoded)
// If connection fails, log error and exit process
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // connect to MongoDB using environment variable
    console.log('MongoDB connected'); // success message
  } catch (err) {
    console.error(err.message); // print error message
    process.exit(1); // exit app if DB fails to connect
  }
};

module.exports = connectDB;
