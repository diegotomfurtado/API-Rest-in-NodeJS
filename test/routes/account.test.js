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

test ('Should not create an account without name', () => {
    return request(app).post(MAIN_ROUTE)
        .send({
            user_id: user.id
        })
        .then((result) => {
            expect(result.status).toBe(400);
            expect(result.body.error).toBe('Name is required!');
        });
});

test('Should list all existing accounts', () => {
    return app.db('accounts')
        .insert({
            name: 'Diego Furtado - Listing an account',
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
            name: 'Diego Furtado - Returning an account',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Diego Furtado - Returning an account');
            expect(res.body.user_id).toBe(user.id);
        });
});

test ('Should update an account', () => {
    return app.db('accounts')
        .insert({
            name: 'Diego Furtado - Updating an account',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
            .send({name: 'Diego Furtado - Updated an account'}))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Diego Furtado - Updated an account');
        });
});

test ('Should remove an account', () => {
    return app.db('accounts')
        .insert({
            name: 'Diego Furtado - Removing an account',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
        .then((res) => {
            expect(res.status).toBe(204); //204, there is no content
        });
});