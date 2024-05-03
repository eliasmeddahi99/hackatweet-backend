var express = require('express');
var router = express.Router();


const { checkBody } = require('../modules/checkBody');


const Twit = require("../models/twits")
const Hashtag = require("../models/hashtags")




router.post('/:userId', (req, res) => {


   if (!checkBody(req.body, ['newtwit'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
   }
   
     // if( #, mot qui le suit = tag

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


         if(tags.length>0){
      
            for(let tag of tags){
               //console.log("eeeeeeee", tag)
               Hashtag.findOne({name : tag})
               .then(data => {
                  
                  //console.log("dataaaaaaaaaaa", data)
                  if(data){
                     
                     
                     // console.log("dataaaaaaaaaaaaaaaaaa", data)
                     // console.log("twiiiiiiiiiiiiiiiiiit", twit)
                     // console.log("t       f        f     f")
                     //data.twits.push(newtwitId).save()

                     //console.log("tag",tag)
                     //console.log("newtwitId",newtwitId)

                     Hashtag.updateOne(
                        { name : tag },
                        { $addToSet: { twits: newtwitId } }
                     ).then()





                     //data.twits.push(newTwit.twit).save()
                  } else {
                     //console.log("newTwit._id", newTwit._id)
                     
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
            newTwitObj : newDoc,
            //       newTwit : newDoc.twit,
            //    newtwitDate : newDoc.date,
            //    newtwitLiked : newDoc.liked,
            //    newtwitHashtag : newDoc.hashtag,
            //    newtwitUser : newDoc.user,
            //    newtwitId : newDoc.id,
      
      
      
            //    
      
      
             })
      




      //    res.json({ result: true, 
      //       newTwit : newDoc.twit,
      //    newtwitDate : newDoc.date,
      //    newtwitLiked : newDoc.liked,
      //    newtwitHashtag : newDoc.hashtag,
      //    newtwitUser : newDoc.user,
      //    newtwitId : newDoc.id,



      //    NouveauTweet : newDoc


      // })








/////////////////////////////// if hashtag exist ////////////////////////////////:



   








         

      })

      
         
      //    if(tags.length>0){

         
      //       for(let tag of tags){
      //          //console.log("eeeeeeee", tag)
      //          Hashtag.findOne({name : tag})
      //          .then(data => {
                  
      //             //console.log("dataaaaaaaaaaa", data)
      //             if(data){
                     
                     
      //                // console.log("dataaaaaaaaaaaaaaaaaa", data)
      //                // console.log("twiiiiiiiiiiiiiiiiiit", twit)
      //                // console.log("t       f        f     f")
      //                data.twits.push(DATA.addedTwit._id)
      //                //data.twits.push(newTwit.twit).save()
      //             } else {
      //                //console.log("newTwit._id", newTwit._id)
                     
      //                const newHashtag = new Hashtag({
      //                   name : tag,  
      //                   twits: [newTwit._id]
   
      //             })
   
      //             newHashtag.save().then(newDoc => {
      //                res.json({ result: true, newHashtag: newDoc });
      //             });
   
      //             }
      //          })
               
      //       }
   
      //    }

      // })

      
      

      
   
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



router.get('/tag', (req, res) => {
   Twit.find( {"twit":
   { $regex: new RegExp("^" + req.body.tag + ".*", "i")}}).then(data => {
    if (data) {
      res.json({ result: true, twits : data });
    } else {
      res.json({ result: false, error: 'no tweets matching with your request' });
    }
  });
});



module.exports = router;







