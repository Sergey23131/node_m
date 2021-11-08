const {AUTHORIZATION} = require('../configs/constants');
const O_Auth = require('../database/O_Auth');
const Manager = require('../database/Manager');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    managerPermissonMiddleware: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            const userId = tokenResponse.user_id.id;

            const admin = await Manager.findOne({userId});

            if (!admin) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST, errors_code.EXIST);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};