const Apartment = require('../database/Apartmens');
const User = require('../database/Users');
const apartmentValidator = require('../validators/apartment_validators');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    createApartmentMiddleware: async (req, res, next) => {
        try {
            const {error, value} = apartmentValidator.apartmentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const user_id = req.params;

            const user = await User.findById({user_id});

            if (user) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            await Apartment.create({...req.body, userId: user_id});

            next();
        } catch (e) {
            next(e);
        }
    }
};