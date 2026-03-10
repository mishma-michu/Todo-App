import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css';

function AddTask({ addTaskLocally }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;

    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { text });
      addTaskLocally(res.data);
      setText('');
    } catch {
      setError('Failed to add task');
    }
  };

  return (
    <>
      <form className="addTaskForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default AddTask;
