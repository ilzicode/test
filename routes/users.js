var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const bodyParser = require('body-parser');

const Validator = require("fastest-validator");
const v = new Validator();

const { users } = require("../models");

var moment = require('moment');
// moment().format();

router.get('/', (req, res, next) => {

})

// POST

router.post('/', async (req, res, next) => {

    const schema = {
        email: "email|required",
        firstName: "string|required",
        lastName: "string|optional",
        birthdayDate: "string|required",
        timezoneOffset: "number|required",
    };

    const validate = v.validate(req.body, schema);

    // server timezone Jakarta +7 GMT
    const serverTimezoneOffset = -420;
    const differentInMinutes = serverTimezoneOffset - req.body.timezoneOffset;


    let newDate = moment(req.body.birthdayDate.slice(0, 10) + " 09:00:00", "YYYY-MM-DD hh:mm:ss").add(differentInMinutes, 'minutes').format('YYYY-MM-DD hh:mm:ss');

    req.body.sendingEmailServerTime = newDate;

    req.body.newFullDate = newFullDate;

    if (validate.length) {
        return res.status(400).json({
            error: validate,
            data: req.body
        });
    }

    try {
        const user = await users.create(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            message: err.message,
            data: req.body
        })
    }

    res.json({
        status: 200,
        message: 'berhasil',
        data: req.body
    })

})

module.exports = router;