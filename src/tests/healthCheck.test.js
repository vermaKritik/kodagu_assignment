const request = require('supertest');
const app = require('../app');

describe('GET /health-check', () => {
    test('Health check passed', async () => {
        const res = await request(app).get('/health-check');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.msg).toEqual('Health check passed');
    });
});
