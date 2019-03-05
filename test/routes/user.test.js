const request = require('supertest');

const app = require('../../src/app');

test ('Should list all users', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
})

test('Should add a user with success', () => {
    const mail = `${Date.now()}@gmail.com`;
    return request(app).post('/users')
        .send({name: 'Antonio Citizens', mail, password: 'root'})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Antonio Citizens');
    });
})