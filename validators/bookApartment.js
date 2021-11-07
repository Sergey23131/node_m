const Joi = require('joi');

const {EMAIL_REGEXP} = require('../configs/constants');

const bookingApartmentValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    phone: Joi
        .number()
        .required(),
});

module.exports = {
    bookingApartmentValidator
};
