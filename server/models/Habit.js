// Mongoose schema and model for Habits collection

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // habit must have a title
  },
  description: { 
    type: String // optional detailed info about the habit
  },
  startDate: { 
    type: Date, 
    default: Date.now // default start date is when created
  },
  streak: { 
    type: Number, 
    default: 0 // count of consecutive days/weeks habit is done
  },
  goal: { 
    type: String // e.g., "Daily", "Weekly" to define habit frequency
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // links habit to a user, for future auth
  },
  createdAt: { 
    type: Date, 
    default: Date.now // when the habit was created in DB
  },
});

module.exports = mongoose.model('Habit', habitSchema);
