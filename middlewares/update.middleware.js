const User = require('../database/Users');
const Manager = require('../database/Manager');
const Admin = require('../database/Admin');
const loginValidator = require('../validators/login_validator');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    updateMiddleware: async (req, res, next) => {
        try {

            const user_id = req.user_id;


            next();
        } catch (e) {
            next(e);
        }
    },
}