const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require("http").get("http://localhost:3306/", res => console.log(res.statusCode))