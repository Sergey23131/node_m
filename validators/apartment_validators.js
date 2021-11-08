const Joi = require('joi');

const apartmentValidator = Joi.object({
    title: Joi
        .string()
        .trim()
        .required(),
    country: Joi
        .string()
        .trim()
        .required(),
    city: Joi
        .string()
        .trim()
        .required(),
    region: Joi
        .string()
        .trim()
        .required(),
    square_feet: Joi
        .number()
        .required(),
    numberOfPerson: Joi
        .number()
        .required(),

});

module.exports = {
    apartmentValidator
};
