// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
	// Check if title is provided
	if (!req.body.title) {
	  return res.status(400).json({ message: "Title is required" });
	}
  
	// Check if status is provided
	if (!req.body.status) {
	  return res.status(400).json({ message: "Status is required" });
	}
  
	const task = new Task({
	  title: req.body.title,
	  description: req.body.description,
	  status: req.body.status,
	});
  
	try {
	  const newTask = await task.save();
	  res.status(201).json(newTask);
	} catch (error) {
	  res.status(400).json({ message: error.message });
	}
  });
  

// Update task status
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = req.body.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
	  const task = await Task.findById(req.params.id);
	  console.log(task,req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
