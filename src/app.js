const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');

// TODO create dynamic switching
app.db = knex(knexfile.test);

app.get('/users', (req, res) => {
    res.status(200).send('H4ck3r by 0wn')
});



consign({ cwd: 'src', verbose: false})
    .include('./config/middlewares.js')
    .then('./services')
    .then('./routes')
    .then('./config/routes.js')
    .into(app);

app.get('/', (req, res) => {
    res.status(200)
    .send();
});

module.exports = app;