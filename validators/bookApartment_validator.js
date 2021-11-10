const Joi = require('joi');

const apartmentValidator = Joi.object({
    name: Joi
        .string()
        .trim()
        .required(),
    surname: Joi
        .string()
        .trim()
        .required(),
    phoneNumber: Joi
        .number()
        .required(),
    arrival_date: Joi
        .string()
        .trim()
        .required(),
    departure_day: Joi
        .string()
        .trim()
        .required(),
    numberOfPerson: Joi
        .number()
        .required(),

});

module.exports = {
    apartmentValidator
};
