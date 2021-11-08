const userRoles = require('../configs/user_roles');
const {Schema, model} = require('mongoose');
const passwordService = require('../services/password.service');

const managerSchema = new Schema({
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
        default: userRoles.MANAGER,
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

managerSchema.statics = {
    async createHashPassword(managerObject) {
        const hashedPassword = await passwordService.hash(managerObject.password);

        return this.create({...managerObject, password: hashedPassword});
    },
};

module.exports = model('manager', managerSchema);