var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const bodyParser = require('body-parser');
const axios = require('axios').default;

const Validator = require("fastest-validator");
const v = new Validator();

const db = require('../models');
const { cronEmail, users } = require("../models");
const { QueryTypes } = require('sequelize');

const { Op } = require('sequelize');

var moment = require('moment');
const { response } = require('../app');

router.get('/', (req, res, next) => {

    // year = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');
    // console.log(year);

    // beda + 6 jam gmt.
    let differentInMinutes = -360;
    let serverDifference = -420;

    let offset = differentInMinutes + serverDifference;


    let newDate = moment("2022-08-22 09:00:00", "YYYY-MM-DD hh:mm:ss").add(differentInMinutes, 'minutes').format('YYYY-MM-DD hh:mm:ss');


    // yg mau di simpan adalah tanggal dan waktu kirim
    // tanggal apa berubah ? gak dong..

    console.log(newDate);




    // var moment = require('../node_modules/moment');

    // const nowDateTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');

    // console.log(nowDateTime);
})


// POST
router.post('/', async (req, res, next) => {

    // authentication
    // better with headers authentication this just minimal sample security
    // if(req.body.password != "12dsadqfqfsdgs"){
    //     res.status(400).json({
    //         message: 'failed authenticate password',
    //     })
    // }


    // get all valid database to send email
    const nowDateTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');


    const nowYear = moment().tz("Asia/Jakarta").format('YYYY');


    // butuh try catch

    var data = await db.sequelize.query(
        'SELECT * FROM `users` LEFT JOIN cron_emails on `users`.`id` = `cron_emails`.`users_id` WHERE `cron_emails`.`type`="birthday" and `cron_emails`.`sending_email_server_time` > ' + "'" + nowDateTime + "'" + ' and `cron_emails`.`year` > ' + "'" + nowYear + "'" +';', { type: QueryTypes.SELECT });



    await data.forEach(element => {

        try {

            axios.post('https://email-service.digitalenvision.com.au/send-email', {
                email: element.email,
                message: "Happy Birthday to " + element.firstName + " " + element.lastName + ", Hope all your birthday wishes come true!"

            },{ timeout: 3 }

            ).then(function (response) {

                console.log(response.data);
                const responseMsg = response.data;

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


                    } else {
                        var isSend = 0;
                    }


                } catch (err) {
                    console.log(err);


                }


                res.json({
                    status: 200,
                    message: element,
                })



                // record ke database klo berhasil..

            })
                .catch(function (error) {
                    console.log(error);
                    // const responseMsg = error;

                    // res.json({
                    //     status: 200,
                    //     message: responseMsg,
                    // })
                });









        } catch (err) {
            console.error(err.message);

        }








    });


    // res.json({
    //     status: 200,
    //     message: data,
    // })




    /*







        axios.post('https://email-service.digitalenvision.com.au/send-email', {
            email: "test@digitalenvision.com.au",
            message: "Hi, nice to meet you."
        }).then(function (response) {

            console.log(response.data);

            const responseMsg = response.data;

            // try {
            //   // const create =  cronEmailLog.create(response.data);
            // } catch (err) {
            //     console.error(err.message);
            //     res.status(400).json({
            //         message: err.message,
            //     })
            // }



            if(response.data.status == "sent" ){
                //tulis berhasil
                var isSend= 1;

            }



            try {





                const user =  cron.create(
                    {
                        response: JSON.stringify(responseMsg),
                        year: moment().format('YYYY'),
                        isSend: isSend

                    }
                );



            } catch (err) {
                console.error(err.message);
                res.status(400).json({
                    message: err.message,
                    data: req.body
                })
            }






            res.json({
                status: 200,
                message: responseMsg,
            })



            // record ke database klo berhasil..

        })
            .catch(function (error) {
                console.log(error);
                const responseMsg = error;

                res.json({
                    status: 200,
                    message: responseMsg,
                })
            });


    */



})

module.exports = router;