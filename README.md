# Task Manager

A beginner-friendly Node.js project for managing tasks. Use this as a starter to learn core Node.js concepts while building a simple task manager (add, list, update, delete tasks).

## Features

- Add new tasks
- List all tasks
- Update an existing task
- Delete tasks you no longer need


Note: This repository is a minimal Node.js starter. You can implement the features one by one as you learn.

## Installation & Usage

Prerequisites:
- Node.js (LTS is recommended). If you don’t have it, download from https://nodejs.org

# Task Manager

A lightweight, beginner-friendly Node.js task manager with session-based authentication and a simple frontend.

This repo stores users and tasks as JSON files and exposes a small REST API plus a static frontend under `/public`.

## Quick status

- Entry point: `server.js` (exports the Express `app` and starts the server only when run directly)
- API routes under `/api` (see API section)
- Frontend served from `/public` (login page and dashboard)

## Features

- User signup / login with server-side sessions (express-session)
- Create, list, update, and delete tasks (each task belongs to a user)
- Minimal static frontend for demoing the API (served from `public/`)

## Requirements

- Node.js 14+ (LTS recommended)

## Install

Clone and install:

```powershell
git clone https://github.com/Ikechukwu-Okwuchukwu-Amaechina/task-manager.git
cd task-manager
npm install
```

## Run the app

Start in development:

```powershell
npm start
```

This runs `node server.js`. The server will listen on `PORT` (default 3000).

Note for beginners: `server.js` exports the Express `app` so automated tests (or tools like `supertest`) can `require('./server')` without starting a real listener. When you run `node server.js` directly the server will start and log the listening URL.

## Tests

Unit/integration tests use Jest + Supertest. Run:

```powershell
npm test
```

If tests import the server, they will get the Express `app` object (not a running listener), which avoids race conditions and "log after tests are done" warnings.

## API Endpoints

Base path: `/api`

- POST `/api/signup` — body: { username, password } — creates a user
- POST `/api/login` — body: { username, password } — logs in and sets session
- POST `/api/logout` — logs out (destroys session)

- GET `/api/tasks` — returns tasks for the logged-in user (requires session)
- POST `/api/tasks` — create a task: { title, description?, priority? }
- PUT `/api/tasks/:id` — update a task (title, description, priority, completed)
- DELETE `/api/tasks/:id` — delete task

Responses are JSON. Endpoints that require authentication return 401 when no session is present.

Data storage: `users.json` and `tasks.json` in the repository root. This is intentionally simple for learning.

## Frontend (demo)

Static pages are in `public/`:
- `index.html` — login page
- `dashboard.html` — tasks dashboard
- `script.js` — client JS (handles login, task create/list/update/delete)

Recent frontend updates made:

- The task toggle button was fixed to correctly find tasks irrespective of `id` type (string vs number). The toggle now compares IDs as strings to avoid type mismatches.
- The task renderer now shows a `(done)` label and adds a `completed` class to completed tasks so they can be styled via CSS.

How to use the frontend:

1. Start the server: `npm start` (or `node server.js`)
2. Open `http://localhost:3000` in your browser
3. Create a user via signup, log in, then go to the dashboard to add and toggle tasks



## Author

Ikechukwu Okwuchukwu Amaechina


