const router = require('express').Router();

const {adminController} = require('../controllers');

const permissionMiddleware = require('../middlewares/adminePermission.middleware');
const createAdminMiddleware = require('../middlewares/createAdmin.middleware');
const createManagerMiddleware = require('../middlewares/createManager.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

router.post('/createAdmin', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, createAdminMiddleware.createAdminMiddleware, adminController.createAdmin);

router.post('/createManager', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, createManagerMiddleware.createManagerMiddleware, adminController.createManager);

router.get('/users', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, adminController.getUsers);

router.get('/Admins', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, adminController.getAdmins);

router.get('/Managers', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, adminController.getManagers);

router.delete('/deleteAccount', permissionMiddleware.adminPermissonMiddleware, tokenMiddleware.checkAccessToken, adminController.deleteAccount);

module.exports = router;

