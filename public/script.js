// Very simple client to handle login and tasks.
async function postJson(url, body) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const username = fd.get('username');
    const password = fd.get('password');
    const res = await postJson('/api/login', { username, password });
    if (res.success) {
      window.location = '/dashboard.html';
    } else {
      alert(res.error || 'login failed');
    }
  });
}

// Task page logic
const taskForm = document.getElementById('taskForm');
const tasksDiv = document.getElementById('tasks');

function renderTask(task) {
  const el = document.createElement('div');
  el.className = 'task ' + (task.priority === 'High' ? 'priority-high' : task.priority === 'Medium' ? 'priority-medium' : 'priority-low');
  el.innerHTML = `<strong>${task.title}</strong> <button data-id="${task.id}" class="del">Del</button> <button data-id="${task.id}" class="toggle">Toggle</button><div>${task.description}</div>`;
  return el;
}

async function loadTasks() {
  const res = await fetch('/api/tasks');
  if (res.status === 401) return window.location = '/';
  const tasks = await res.json();
  tasksDiv.innerHTML = '';
  tasks.forEach(t => tasksDiv.appendChild(renderTask(t)));
}

if (taskForm) {
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(taskForm);
    const title = fd.get('title');
    const description = fd.get('description');
    const priority = fd.get('priority');
    await postJson('/api/tasks', { title, description, priority });
    taskForm.reset();
    loadTasks();
  });

  tasksDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del')) {
      const id = e.target.dataset.id;
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      loadTasks();
    }
    if (e.target.classList.contains('toggle')) {
      const id = e.target.dataset.id;
      // very simple toggle: fetch current tasks to find completed state
      const resp = await fetch('/api/tasks');
      const tasks = await resp.json();
      const t = tasks.find(x => x.id === id);
      if (t) {
        await fetch(`/api/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !t.completed }) });
        loadTasks();
      }
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await postJson('/api/logout', {});
    window.location = '/';
  });

  // initial load
  loadTasks();
}
