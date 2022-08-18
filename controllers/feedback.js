const Mobile = require("../models/mobile");

module.exports = {
    create,
};

function create(req, res) {
    Mobile.findById(req.params.id, function (err, feedbackDocument) {
        console.log("movie docssssssssss >>>>>>>>", feedbackDocument);
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        feedbackDocument.feedback.push(req.body);

        feedbackDocument.save(function (err) {
            res.redirect(`/mobiles/${req.params.id}`);
        });
        console.log("movie docssssssssss >>>>>>>>", feedbackDocument);

    });
}