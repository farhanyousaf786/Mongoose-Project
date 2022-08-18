const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema(
  {
    content: String,
    userName: String,
    userAvatar: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  },
  {
    timestamps: true,
  }
);


const mobileSchema = new mongoose.Schema({
  deviceOwner: String,
  deviceOwnerAvatar: String,
  deviceOwnerEmail: String,
  devicePrice: String,
  deviceImage: String,
  deviceRam: String,
  deviceRom: String,
  deviceName: String,
  userId: String,
  feedback: [feedbackSchema],
});


module.exports = mongoose.model("Mobile", mobileSchema);
