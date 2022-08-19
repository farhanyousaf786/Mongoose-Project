const Mobile = require("../models/mobile");

module.exports = {
  index,
  addDevice,
  create,
  mobileDetials,
  edit,
  deleteDevice,
};


// function to grabe all post from database and show it after login
function index(req, res) {
  Mobile.find({}, function (err, mobileDataBase) {
    if (err) {
      res.send(
        "You have an error trying to find the mobiles, check the terminal"
      );
    }
    res.render("mobiles/index.ejs", {
      mobiles: mobileDataBase,
    });
  });
}

// function to go to deviceDetails page
async function mobileDetials(req, res) {
  try {
    const mobileDoc = await Mobile.findById(req.params.id)
    res.render("mobiles/deviceDetails", {
      title: "Mobile Detail",
      mobiles: mobileDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

// function to move to addDevice page
function addDevice(req, res) {
  res.render("mobiles/addDevice.ejs");
}

// function to add post in databse
function create(req, res) {
  req.body.deviceOwner = req.user.name;
  // this is is userId, which will help us to find if current post is posted by that
  // user or not
  req.body.userId = req.user._id.toHexString()
  req.body.deviceOwnerAvatar = req.user.avatar
  Mobile.create(req.body, function (err, mobileDoc) {
    if (err) {
      return res.render("mobiles/addDevice.ejs");
    }
    res.redirect(`/mobiles/${mobileDoc._id}`);
  });
}

// function to update values in database
function edit(req, res) {
  // find value by using its id and update it
  Mobile.findByIdAndUpdate(req.params.id, req.body, function (err, mobDoc) {
    mobDoc.save(function (err) {
      // keep on same page
      res.render("mobiles/deviceDetails", {
        title: "Mobile Detail",
        mobiles: mobDoc,
      });
    })
  })
}

async function deleteDevice(req, res) {
  try {
    const mobDoc = await Mobile.findById(req.params.id);
    mobDoc.remove(req.params.id);
    await mobDoc.save();
    res.redirect('/mobiles');
  } catch (err) {
    res.redirect('/mobiles');
  }
}