const express = require('express');
const { getAllTasks, createTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
