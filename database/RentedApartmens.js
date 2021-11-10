const {Schema, model} = require('mongoose');

const rentedApartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    arrival_date: {
        type: String,
        required: true,
        trim: true
    },
    departure_day: {
        type: String,
        required: true,
        trim: true
    },
    numberOfPerson: {
        type: Number,
        required: true,
        trim: true
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'apartment'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('rentedApartment', rentedApartmentSchema);
