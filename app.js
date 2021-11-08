require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {PORT, MONGO_CONNECT_URL} = require('./configs/config');
const {adminRouter, managerRouter, userRouter, apartmentRouter, authRouter} = require('./routers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(MONGO_CONNECT_URL);

app.use('/apartments', apartmentRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
