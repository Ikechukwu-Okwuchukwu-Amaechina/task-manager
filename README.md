# Task Manager

Simple task manager built with Node.js and Express. It supports session-based authentication and a minimal frontend. Users and tasks are stored in JSON files to keep things easy to run and learn from.

## Tech stack

- Runtime: Node.js (14+)
- Framework: Express
- Auth/session: express-session (cookie-based sessions)
- Storage: JSON files (`users.json`, `tasks.json`)
- Frontend: Static HTML/CSS/JS in `public/`
- Testing: Jest + Supertest

## Features

- Sign up, log in, and log out (session maintained via cookie)
- CRUD tasks (title, description, priority, completed)
- Each user sees only their own tasks
- Static demo UI at `http://localhost:3000`

## Setup

Prerequisite: Install Node.js LTS from https://nodejs.org

Clone and install dependencies:

```powershell
git clone https://github.com/Ikechukwu-Okwuchukwu-Amaechina/task-manager.git
cd task-manager
npm install
```

Run the server (default port 3000):

```powershell
npm start
```

Optional: Set a custom port before starting (e.g., 4000):

```powershell
$env:PORT=4000; npm start
```

Then open the demo UI at: http://localhost:3000

## Usage (Postman examples)

Base URL: `http://localhost:3000/api`

Tip: Keep Postman’s cookie jar enabled so the session cookie from `/login` is sent on subsequent requests.

1) Sign up
- Method: POST
- URL: `http://localhost:3000/api/signup`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
	{
		"username": "alice",
		"password": "password123"
	}
- Expected response: `{ "success": true }`

2) Log in
- Method: POST
- URL: `http://localhost:3000/api/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
	{
		"username": "alice",
		"password": "password123"
	}
- Expected response: `{ "success": true, "user": { "id": "...", "username": "alice" } }`
- Note: Postman will store the session cookie automatically.

3) List tasks (requires session)
- Method: GET
- URL: `http://localhost:3000/api/tasks`
- Expected response: `[]` (initially)

4) Create a task
- Method: POST
- URL: `http://localhost:3000/api/tasks`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
	{
		"title": "Buy milk",
		"description": "2 liters of whole milk",
		"priority": "High" // optional: High | Medium | Low (defaults to Low)
	}
- Expected response: a task object with `id`, `userId`, and the fields you sent

5) Update a task
- Method: PUT
- URL: `http://localhost:3000/api/tasks/:id`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
	{
		"title": "Buy milk and bread",
		"completed": true
	}
- Expected response: the updated task object

6) Delete a task
- Method: DELETE
- URL: `http://localhost:3000/api/tasks/:id`
- Expected response: `{ "success": true }`

7) Log out
- Method: POST
- URL: `http://localhost:3000/api/logout`
- Expected response: `{ "success": true }`

After logout, authenticated endpoints (like `/tasks`) return `401`.

## Frontend (optional)

- `index.html`: Login page
- `dashboard.html`: Simple task dashboard
- `script.js`: Handles login, list/create/update/delete from the browser

Steps:
1. Start the server: `npm start`
2. Visit `http://localhost:3000`
3. Sign up, log in, and manage tasks from the dashboard

## Tests

Run all tests:

```powershell
npm test
```

## Contributors

- Ikechukwu Okwuchukwu Amaechina

## License

MIT — see `LICENSE` for details.


