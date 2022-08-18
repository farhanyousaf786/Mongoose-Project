const Mobile = require("../models/mobile");


module.exports = {
  index,
  addDevice,
  create,
  mobileDetials,
  deleteDevice,
  edit,
};




function edit(req, res) {
  console.log(req.body, " <<<<< ==== body");

  Mobile.findByIdAndUpdate(req.params.id, req.body, function (err, mobDoc) {

    mobDoc.save(function (err) {
      
      res.render("mobiles/deviceDetails", {
        title: "Mobile Detail",
        mobiles: mobDoc,
      });
    })
  })
}





function addDevice(req, res) {
  res.render("mobiles/addDevice.ejs");
}




function index(req, res) {

  Mobile.find({}, function (err, mobileDataBase) {
    console.log(mobileDataBase, " <- all the mobiles");
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



async function mobileDetials(req, res) {
  try {
    const mobileDoc = await Mobile.findById(req.params.id)


    console.log(mobileDoc, " <- - -- - - -  - -  all the mobiles");

    res.render("mobiles/deviceDetails", {
      title: "Mobile Detail",
      mobiles: mobileDoc,
    });

  } catch (err) {
    res.send(err);
  }

}


function create(req, res) {
  console.log("Body >>>>>>>", req.body);

  req.body.deviceOwner = req.user.name;

  // this is is userId, which will help us to find if current post is posted by that
  // user or not
  req.body.userId = req.user._id.toHexString()

  req.body.deviceOwnerAvatar = req.user.avatar

  console.log("Body >>>>>>>", req.body);
  Mobile.create(req.body, function (err, mobileDoc) {
    if (err) {
      console.log(err, " <- err in the movies create controller");
      return res.render("mobiles/addDevice.ejs");
    }
    console.log(mobileDoc, " <- movie created in db");
    res.redirect(`/mobiles/${mobileDoc._id}`);
  });
}


async function deleteDevice(req, res) {


  console.log("deleteDevice", req.params.id);
  try {
    const mobDoc = await Mobile.findById(req.params.id);

    if (!mobDoc) return res.redirect('/');

    mobDoc.remove(req.params.id);

    await mobDoc.save();

    res.redirect('/mobiles');

  } catch (err) {
    res.send(err);
  }
}