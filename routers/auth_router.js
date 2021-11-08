const adminRouter = require('express').Router();

const {authController} = require('../controllers');

const createUserMiddleware = require('../middlewares/createUser.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

adminRouter.post('/logIn', loginMiddleware.loginMiddleware, authController.authUser);

adminRouter.post('/registration', createUserMiddleware.createUserMiddleware, authController.createUser);

adminRouter.delete('/logout', tokenMiddleware.checkAccessToken, authController.logOut);

adminRouter.post('/refresh', tokenMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = adminRouter;

