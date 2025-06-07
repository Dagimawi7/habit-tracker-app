const Habit = require('../models/Habit');

// @desc    Get all habits
// @route   GET /api/habits
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
const createHabit = async (req, res) => {
  const { title, description, goal } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const habit = new Habit({ title, description, goal });
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Update fields
    habit.title = req.body.title || habit.title;
    habit.description = req.body.description || habit.description;
    habit.goal = req.body.goal || habit.goal;
    habit.streak = req.body.streak != null ? req.body.streak : habit.streak;

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    await habit.remove();
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
