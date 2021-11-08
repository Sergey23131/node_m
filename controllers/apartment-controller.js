const Apartmens = require('../database/Apartmens');

module.exports = {
    getApartmens: async (req, res, next) => {
        try {
            const allApartments = await Apartmens.find();

            res.json(allApartments);
        } catch (e) {
            next(e);
        }
    },
    getApartmentByID: async (req, res, next) => {
        try {
            const oneApartment = await Apartmens.findById(req.params);

            res.json(oneApartment);
        } catch (e) {
            next(e);
        }
    },
};
