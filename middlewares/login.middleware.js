const User = require('../database/Users');
const Manager = require('../database/Manager');
const Admin = require('../database/Admin');
const loginValidator = require('../validators/login_validator');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    loginMiddleware: async (req, res, next) => {
        try {

            const {error} = loginValidator.userLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }


            const {email} = req.body;

            const loginInfo = await User.findOne({email}) || await Admin.findOne({email}) || await Manager.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.user = loginInfo;

            next();
        } catch (e) {
            next(e);
        }
    },
}