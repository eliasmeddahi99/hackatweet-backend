var express = require('express');
var router = express.Router();


const { checkBody } = require('../modules/checkBody');


const Twit = require("../models/twits")




router.post('/:userId', (req, res) => {
   if (!checkBody(req.body, ['newtwit', 'test'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
   }
   
     // if( #, mot qui le suit = tag



      const newTwit = new Twit({
         twit: req.body.newtwit,
         date: Date.now(),
         liked: [],
        // hashtag: tag,
         user : req.params.userId
         
      });

      newTwit.save().then(newDoc => {
         res.json({ result: true, newTwit: newDoc });
      });
       
     });

   



router.delete('/:twitId', (req, res) => {

   Twit.findByIdAndDelete(req.params.twitId)
   .then(data => {
      if(data){
         res.json({result : true, message : "twitt correctly deleted"})

      } else {
         res.json({result : false, message : "Impossible to delete this twit "})
      }
   })

})





module.exports = router;







