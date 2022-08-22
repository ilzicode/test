var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const axios = require('axios').default;

const { cronEmail,cronEmailLog } = require("../models");

var moment = require('moment');

const db = require('../models');
const { QueryTypes } = require('sequelize');

const bodyParser = require('body-parser');
const Validator = require("fastest-validator");
const v = new Validator();

const axiosRetry = require("axios-retry");
const users = require('../models/users');

// POST
router.post('/', async (req, res, next) => {

    // authentication
    // better with headers authentication this just minimal sample security
    // if(req.body.password != "12dsadqfqfsdgs"){
    //     res.status(400).json({
    //         message: 'failed authenticate password',
    //     })
    // }

    try {

        console.log('scan started');

        const nowDateTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');
        const nowYear = moment().tz("Asia/Jakarta").format('YYYY');

        // get all valid database to send email
        var data = await db.sequelize.query(
            'SELECT * FROM `users` LEFT JOIN `cron_email` on `users`.`id` = `cron_email`.`users_id` WHERE `cron_email`.`type`="birthday" and `cron_email`.`sending_email_server_time` > ' + "'" + nowDateTime + "'" + ' and `cron_email`.`year` <= ' + "'" + nowYear + "'" + ';', { type: QueryTypes.SELECT });

        await data.forEach(element => {

            try {
                axiosRetry(axios, { retries: 10 });

                axios.post('https://email-service.digitalenvision.com.au/send-email', {
                    email: element.email,
                    message:  "Hey, "+ element.firstName + ", " + element.lastName +" it’s your birthday"

                }, { timeout: 3000 }
                ).then(function (response) {

                    var responseMsg = response.data;

                    try {

                        if (response.data.status == "sent") {

                            let originTime = element.sending_email_server_time;

                            let nextYear = parseInt(element.sending_email_server_time.slice(0, 4)) + 1;

                            let time = originTime.slice(5, 19);

                            let newYear = nextYear + '-' + time;

                            console.log('new year ' + newYear);

                            cronEmail.update({
                                isSend: '1',
                                isSuccess: '1',
                                year: nextYear,
                                sendingEmailServerTime: newYear,
                            }, {
                                where: {
                                    id: element.id
                                }
                            });

                        }

                        cronEmailLog.create({
                            response: response.data.status,
                            usersId: element.id,
                            type: "birthday",
                        });

                    } catch (error) {
                        console.log(error);
                    }

                })
                .catch(function (error ) {

                    console.log(error);

                    cronEmailLog.create(
                    {
                        response: error.toString(),
                        usersId: element.id,
                        type: "birthday",
                    });
                });

            } catch (error) {
                console.log(error);
            }

        });

        res.json({
            status: 200,
            message: 'all data scanned successfully',
        },)

        console.log('all scan completed successfully');

    } catch (error) {
        console.log(error);
    }


})



module.exports = router;