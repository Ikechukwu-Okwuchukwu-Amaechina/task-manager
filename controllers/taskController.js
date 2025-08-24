const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

function readJSON(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('readJSON error', err);
    return [];
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('writeJSON error', err);
  }
}

function requireLogin(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

function listTasks(req, res) {
  const tasks = readJSON(TASKS_FILE).filter(t => t.userId === req.session.user.id);
  res.json(tasks);
}

function createTask(req, res) {
  const { title, description, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const tasks = readJSON(TASKS_FILE);
  const task = {
    id: Date.now().toString(),
    userId: req.session.user.id,
    title,
    description: description || '',
    priority: priority || 'Low',
    completed: false
  };
  tasks.push(task);
  writeJSON(TASKS_FILE, tasks);
  res.json(task);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;
  const tasks = readJSON(TASKS_FILE);
  const idx = tasks.findIndex(t => t.id === id && t.userId === req.session.user.id);
  if (idx === -1) return res.status(404).json({ error: 'task not found' });
  const task = tasks[idx];
  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.priority = priority !== undefined ? priority : task.priority;
  task.completed = completed !== undefined ? completed : task.completed;
  tasks[idx] = task;
  writeJSON(TASKS_FILE, tasks);
  res.json(task);
}

function deleteTask(req, res) {
  const { id } = req.params;
  let tasks = readJSON(TASKS_FILE);
  const before = tasks.length;
  tasks = tasks.filter(t => !(t.id === id && t.userId === req.session.user.id));
  if (tasks.length === before) return res.status(404).json({ error: 'task not found' });
  writeJSON(TASKS_FILE, tasks);
  res.json({ success: true });
}

module.exports = { requireLogin, listTasks, createTask, updateTask, deleteTask };
