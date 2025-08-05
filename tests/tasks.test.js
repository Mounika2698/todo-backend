const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

describe('Task API', () => {
    beforeEach(async () => {
        await Task.deleteMany({});
    });

    // Test 1: Create a new task
    test('POST /api/tasks - should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'Test task' });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Test task');
        expect(response.body.completed).toBe(false);
    });

    // Test 2: Delete a task
    test('DELETE /api/tasks/:id - should delete a task', async () => {
        const task = await Task.create({ title: 'Task to delete' });

        const response = await request(app)
            .delete(`/api/tasks/${task._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Task deleted');

        const deletedTask = await Task.findById(task._id);
        expect(deletedTask).toBeNull();
    });
});