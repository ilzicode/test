var cron = require('node-cron');
const axios = require('axios').default;
var fs = require('fs');

console.log('task running');

var writeStream = fs.createWriteStream("script_is_running");
writeStream.write("Hi,  Digital Envision ");
writeStream.end();
console.log('task running');

const path = './script_is_running'

// */15 * * * *   <-- 15 minutes default setup
// /10 * * * * *  <-- testing purposes
// using file create/check/delete to avoid race conditions


cron.schedule('*/10 * * * * *', () => {

    console.log('every 10 seconds');

    try {

        if (fs.existsSync(path)) {
            //file exists
            process.exitCode = 0;
        }

        axios.post('http://localhost:3000/cron', {
            password: "12dsadqfqfsdgs",

        }).then(function (response) {
            console.log(response.data);

        }).catch(function (error) {
            console.log(error);
        });


        console.error(err);

    } catch (err) {
        fs.unlink(path);
        console.error(err);
    }

    fs.unlink(path);

});


