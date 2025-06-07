// Controller function for handling habit-related logic

// @desc    Respond with a list of habits (placeholder for now)
// @route   GET /api/habits
// @access  Public
const getHabits = (req, res) => {
    res.json({ message: 'Here are your habits' }); // send a JSON response
  };
  
  module.exports = { getHabits };
  