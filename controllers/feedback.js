const Mobile = require("../models/mobile");

module.exports = {
    create,
    delete: deleteFeedback,
};

// create fub=nction to insert values in databse
function create(req, res) {
    Mobile.findById(req.params.id, function (err, feedbackDocument) {
        //grab values from User and copy it to variables to 
        //body of our form to save it into databse
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // save data to databse
        feedbackDocument.feedback.push(req.body);
        // keep on same page
        feedbackDocument.save(function (err) {
            res.redirect(`/mobiles/${req.params.id}`);
        });
    });
}

// delete function to remove data from database
async function deleteFeedback(req, res) {
    try {

        //grab values from Mobile schema
        const mobileDoc = await Mobile.findOne({
            'feedback._id': req.params.id,
            'feedback.user': req.user._id
        });
        //remove that exact element by using id of that element
        mobileDoc.feedback.remove(req.params.id);
        // save dabase after emoving require value
        await mobileDoc.save();
        // keep on same page
        res.redirect(`/mobiles/${mobileDoc._id}`)
    } catch (err) {
        res.send(err)
    }
}

