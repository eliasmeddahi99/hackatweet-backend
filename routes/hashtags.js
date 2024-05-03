var express = require('express');
var router = express.Router();

const Twit = require('../models/twits');
const Hashtag = require('../models/hashtags');

//require("../models/connection")

/* GET users listing. */
router.get('/', (req, res) => {
  Twit.find( {"twit":
  { $regex: new RegExp(".*" + req.body.mysearch + ".*", "i")}}).then(data => {
   if (data) {
     res.json({ result: true, twits : data });
   } else {
     res.json({ result: false, error: 'no tweets matching with your request' });
   }
 });
});




module.exports = router;







