const userRoles = require('../configs/user_roles');
const {Schema, model} = require('mongoose');
const passwordService = require('../services/password.service');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.ADMIN,
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

adminSchema.statics = {
    async createHashPassword(adminObject) {
        const hashedPassword = await passwordService.hash(adminObject.password);

        return this.create({...adminObject, password: hashedPassword});
    },
};

module.exports = model('admin', adminSchema);