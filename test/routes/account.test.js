const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
     const res = await app.services.user.save({
        name: 'Diego Furtado',
        mail: `${Date.now()}@gmail.com`,
        password: 'root'
    });
    user = { ...res[0] };
});

test('Should add an accounts with success', () => {
    return request(app).post(MAIN_ROUTE)
        .send({
            name: 'Acc #01',
            user_id: user.id
        })
        .then((result) => {
            expect(result.status).toBe(201);
            expect(result.body.name).toBe('Acc #01');
        });
});

test('Should list all existing accounts', () => {
    return app.db('accounts')
        .insert({
            name: 'Diego Furtado',
            user_id: user.id
        })
        .then(() => request(app).get(MAIN_ROUTE))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test ('Should return one account by id', () => {
    return app.db('accounts')
        .insert({
            name: 'Diego Furtado',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Diego Furtado');
            expect(res.body.user_id).toBe(user.id);
        });
});