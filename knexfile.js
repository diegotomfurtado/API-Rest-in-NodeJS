module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'root',
            database: 'firstapi',
        },
        migrations: {
            directory: 'src/migrations',
        },
    },
};