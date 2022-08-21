var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const bodyParser = require('body-parser');
const Validator = require("fastest-validator");
const v = new Validator();

const { users, cronEmail, sequelize } = require("../models");

var moment = require('moment');

router.put('/', async(req, res, next) => {

})

// POST

router.post('/', async (req, res, next) => {

    try {

        const schema = {
            email: "email|required|unique",
            firstName: "string|required",
            lastName: "string|optional",
            birthdayDate: "string|required",
            timezoneOffset: "number|required",
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                error: validate,
                data: req.body
            });
        }

        // server timezone Jakarta +7 GMT //420/ 7
        const serverTimezoneOffset = -420;

        const differentInMinutes = serverTimezoneOffset - req.body.timezoneOffset;

        let sendTimeGMT7 = moment(req.body.birthdayDate.slice(0, 10) + " 09:00:00", "YYYY-MM-DD hh:mm:ss").add(differentInMinutes, 'minutes').format('YYYY-MM-DD hh:mm:ss');

        let transaction;
        try {
            transaction = await sequelize.transaction();
            const user = await users.create(req.body, { transaction });

            await cronEmail.create({
                type: 'birthday',
                sendingEmailServerTime: sendTimeGMT7,
                usersId: user.id
            }, { transaction });

            console.log('success');
            await transaction.commit();

        } catch (err) {
            console.log('error');
            if (transaction) {
                await transaction.rollback();
            }

            console.error(err.message);

            res.status(400).json({
                message: err.message,
                data: req.body
            })

        }

        res.json({
            status: 200,
            message: 'berhasil',
            data: req.body,
        })


    } catch (error) {

    }







})


router.delete('/', async (req, res, next) => {

    try {

        const schema = {
            email: "email|required",
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                error: validate,
                data: req.body
            });
        }

        let transaction;
        try {
            transaction = await sequelize.transaction();

            const test = await users.destroy({
                where: { email: req.body.email }, transaction
            });

            // delete related database jg harusnya..

            // await City.destroy({
            //     where: { email:req.body.email }, transaction
            // });

            console.log('success');
            await transaction.commit();

        } catch (err) {
            console.log('error');
            if (transaction) {
                await transaction.rollback();
            }

            console.error(err.message);

            res.status(400).json({
                message: err.message,
                data: req.body
            })

        }

        res.json({
            status: 200,
            message: 'berhasil hapus data',
            data: req.body,
        })

    } catch (error) {

    }
})

module.exports = router;

