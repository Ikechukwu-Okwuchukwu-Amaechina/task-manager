const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '..', 'users.json');

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

function signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const users = readJSON(USERS_FILE);
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'user exists' });
  const user = { id: Date.now().toString(), username, password };
  users.push(user);
  writeJSON(USERS_FILE, users);
  res.json({ success: true });
}

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ error: 'invalid credentials' });
  req.session.user = { id: user.id, username: user.username };
  res.json({ success: true, user: req.session.user });
}

function logout(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'logout failed' });
    res.json({ success: true });
  });
}

module.exports = { signup, login, logout };
