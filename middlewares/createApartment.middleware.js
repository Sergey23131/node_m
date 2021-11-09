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

            //const user_id = req.user_id;
           /* const token = req.token;

            const user = await O_Auth.findOne({token});

            if (!user) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }
*/
            console.log( req.user_id);

            const newApartment = await Apartment.create({...req.body, user_id: req.user_id});

            console.log(newApartment);

            req.apartment = newApartment;

            next();
        } catch (e) {
            next(e);
        }
    }
};