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
        email:"email|required",
        firstName:"string|optional",
        lastName:"string|optional",
        birthdayDate:"string|optional",
        location:"string|optional",
    };

    const validate = v.validate(req.body,schema);

    res.json({
        status:200,
        message: validate,
        data:req.body,
        length:validate.length
    })

    if (validate.length){
        return res.status(400).json(validate);
    }

    try {
        const user = await users.create(req.body);
    } catch (err) {

        console.error(err.message);
        res.status(400).json({
            message: err.message,
            data:req.body
        })

    }


    res.json({
        status:200,
        message: 'berhasil',
        data:req.body
    })

})

module.exports = router;