const userRouter = require('express').Router();

const {userController} = require('../controllers');
const tokenMiddleware = require('../middlewares/token.middleware');
const createApartmentMiddleware = require('../middlewares/createApartment.middleware');
const bookApartmentMiddleware = require('../middlewares/bookApartment.middleware');
const updateMiddleware = require('../middlewares/update.middleware');
const userPermission = require('../middlewares/userPermisson.middleware');

userRouter.post('/create',
    tokenMiddleware.checkAccessToken,
    userPermission.userPermissonMiddleware,
    createApartmentMiddleware.createApartmentMiddleware,
    userController.createApartment);

userRouter.post('/book',
    tokenMiddleware.checkAccessToken,
    userPermission.userPermissonMiddleware,
    bookApartmentMiddleware.bookApartmentMiddleware,
    userController.bookApartment);

userRouter.put('/update/:apartment_id',
    tokenMiddleware.checkAccessToken,
    userPermission.userPermissonMiddleware,
    updateMiddleware.updateMiddleware,
    userController.updateApartment);

//Привязать забронированные дома к юзеру
// добавить даты бронирования для rented database

//Подумать,можно ли сделать так что бы только юзер чье обьявление мог его изменять

module.exports = userRouter;
