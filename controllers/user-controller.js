const {errors_massage, errors_code} = require('../errors');

module.exports = {

    createApartment: async (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(req.apartment);
        } catch (e) {
            next(e);
        }
    },

    bookApartment: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(req.booked);
        } catch (e) {
            next(e);
        }
    },

    updateApartment: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(req.booked);
        } catch (e) {
            next(e);
        }
    },

    bookApartment: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(req.booked);
        } catch (e) {
            next(e);
        }
    },
}