const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema(
  {
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    userName: String,
    userAvatar: String
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
  deviceDisplay: String,
  deviceModel: String,
  deviceName: {
    type: String,
    required: true,
  },
  feedback: [feedbackSchema],
});


module.exports = mongoose.model("Mobile", mobileSchema);
