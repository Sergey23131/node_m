const router = require('express').Router();

const {adminController} = require('../controllers');

const createAdminMiddleware = require('../middlewares/createAdmin.middleware');
const createManagerMiddleware = require('../middlewares/createManager.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

router.post('/сreateAdmin', createAdminMiddleware.createAdminMiddleware, adminController.createAdmin);

router.post('/createManager', tokenMiddleware.checkAccessToken, createManagerMiddleware.createManagerMiddleware, adminController.createManager);

router.get('/Users', tokenMiddleware.checkAccessToken, adminController.getUsers);

router.get('/Admins', tokenMiddleware.checkAccessToken, adminController.getAdmins);

router.get('/Managers', tokenMiddleware.checkAccessToken, adminController.getManagers);

router.delete('/deleteAccount', tokenMiddleware.checkAccessToken, adminController.deleteAccount);

//Забыл добавить проверку по токену, является ли юзер одним из админов(проверить по админской базе)
//В мидлварах идёт поиск по мейлу,сделать подобное

module.exports = router;

