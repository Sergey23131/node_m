const Apartment = require('../database/Apartmens');
const bookApartment = require('../database/RentedApartmens');
const bookApartmentValidators = require('../validators/bookApartment');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    bookApartmentMiddleware: async (req, res, next) => {
        try {
            const {error, value} = bookApartmentValidators.bookingApartmentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const apartment_id = req.params;

            const apartment = await Apartment.findById({apartment_id});

            if (apartment) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const isApartmentExists = bookApartment.findById(apartment_id);

            if (isApartmentExists) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.EXIST);
            }

            await bookApartment.create({...req.body, apartmentInfo: apartment});

            next();
        } catch (e) {
            next(e);
        }
    }
};