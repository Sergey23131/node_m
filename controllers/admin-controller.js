const Admin = require('../database/Admin');
const Manager = require('../database/Manager');
const User = require('../database/Users');
const O_Auth = require('../database/O_Auth');
const {errors_massage, errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await User.find();

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getAdmins: async (req, res, next) => {
        try {
            const allAdmins = await Admin.find();

            res.json(allAdmins);
        } catch (e) {
            next(e);
        }
    },

    getManagers: async (req, res, next) => {
        try {
            const allManagers = await Manager.find();

            res.json(allManagers);
        } catch (e) {
            next(e);
        }
    },

    createAdmin: async (req, res, next) => {
        try {
            const newAdmin = await Admin.createHashPassword(req.body);

            res.status(errors_code.UPDATE_DATA).json(newAdmin);
        } catch (e) {
            next(e);
        }
    },

    createManager: async (req, res, next) => {
        try {
            const newManager = await Manager.createHashPassword(req.body);

            res.status(errors_code.UPDATE_DATA).json(newManager);
        } catch (e) {
            next(e);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.user.id) || await Manager.findByIdAndDelete(req.user.id);
            await O_Auth.findOneAndDelete(req.token);

            res.status(errors_code.REMOVE).json(errors_massage.REMOVE_USER);
        } catch (e) {
            next(e);
        }
    },
}