const {Schema, model} = require('mongoose');

const apartmentSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    square_feet: {
        type: Number,
        required: true,
        trim: true
    },
    numberOfPerson: {
        type: Number,
        required: true,
        trim: true
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('apartment', apartmentSchema);
