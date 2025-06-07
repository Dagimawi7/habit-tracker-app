// Routes for Habit Tracker API - handles HTTP requests related to habits

const express = require('express');
const router = express.Router();

// Import controller function to handle getting habits
const { getHabits } = require('../controllers/habitController');

// @route   GET /api/habits
// @desc    Get all habits
// @access  Public (can update later to add auth)
router.get('/', getHabits);

module.exports = router;
