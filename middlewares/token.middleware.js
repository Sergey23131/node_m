const O_Auth = require('../database/O_Auth');
const {jwtService} = require('../services');
const {AUTHORIZATION} = require('../configs/constants');
const {ACCESS, REFRESH} = require('../configs/tokenType');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token, ACCESS);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await O_Auth.findOneAndDelete({refresh_token: token});

            req.token = token;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },
};
