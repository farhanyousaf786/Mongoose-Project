const Mobile = require("../models/mobile");

module.exports = {
    create,
    deleteFeedback,
};

function create(req, res) {
    Mobile.findById(req.params.id, function (err, feedbackDocument) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        feedbackDocument.feedback.push(req.body);
        feedbackDocument.save(function (err) {
            res.redirect(`/mobiles/${req.params.id}`);
        });

    });
}




 function deleteFeedback(req, res){


console.log('deleteFeedback>>>>', req.params.id);

 
  }

//   try {
//     const mobileDoc = await Mobile.findOne({
//       'feedback._id': req.params.id,
//       'feedback.user': req.user._id
//     });

 

//     if(!mobileDoc) return res.redirect('/mobiles');
//     mobileDoc.reviews.remove(req.params.id);
//     await mobileDoc.save();
//     res.redirect(`/mobiles/${mobileDoc._id}`)
//   }catch(err){
//     res.send(err)
//   }