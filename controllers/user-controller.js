const {errors_massage, errors_code} = require('../errors');

module.exports = {

    createApartment: async (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json();
        } catch (e) {
            next(e);
        }

    },

    bookApartment: async (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json();
        } catch (e) {
            next(e);
        }

    },
}