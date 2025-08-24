const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: 'dev-secret',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
}));

// API
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
