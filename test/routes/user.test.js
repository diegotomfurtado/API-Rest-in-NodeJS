const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@gmail.com`;

// test ('Should list all users', () => {
//     return request(app).get('/users')
//         .then((res) => {
//             expect(res.status).toBe(200);
//             expect(res.body.length).toBeGreaterThan(0);
//         });
// })

test('Should add a user with success', () => {
    return request(app).post('/users')
        .send({name: 'Antonio Citizens', mail, password: 'root'})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Antonio Citizens');
    });
})

//Three ways to work with async tests

//First Strategy
test('Should not insert a user without name', () => {
    return request(app).post('/users')
        .send({mail: 'anything@gmail.com', password: 'root'})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Name is required!');
        })
        .catch(err => done.fail(err));
});

//Second Strategy: using awaiting
test ('Should not insert a user withou email', async () => {
    const result = await request(app).post('/users')
        .send({name: 'Diego Furtado', password: 'root'});
        expect(result.status).toBe(400);
        expect(result.body.error).toBe('Email is required!');
});

//Third Strategy
test ('Should not insert a user without password', (done) => {
    request(app).post('/users')
        .send({name: 'Diego Furtado', mail: 'diegotomfurtado@gmail.com'})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Password is required!');
            done();
        });
});

test ('Should not insert a user with existing name', () => {
    return request(app).post('/users')
        .send({name: 'Antonio Citizens', mail, password: 'root'})
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('User already exists!');
    });
});