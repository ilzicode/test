var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const bodyParser = require('body-parser');
const axios = require('axios').default;

const Validator = require("fastest-validator");
const v = new Validator();


const {Op} = require('sequelize');


const { cron, users } = require("../models");

var moment = require('moment');
const { response } = require('../app');

router.get('/', (req, res, next) => {
    year = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');
    console.log(year);
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

    users.hasMany(cron);
    cron.hasOne(users);
    cron.belongsTo(users, {
      foreignKey: {
        name: 'usersId'
      }
    });

    const data = await users.findAll({


        where: {
            sendingEmailServerTime: {
                [Op.gt]: nowDateTime
            }
        }
    });



    // res.json({
    //     status: 200,
    //     message: data,
    // })



    await data.forEach(element => {

        // console.log(element.email);
        // console.log(element.id);

        // sending email each data
        try {

            axios.post('https://email-service.digitalenvision.com.au/send-email', {
                email: element.email,
                message: "Happy Birthday to " + element.firstName + " " + element.lastName

            }).then(function (response) {

                console.log(response.data);
                const responseMsg = response.data;

                try {


                    if (response.data.status == "sent") {
                        var isSend = 1;

                        let nextYear = parseInt(moment(element.sendingEmailServerTime, "YYYY-MM-DD hh:mm:ss").format('YYYY')) + 1;
                        let time = moment(element.sendingEmailServerTime, "YYYY-MM-DD hh:mm:ss").format('-MM-DD hh:mm:ss');
                        let newYear = nextYear + time;

                        console.log('new year ' + newYear);

                        users.update({ sendingEmailServerTime: newYear }, {
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
                try {

                    const insertCronLog = cron.create(
                        {
                            usersId: element.id,
                            response: JSON.stringify(responseMsg),
                            year: moment().format('YYYY'),
                            isSend: isSend
                        }
                    );





                } catch (err) {
                    console.error(err.message);
                    // res.status(400).json({
                    //     message: err.message,
                    //     data: req.body
                    // })
                }


                res.json({
                    status: 200,
                    message: responseMsg,
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