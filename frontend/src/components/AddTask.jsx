import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css';

function AddTask({ fetchTasks }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/tasks', { text });
      setText('');
      fetchTasks();
    } catch {
      setError('Failed to add task');
    }

    setLoading(false);
  };

  return (
    <>
      <form className="addTaskForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default AddTask;
