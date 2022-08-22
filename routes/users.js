var express = require('express');
var router = express.Router();
var moment = require('moment');
const Validator = require("fastest-validator");
const v = new Validator();
const { users, cronEmail, sequelize,db } = require("../models");
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

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

        // server timezone Jakarta +7 GMT (-420/60)
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

            if (transaction) {
                await transaction.rollback();
            }

            console.log('error');
            console.error(err.message);

            return res.status(400).json({
                message: err.message,
                data: req.body
            })

        }

        return res.json({
            status: 200,
            message: 'berhasil',
            data: req.body,
        })

    } catch (err) {
        console.log('error');
        console.error(err.message);
    }

})

// DELETE
router.delete('/:id', async (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({
            message: 'error: please input a valid id',
        })
    }

    let transaction;

    try {

        transaction = await sequelize.transaction();

        userData = await users.destroy({
            where: { id: id },
            transaction
        });

        await cronEmail.destroy({
            where: { id: id },
            transaction
        });

        await transaction.commit();
        console.log('success delete id : ' + id);

    } catch (err) {

        if (transaction) {
            await transaction.rollback();
        }

        console.log(err);

        return res.status(400).json({
            message: err.message,
            data: userData
        })

    }

    return res.json({
        status: 200,
        message: 'success delete id : ' + id,
    })

})

// PUT (update)
router.put('/:id', async (req, res, next) => {

    try {

        const id = parseInt(req.params.id);

        let user = await users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'user not found'
            })
        }

        //validation
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

        let updateData = await users.update(
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        return res.json({
            status: 200,
            message: "success update",
            updateData: updateData
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 404,
            message: err
        })
    }

});

module.exports = router;

