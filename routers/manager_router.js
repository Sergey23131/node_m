const router = require('express').Router();

const {managerController} = require('../controllers');

const permissionMiddleware = require('../middlewares/managerPermission.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');


router.get('/users', permissionMiddleware.managerPermissonMiddleware, tokenMiddleware.checkAccessToken, managerController.getUsers);

router.get('/Managers', permissionMiddleware.managerPermissonMiddleware, tokenMiddleware.checkAccessToken, managerController.getManagers);

router.delete('/deleteAccount', permissionMiddleware.managerPermissonMiddleware, tokenMiddleware.checkAccessToken, managerController.deleteAccount);

router.delete('/deleteApartment', permissionMiddleware.managerPermissonMiddleware, tokenMiddleware.checkAccessToken, managerController.deleteApartmentPost);


module.exports = router;

