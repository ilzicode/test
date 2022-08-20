var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const bodyParser = require('body-parser');

const Validator = require("fastest-validator");

const v = new Validator();

const {users}= require("../models");
// const { ValidationError } = require('sequelize/types');



router.get('/',  (req, res,next) =>{
    console.log('anjeng');

    const users = {
        nim: req.body.nim,
        nama: req.body.nama,
    };

    res.status(200).json({
        message: 'get method users',
        data: users
    })
})

// POST
router.post('/', async  (req, res,next) =>{


    const schema = {
        email:"string",
        first_name:"string",
        last_name:"string",
        birthday_date:"string",
        location:"string",
        created_at:"string",
        updated_at: "string",
    };

    const validate = v.validate(req.body,schema);

    if(validate.lenght){
        return res.status(400).json(validate);
    }

    // proses create

    console.log(req.body);
    const user = await users.create(req.body)

    res.status(200).json({
        message: 'sukses create data'
    })
})

module.exports = router;