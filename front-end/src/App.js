// App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import api from './services/api';
import Facebookicon from './bg';
import './ram.css'
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await api.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

	const handleTaskDeleted = (taskId) => {
	  console.log(taskId,'APpks')
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleFilterChange = (selectedStatus) => {
    setFilteredStatus(selectedStatus);
  };

  const filteredTasks = filteredStatus === 'All' ? tasks : tasks.filter((task) => task.status === filteredStatus);

  return (
    <div className='rajiv' >
     
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskFilter onFilterChange={handleFilterChange} />
      <TaskList tasks={filteredTasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
    </div>
  );
};

export default App;
