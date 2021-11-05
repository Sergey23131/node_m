const router = require('express').Router();

const {apartmentController} = require('../controllers');

router.get('/', apartmentController.getApartmens);

module.exports = router;

