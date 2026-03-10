import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch {
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTaskLocally = newTask => {
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskLocally = updatedTask => {
    setTasks(prev =>
      prev.map(task =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const removeTaskLocally = taskId => {
    setTasks(prev => prev.filter(task => task._id !== taskId));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <AddTask addTaskLocally={addTaskLocally} />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <TaskList
        tasks={tasks}
        updateTaskLocally={updateTaskLocally}
        removeTaskLocally={removeTaskLocally}
      />
    </div>
  );
}

export default App;
