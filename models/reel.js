const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const reel = new Schema({
  _id: {
    type: ObjectId,
  },
  video: { type: String },
  title: { type: String },
  content: { type: String },
  dateReel: { type: String },
  idAccount: { type: String, ref: "account" },
});
module.exports = mongoose.models.reel || mongoose.model("reel", reel);
