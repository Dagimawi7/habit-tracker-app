// Routes for habit-related API endpoints

const express = require('express');
const router = express.Router();

// Import controller functions to handle habit operations
const {
  getHabits,    // get all habits
  createHabit,  // add a new habit
  updateHabit,  // update an existing habit by ID
  deleteHabit,  // delete a habit by ID
} = require('../controllers/habitController');

// @route   GET /api/habits
// @desc    Get all habits
// @access  Public
router.get('/', getHabits);

// @route   POST /api/habits
// @desc    Create a new habit
// @access  Public
router.post('/', createHabit);

// @route   PUT /api/habits/:id
// @desc    Update habit by ID
// @access  Public
router.put('/:id', updateHabit);

// @route   DELETE /api/habits/:id
// @desc    Delete habit by ID
// @access  Public
router.delete('/:id', deleteHabit);

module.exports = router;
