var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.get('/canBookmark/:token', (req, res) => {
//   User.findOne({ token: req.params.token }).then(data => {
//     if (data) {
//       res.json({ result: true, canBookmark: data.canBookmark });
//     } else {
//       res.json({ result: false, error: 'User not found' });
//     }
//   });
// });

module.exports = router;
