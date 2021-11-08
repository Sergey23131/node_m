const router = require('express').Router();

const {userController} = require('../controllers');
const tokenMiddleware = require('../middlewares/token.middleware');
const createApartmentMiddleware = require('../middlewares/createApartment.middleware');
const bookApartmentMiddleware = require('../middlewares/bookApartment.middleware');

router.post('/create', createApartmentMiddleware.createApartmentMiddleware, tokenMiddleware.checkAccessToken, userController.createApartment);
router.post('/book', bookApartmentMiddleware.bookApartmentMiddleware, tokenMiddleware.checkAccessToken, userController.bookApartment);

//Привязать созданные и забронированные дома к юзеру

//Дать возможность обновлять инфу про пост

module.exports = router;
