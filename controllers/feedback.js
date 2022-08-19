const Mobile = require("../models/mobile");

module.exports = {
    create,
    delete: deleteFeedback,
};

// create fub=nction to insert values in databse
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

// delete function to remove data from database
async function deleteFeedback(req, res) {
    try {
        const mobileDoc = await Mobile.findOne({
            'feedback._id': req.params.id,
            'feedback.user': req.user._id
        });
        mobileDoc.feedback.remove(req.params.id);
        await mobileDoc.save();
        res.redirect(`/mobiles/${mobileDoc._id}`)
    } catch (err) {
        res.send(err)
    }
}

