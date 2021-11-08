const Apartment = require('../database/Apartmens');
const User = require('../database/Users');
const O_Auth = require('../database/O_Auth');
const apartmentValidator = require('../validators/apartment_validators');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    createApartmentMiddleware: async (req, res, next) => {
        try {
            const {error, value} = apartmentValidator.apartmentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const user = await O_Auth.findOne(req.token);

            if (!user) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            const newApartment = await Apartment.create({...req.body, userId: user._id});

            req.apartment = newApartment;

            next();
        } catch (e) {
            next(e);
        }
    }
};