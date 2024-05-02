var express = require('express');
var router = express.Router();


const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


const User = require("../models/users")


router.post('/signup', (req, res) => {
   if (!checkBody(req.body, ['username', 'password', 'firstname'])) {
     res.json({ result: false, error: 'Missing or empty fields' });
     return;
   }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        firstname : req.body.firstname, 
        token: uid2(32),
        
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, newUser: newDoc });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});




router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password', 'firstname'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, oldUser: data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});



module.exports = router;







