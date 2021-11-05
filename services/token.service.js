const jwt = require('jsonwebtoken');

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_FORGOT_PASSWORD} = require('../configs/config');
const {ACCESS, ACTION, REFRESH} = require('../configs/tokenType');
const {ErrorHandler, errors_massage, errors_code} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenTypes = ACCESS) => {
        try {
            let secret;

            switch (tokenTypes) {
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case ACTION:
                    secret = JWT_FORGOT_PASSWORD;
                    break;
                default:
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
        }
    }
};
