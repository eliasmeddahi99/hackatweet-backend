var express = require('express');
var router = express.Router();
const User = require('../models/users');

//require("../models/connection")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



const newUser = new User({

  username: String,
  password: String,
  firstname : String, 
  logo : String,
  token: String,
  tweet : String
})

newUser.save().then()



module.exports = router;







