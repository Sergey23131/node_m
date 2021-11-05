const router = require('express').Router();

const {authController} = require('../controllers');

const createUserMiddleware = require('../middlewares/createUser.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

router.post('/', loginMiddleware.loginMiddleware, authController.authUser);
router.delete('/', tokenMiddleware.checkAccessToken, authController.deleteAccount);// Перекинуть потом админу

router.post('/registration', createUserMiddleware.createUserMiddleware, authController.createUser);

router.delete('/logout', tokenMiddleware.checkAccessToken, authController.logOut);

router.post('/refresh', tokenMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = router;

