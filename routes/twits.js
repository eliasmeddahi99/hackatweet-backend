var express = require('express');
var router = express.Router();


const { checkBody } = require('../modules/checkBody');


const Twit = require("../models/twits")
const Hashtag = require("../models/hashtags")
const User = require("../models/users")



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////---- Ajouter un like------/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 router.post('/like', (req, res) => {
   
   Twit.findById(req.body.twitId).then(twitObj => {

      if(twitObj){

         User.findOne({token : req.body.token}).then(currentUser => {

             const isliked = req.body.isliked; 

            if(currentUser && (isliked && isliked != "false")){
               Twit.updateOne(
                  { _id : twitObj._id },
                  { $addToSet: { liked: currentUser.username } }
               ).then(() =>  res.json({result : true, like_tab : twitObj.liked} ))

            } 
            //else if (currentUser && isliked === false)
            else if (currentUser && (isliked === false || isliked === 'false'))
            {
               Twit.updateOne(
                  { _id : twitObj._id },
                  { $pull: { liked: currentUser.username } }
               ).then(() =>  res.json({result : true, like_tab : twitObj.liked} ))
            }

            else {
               
               res.json({ result : false, message : "User doesn't exist "})
            }
         })

         
      
      } else {
         res.json({ result : false, message : "Twitt doesn't exist "})
      }

      
   });
 });





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////---- Ajout d' un Tweet      //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/:userId', (req, res) => {


   if (!checkBody(req.body, ['newtwit'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
   }

      const twit = req.body.newtwit

      const pattern = /#[a-zA-Z0-9]+/g;
      const tags = twit.match(pattern);


      const newTwit = new Twit({
         twit,  
         liked: [],
         hashtag: tags,
         user : req.params.userId
         
      });

      newTwit.save().then(newDoc => {

         const newTwit = newDoc.twit
         const newtwitDate = newDoc.date
         const newtwitLiked = newDoc.liked
         const newtwitHashtag = newDoc.hashtag
         const newtwitUser = newDoc.user
         const newtwitId = newDoc.id



/////////////////////////////////////////////////---- Remplissage OU creation d' un Hashtag en BDD //////////////////////////////////////////////////



         if(tags.length>0){
      
            for(let tag of tags){
               //console.log("eeeeeeee", tag)
               Hashtag.findOne({name : tag})
               .then(data => {
                  
                  if(data){   
                     Hashtag.updateOne(
                        { name : tag },
                        { $addToSet: { twits: newtwitId } }
                     ).then()
                  } else {
                     
                     const newHashtag = new Hashtag({
                        name : tag,  
                        twits: [newtwitId]
                  })
                  newHashtag.save()
                  }
               })
               
            }
      
         }

         res.json({ result: true, 
            newTwitObj : newDoc,})
      })
   
     });

   
 //       newTwit : newDoc.twit,
            //    newtwitDate : newDoc.date,
            //    newtwitLiked : newDoc.liked,
            //    newtwitHashtag : newDoc.hashtag,
            //    newtwitUser : newDoc.user,
            //    newtwitId : newDoc.id,




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////---- Suppression d' un Tweet        ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////---- Chercher des tweets //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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







