const request = require('supertest');

const app = require('../src/app');

test ('Should list all users', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('name', 'Diego Furtado');
        });
})

test('Should add a user with success', () =>{
    return request(app).post('/users')
        .send({name: 'Antonio Citizens', mail: 'antonio@citizens.com'})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Antonio Citizens');
    });
})