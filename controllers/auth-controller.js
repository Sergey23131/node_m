const User = require('../database/Users');
const Manager = require('../database/Manager');
const Admin = require('../database/Admin');
const O_Auth = require('../database/O_Auth');
const {WELCOME} = require('../configs/email.actions');
const {jwtService, passwordService,emailService} = require('../services');
const {errors_code} = require('../errors');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const {password} = req.body;

            const hashPassword = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await passwordService.compare(password, hashPassword.password);

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            const oneUser = await User.findById(req.user.id).select('-password') ||
                await Manager.findById(req.user.id).select('-password') ||
                await Admin.findById(req.user.id).select('-password');

            res.json({
                user: oneUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            await O_Auth.findOneAndDelete(req.token);

            res.json('logOut');
        } catch (e) {
            next(e);
        }

    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await User.createHashPassword(req.body);

            await emailService.sendMail(newUser.email, WELCOME, {userName: newUser.name,userSurname:newUser.surname});

            res.status(errors_code.UPDATE_DATA).json(newUser);
        } catch (e) {
            next(e);
        }

    },

    refreshToken: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            res.json({
                user: req.user,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },
};
