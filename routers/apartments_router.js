const router = require('express').Router();

const {apartmentController} = require('../controllers');

router.get('/', apartmentController.getApartmens);
router.get('/:apartment_id', apartmentController.getApartmentByID);

module.exports = router;

