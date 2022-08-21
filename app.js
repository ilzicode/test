const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const cronRoutes = require('./routes/cron');

const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.use('/cron', cronRoutes);

app.get('/', (req, res) => {
    res.send('Wish you have the best Luck in the world!!')
})

app.use((req, res, next) => {
    const error = new Error('Tidak ditemukan');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.status,
        }
    })

})

module.exports = app;