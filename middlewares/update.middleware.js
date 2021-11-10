const Apartment = require('../database/Apartmens');
const updateValidator = require('../validators/update.validators');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    updateMiddleware: async (req, res, next) => {
        try {
            const {error, value} = updateValidator.updateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const apartment_id = req.params.apartment_id;

            await Apartment.findByIdAndUpdate(apartment_id, req.body);

            next();
        } catch (e) {
            next(e);
        }
    },
}