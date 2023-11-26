const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const { mongoose } = require('mongoose');

describe('Testing Tasks APis', () => {
    beforeAll(async () => {
        try {
            const mongoServer = await MongoMemoryServer.create();

            await mongoose.connect(mongoServer.getUri());

            const res = await request(app).get('/api/v1/populate/tasks');
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('GET /api/v1/task', () => {
        test('should respond with a 200 status code', async () => {
            const res = await request(app).get('/api/v1/task');
            expect(res.statusCode).toBe(200);

            // Check status property
            expect(res.body.status).toBe('success');
            expect(res.body.tasks).toBeInstanceOf(Array);

            // Check each task in the array
            res.body.tasks.forEach((task) => {
                expect(task).toHaveProperty('_id');
                expect(task).toHaveProperty('title');
                expect(task).toHaveProperty('description');
                expect(task).toHaveProperty('assigned_user');
                expect(task).toHaveProperty('createdBy');
                expect(task).toHaveProperty('due_date');
                expect(task).toHaveProperty('completion');
                expect(task).toHaveProperty('createdAt');
                expect(task).toHaveProperty('updatedAt');
                expect(task).toHaveProperty('id');
            });
        });
        describe('Testing API features of GET /api/v1/task', () => {
            test('Tasks should have title and due_date as property property', async () => {
                const res = await request(app).get(
                    '/api/v1/task?page=1&limit=5&fields=title,due_date'
                );
                expect(res.statusCode).toBe(200);

                // Check status property
                expect(res.body.status).toBe('success');
                expect(res.body.tasks).toBeInstanceOf(Array);

                // Check length property
                expect(res.body.length).toBe(5);

                // Check each task in the array
                res.body.tasks.forEach((task) => {
                    expect(task).toHaveProperty('_id');
                    expect(task).toHaveProperty('title');
                    expect(task).toHaveProperty('due_date');
                    expect(task).toHaveProperty('id');
                    expect(task).not.toHaveProperty('description');
                    expect(task).not.toHaveProperty('assigned_user');
                    expect(task).not.toHaveProperty('createdBy');
                    expect(task).not.toHaveProperty('completion');
                    expect(task).not.toHaveProperty('createdAt');
                    expect(task).not.toHaveProperty('updatedAt');
                });
            });

            test('should respond with 5 tasks and a 200 status code ', async () => {
                const res = await request(app).get(
                    '/api/v1/task?page=1&limit=5'
                );
                expect(res.statusCode).toBe(200);

                // Check status property
                expect(res.body.status).toBe('success');
                expect(res.body.tasks).toBeInstanceOf(Array);

                // Check length property
                expect(res.body.length).toBe(5);

                // Check each task in the array
                res.body.tasks.forEach((task) => {
                    expect(task).toHaveProperty('_id');
                    expect(task).toHaveProperty('title');
                    expect(task).toHaveProperty('description');
                    expect(task).toHaveProperty('assigned_user');
                    expect(task).toHaveProperty('createdBy');
                    expect(task).toHaveProperty('due_date');
                    expect(task).toHaveProperty('completion');
                    expect(task).toHaveProperty('createdAt');
                    expect(task).toHaveProperty('updatedAt');
                    expect(task).toHaveProperty('id');
                });
            });
        });
    });
});
