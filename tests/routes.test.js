const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const DATA_DIR = path.join(__dirname, '..');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');

function resetFiles() {
  fs.writeFileSync(USERS_FILE, '[]');
  fs.writeFileSync(TASKS_FILE, '[]');
}

beforeEach(() => {
  resetFiles();
});

afterAll(() => {
  resetFiles();
});

describe('API Auth and Tasks', () => {
  test('signup, login, create/read/update/delete task, logout', async () => {
    const agent = request.agent(app);

    // signup
    const signupRes = await agent.post('/api/signup').send({ username: 'test1', password: 'pass' });
    expect(signupRes.status).toBe(200);
    expect(signupRes.body.success).toBe(true);

    // login
    const loginRes = await agent.post('/api/login').send({ username: 'test1', password: 'pass' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);

    // create task
    const taskRes = await agent.post('/api/tasks').send({ title: 't1', description: 'd1', priority: 'High' });
    expect(taskRes.status).toBe(200);
    expect(taskRes.body.title).toBe('t1');
    const taskId = taskRes.body.id;

    // get tasks
    const listRes = await agent.get('/api/tasks');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(1);

    // update task
    const updRes = await agent.put(`/api/tasks/${taskId}`).send({ title: 't1-upd', completed: true });
    expect(updRes.status).toBe(200);
    expect(updRes.body.title).toBe('t1-upd');
    expect(updRes.body.completed).toBe(true);

    // delete task
    const delRes = await agent.delete(`/api/tasks/${taskId}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body.success).toBe(true);

    // confirm empty
    const afterDel = await agent.get('/api/tasks');
    expect(afterDel.status).toBe(200);
    expect(afterDel.body.length).toBe(0);

    // logout
    const logoutRes = await agent.post('/api/logout');
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);

    // after logout, accessing tasks should fail
    const noAuth = await agent.get('/api/tasks');
    expect(noAuth.status).toBe(401);
  }, 20000);
});
