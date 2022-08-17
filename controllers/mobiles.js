const Mobile = require("../models/mobile");


module.exports = {
  index,
  addDevice,
  create,
};



function addDevice(req, res) {
  res.render("mobiles/addDevice.ejs");
}

function create(req, res) {
  console.log("Body >>>>>>>", req.body);
  req.body.deviceOwner = req.user.name;
  req.body.deviceOwnerAvatar = req.user.avatar
  console.log("username >>>>>>>", req.user.name);
  console.log("Body >>>>>>>", req.body);
  Movie.create(req.body, function (err, mobileDocCreatedInTheDatabase) {
    if (err) {
      console.log(err, " <- err in the movies create controller");
      return res.render("mobiles/new.ejs");
    }
    console.log(mobileDocCreatedInTheDatabase, " <- movie created in db");
    res.redirect(`/mobiles/${mobileDocCreatedInTheDatabase._id}`);
  });
}



function index(req, res) {

  Mobile.find({}, function (err, mobileDataBase) {
    console.log(mobileDataBase, " <- all the movies");
    if (err) {
      res.send(
        "You have an error trying to find the movies, check the terminal"
      );
    }
    res.render("mobiles/index.ejs", {
      mobiles: mobileDataBase,
    });
  });

}



