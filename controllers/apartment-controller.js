const Apartmens = require('../database/Apartmens');

module.exports = {
    getApartmens: async (req, res, next) => {
        try {
            const allApartments = await Apartmens.find();

            res.json('allApartmens');
        } catch (e) {
            next(e);
        }

    },
};
