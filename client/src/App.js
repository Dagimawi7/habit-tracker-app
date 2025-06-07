import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // State to store list of habits fetched from backend
  const [habits, setHabits] = useState([]);

  // State for new habit inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('Daily');

  // State to show loading status while fetching data
  const [loading, setLoading] = useState(false);

  // Fetch habits once component mounts
  useEffect(() => {
    fetchHabits();
  }, []);

  // Fetch habits from backend API
  const fetchHabits = async () => {
    setLoading(true); // show loading
    try {
      const res = await axios.get('http://localhost:5000/api/habits');
      setHabits(res.data); // update habits state with response data
    } catch (err) {
      alert('Error fetching habits'); // show error if request fails
    }
    setLoading(false); // hide loading
  };

  // Handle form submit to create new habit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title is not empty
    if (!title) return alert('Title is required');

    try {
      // Send POST request to backend with new habit data
      const res = await axios.post('http://localhost:5000/api/habits', {
        title,
        description,
        goal,
      });

      // Add newly created habit to habits list
      setHabits([...habits, res.data]);

      // Reset form fields
      setTitle('');
      setDescription('');
      setGoal('Daily');
    } catch (err) {
      alert('Error creating habit'); // show error if request fails
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Habit Tracker</h1>
      <p><i>Small daily practice + consistency = Success</i></p>

      {/* Form to add new habit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // update title state
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // update description state
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)} // update goal state
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
        <button type="submit" style={{ padding: 10, width: '100%' }}>Add Habit</button>
      </form>

      {/* Display loading or habits list */}
      {loading ? (
        <p>Loading habits...</p>
      ) : (
        habits.length === 0 ? (
          <p>No habits yet.</p>
        ) : (
          <ul>
            {habits.map((habit) => (
              <li key={habit._id} style={{ marginBottom: 10 }}>
                <strong>{habit.title}</strong> - {habit.description} ({habit.goal}) - Streak: {habit.streak}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default App;
