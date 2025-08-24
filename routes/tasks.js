const express = require('express');
const router = express.Router();
const { requireLogin, listTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/tasks', requireLogin, listTasks);
router.post('/tasks', requireLogin, createTask);
router.put('/tasks/:id', requireLogin, updateTask);
router.delete('/tasks/:id', requireLogin, deleteTask);

module.exports = router;
