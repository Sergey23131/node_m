const {AUTHORIZATION} = require('../configs/constants');
const O_Auth = require('../database/O_Auth');
const User = require('../database/Users');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    userPermissonMiddleware: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            const userId = tokenResponse.user_id.id;

            const user = await User.findOne({userId});

            if (!user) {
                throw new ErrorHandler(errors_massage.ACCESS, errors_code.NOT_VALID);
            }

            req.user_id = userId;

            next();
        } catch (e) {
            next(e);
        }
    }
};