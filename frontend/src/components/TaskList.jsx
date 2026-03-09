import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, updateTaskLocally, removeTaskLocally }) {
  return (
    <ul className="taskList">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          updateTaskLocally={updateTaskLocally}
          removeTaskLocally={removeTaskLocally}
        />
      ))}
    </ul>
  );
}

export default TaskList;
