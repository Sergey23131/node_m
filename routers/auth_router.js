const authRouter = require('express').Router();

const {authController} = require('../controllers');

const createUserMiddleware = require('../middlewares/createUser.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

authRouter.post('/logIn', loginMiddleware.loginMiddleware, authController.authUser);

authRouter.post('/registration', createUserMiddleware.createUserMiddleware, authController.createUser);

authRouter.delete('/logout', tokenMiddleware.checkAccessToken, authController.logOut);

authRouter.post('/refresh', tokenMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = authRouter;

