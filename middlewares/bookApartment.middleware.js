const Apartment = require('../database/Apartmens');
const O_Auth = require('../database/O_Auth');
const RentedApartment = require('../database/RentedApartmens');
const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    bookApartmentMiddleware: async (req, res, next) => {
        try {
            // Нужно добавить валидатор для даты снятия и добавить даты в RentedApartment

            const apartment_id = req.params;

            const apartment = await Apartment.findById({apartment_id});

            if (!apartment) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const isApartmentFree = RentedApartment.findById(apartment_id);

            if (isApartmentFree) {
                throw new ErrorHandler(errors_massage.WAS_BOOKED, errors_code.NOT_VALID);
            }

            const authInfo = await O_Auth.findOne(req.token);

            //const user = await User.findById(authInfo._id);Скорее всего не нужна вся инфа о юзере в базе брони

            const bookedApartment = await RentedApartment.create({apartment_id: apartment._id, user_id: authInfo._id});

            req.booked = bookedApartment;

            next();
        } catch (e) {
            next(e);
        }
    }
};