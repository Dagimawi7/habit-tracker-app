import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('Daily');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [streaks, setStreaks] = useState({}); // Track streaks locally for now

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/habits');
      setHabits(res.data);
      // Initialize streaks state
      const streakMap = {};
      res.data.forEach(habit => {
        streakMap[habit._id] = habit.streak || 0;
      });
      setStreaks(streakMap);
    } catch (err) {
      alert('Error fetching habits');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Title is required');
    try {
      if (editingId) {
        // Update existing habit
        const res = await axios.put(`http://localhost:5000/api/habits/${editingId}`, {
          title,
          description,
          goal,
          streak: streaks[editingId],
        });
        setHabits(habits.map(h => (h._id === editingId ? res.data : h)));
        setEditingId(null);
      } else {
        // Create new habit
        const res = await axios.post('http://localhost:5000/api/habits', {
          title,
          description,
          goal,
        });
        setHabits([...habits, res.data]);
      }
      setTitle('');
      setDescription('');
      setGoal('Daily');
    } catch (err) {
      alert('Error saving habit');
    }
  };

  const handleEdit = (habit) => {
    setEditingId(habit._id);
    setTitle(habit.title);
    setDescription(habit.description);
    setGoal(habit.goal);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this habit?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/habits/${id}`);
      setHabits(habits.filter(h => h._id !== id));
    } catch (err) {
      alert('Error deleting habit');
    }
  };

  const incrementStreak = async (id) => {
    const newStreak = (streaks[id] || 0) + 1;
    setStreaks({ ...streaks, [id]: newStreak });

    try {
      await axios.put(`http://localhost:5000/api/habits/${id}`, { streak: newStreak });
      setHabits(
        habits.map(h => (h._id === id ? { ...h, streak: newStreak } : h))
      );
    } catch (err) {
      alert('Error updating streak');
    }
  };

  const resetStreak = async (id) => {
    if (!window.confirm('Reset streak to 0?')) return;
    setStreaks({ ...streaks, [id]: 0 });

    try {
      await axios.put(`http://localhost:5000/api/habits/${id}`, { streak: 0 });
      setHabits(
        habits.map(h => (h._id === id ? { ...h, streak: 0 } : h))
      );
    } catch (err) {
      alert('Error resetting streak');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Habit Tracker</h1>
      <p><i>Small daily practice + consistency = Success</i></p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          {editingId ? 'Update Habit' : 'Add Habit'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle('');
              setDescription('');
              setGoal('Daily');
            }}
            style={{ marginTop: 10, width: '100%', padding: 10, backgroundColor: '#ccc' }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading habits...</p>
      ) : habits.length === 0 ? (
        <p>No habits yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {habits.map((habit) => (
            <li
              key={habit._id}
              style={{
                border: '1px solid #ddd',
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <h3>{habit.title}</h3>
              <p>{habit.description}</p>
              <p>
                Goal: {habit.goal} | Streak: {streaks[habit._id] || 0}
              </p>

              <button onClick={() => incrementStreak(habit._id)} style={{ marginRight: 10 }}>
                +1 Streak
              </button>
              <button onClick={() => resetStreak(habit._id)} style={{ marginRight: 10 }}>
                Reset Streak
              </button>
              <button onClick={() => handleEdit(habit)} style={{ marginRight: 10 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(habit._id)} style={{ color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
