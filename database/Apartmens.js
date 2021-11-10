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
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

apartmentSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('apartment', apartmentSchema);
