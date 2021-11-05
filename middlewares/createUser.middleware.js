const User = require('../database/Users');
const userValidator = require('../validators/user_validator');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {error,value} = userValidator.userValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (loginInfo) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST, errors_code.EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};