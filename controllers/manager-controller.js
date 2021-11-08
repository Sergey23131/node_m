const Apartment = require('../database/Apartmens');
const Manager = require('../database/Manager');
const User = require('../database/Users');
const O_Auth = require('../database/O_Auth');
const {errors_massage, errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await User.find().select('-password');

            res.json(allUsers);
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

    deleteAccount: async (req, res, next) => {
        try {
            const {id} = req.body;

            await User.findByIdAndDelete(id) || await Manager.findByIdAndDelete(id);
            await O_Auth.findByIdAndDelete(id);

            res.status(errors_code.REMOVE).json(errors_massage.REMOVE_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteApartmentPost: async (req, res, next) => {
        try {
            const {id} = req.body;

            await Apartment.findByIdAndDelete(id);

            res.status(errors_code.REMOVE).json(errors_massage.REMOVE_USER);
        } catch (e) {
            next(e);
        }
    },
}