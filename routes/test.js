
var moment = require('../node_modules/moment');

const nowDateTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss');

console.log(nowDateTime);