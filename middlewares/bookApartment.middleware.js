const Apartment = require('../database/Apartmens');
const O_Auth = require('../database/O_Auth');
const RentedApartment = require('../database/RentedApartmens');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');
const apartmentValidator = require('../validators/bookApartment_validator');

module.exports = {
    bookApartmentMiddleware: async (req, res, next) => {
        try {
            const {error, value} = apartmentValidator.apartmentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const apartment_id = req.params.apartment_id;


            const apartment = await Apartment.findOne({apartment_id});

            if (!apartment) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const bookedApartment = await RentedApartment.create({
                ...req.body,
                apartment_id: apartment._id,
                user_id: req.user_id
            });

            req.booked = bookedApartment;

            next();
        } catch (e) {
            next(e);
        }
    }
};