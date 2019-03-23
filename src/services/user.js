const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    };

    const save = async (user) => {
        if (!user.name) throw new ValidationError ('Name is required!');
        if (!user.mail) throw new ValidationError ('Email is required!');
        if (!user.password) throw new ValidationError ('Password is required!');
        
        const userDb = await findAll({mail: user.mail});
        if (userDb && userDb.length > 0)
            throw new ValidationError ('User already exists!');

        return app.db('users').insert(user, '*');
    }

    return {findAll, save};
};