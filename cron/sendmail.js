var cron = require('node-cron');
const axios = require('axios').default;
const { Sequelize } = require('sequelize');
const express = require('express');

var fs = require("fs");
// require("dotenv").config();

// const {DB_USERNAME,DB_PASSWORD, DB_HOSTNAME,DB_NAME,DB_DIALECT, DB_PORT} = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOSTNAME,
//   dialect: DB_DIALECT
// });



// ini penyebab nya
const { cronEmailLog } = require("../models");

// app = express(); // Initializing app


// pastikan running sekali.. via file
// cari database yg pengen di send..


// foreach masing2x data
// kirim email..




axios.post('https://email-service.digitalenvision.com.au/send-email', {
  email: "test@digitalenvision.com.au",
  message: "Hi, nice to meet you."
}).then(function (response) {

    console.log(response.data);


    // try {
    //   // const create =  cronEmailLog.create(response.data);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(400).json({
    //         message: err.message,
    //     })
    // }




    // record ke database klo berhasil..

  })
  .catch(function (error) {
    console.log(error);
  });



  // module.exports = app;






//  every 15 minutes    */15 * * * *

// cron.schedule('* * * * *', () => {

//   console.log('running a task every minute');


//   var writeStream = fs.createWriteStream("JournalDEV.txt");
//   writeStream.write("Hi, JournalDEV Users. ");
//   writeStream.write("Thank You.");
//   writeStream.end();








// });