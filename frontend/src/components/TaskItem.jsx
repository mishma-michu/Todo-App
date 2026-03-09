import React, { useState } from 'react';
import axios from 'axios';
import './TaskItem.css';

function TaskItem({ task, updateTaskLocally, removeTaskLocally }) {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleComplete = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          completed: !task.completed,
        }
      );
      updateTaskLocally(res.data);
    } catch {
      setError('Failed to update task');
    }
    setLoading(false);
  };

  const saveEdit = async () => {
    if (!newText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          text: newText,
        }
      );
      updateTaskLocally(res.data);
      setEditMode(false);
    } catch {
      setError('Failed to edit task');
    }
    setLoading(false);
  };

  const deleteTask = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      removeTaskLocally(task._id);
    } catch {
      setError('Failed to delete task');
    }
    setLoading(false);
  };

  return (
    <>
      <li className="taskItem">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          disabled={loading}
        />

        {editMode ? (
          <input
            type="text"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            disabled={loading}
          />
        ) : (
          <span className={task.completed ? 'completed' : ''}>{task.text}</span>
        )}

        {editMode ? (
          <button onClick={saveEdit} disabled={loading}>
            Save
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} disabled={loading}>
            Edit
          </button>
        )}

        <button onClick={deleteTask} disabled={loading}>
          Delete
        </button>
      </li>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default TaskItem;
