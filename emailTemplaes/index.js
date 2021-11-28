const emailActions = require('../configs/email.actions');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!'
},
    [emailActions.USER_BOOKING]: {
        templateName: 'userRentApartment',
        subject: 'You rented apartment!'
    },
    [emailActions.BOOKED_APARTMENT]: {
        templateName: 'apartmentWasRented',
        subject: 'Your apartment was rented'
    },
    [emailActions.DELETE]: {
        templateName: 'delete',
        subject: 'Account removing'
    },
};