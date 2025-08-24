const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');

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

function ensureFiles() {
  if (!fs.existsSync(USERS_FILE)) writeJSON(USERS_FILE, []);
  if (!fs.existsSync(TASKS_FILE)) writeJSON(TASKS_FILE, []);
}

module.exports = {
  USERS_FILE,
  TASKS_FILE,
  readJSON,
  writeJSON,
  ensureFiles
};
