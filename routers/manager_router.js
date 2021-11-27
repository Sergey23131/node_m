const managerRouter = require('express').Router();

const {managerController} = require('../controllers');

const permissionMiddleware = require('../middlewares/managerPermission.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

managerRouter.get('/users',
    permissionMiddleware.managerPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    managerController.getUsers);

managerRouter.get('/Managers',
    permissionMiddleware.managerPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    managerController.getManagers);

managerRouter.delete('/deleteAccount',
    permissionMiddleware.managerPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    managerController.deleteAccount);

managerRouter.delete('/deleteApartment',
    permissionMiddleware.managerPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    managerController.deleteApartmentPost);

//Можно добавить апдейт для поста менеджером

module.exports = managerRouter;

