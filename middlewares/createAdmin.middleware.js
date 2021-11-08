const Admin = require('../database/Admin');
const adminValidator = require('../validators/admin_validator');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    createAdminMiddleware: async (req, res, next) => {
        try {
            const {error,value} = adminValidator.adminValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const {email} = req.body;

            const loginInfo = await Admin.findOne({email});

            if (loginInfo) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST, errors_code.EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};