const mongoose = require("mongoose");


const feedBackSchema = new mongoose.Schema(
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
  hideEmail: String,
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
  reviews: [feedBackSchema],
});

module.exports = mongoose.model("Mobile", mobileSchema);
