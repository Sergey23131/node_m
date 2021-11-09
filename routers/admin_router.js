const adminRouter = require('express').Router();

const {adminController} = require('../controllers');

const permissionMiddleware = require('../middlewares/adminePermission.middleware');
const createAdminMiddleware = require('../middlewares/createAdmin.middleware');
const createManagerMiddleware = require('../middlewares/createManager.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

adminRouter.post('/createAdmin',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    createAdminMiddleware.createAdminMiddleware,
    adminController.createAdmin);

adminRouter.post('/createManager',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    createManagerMiddleware.createManagerMiddleware,
    adminController.createManager);

adminRouter.get('/users',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    adminController.getUsers);

adminRouter.get('/Admins',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    adminController.getAdmins);

adminRouter.get('/Managers',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    adminController.getManagers);

adminRouter.delete('/deleteAccount',
    permissionMiddleware.adminPermissonMiddleware,
    tokenMiddleware.checkAccessToken,
    adminController.deleteAccount);

module.exports = adminRouter;

