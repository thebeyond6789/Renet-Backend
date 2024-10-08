const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const comment = new Schema({
  _id: { type: ObjectId },
  comment: { type: String },
  repComment: { type: String },
  dateComment: { type: String },
  idAccount: { type: String, ref: "account" },
  idPost: { type: String, ref: "post" },
  idReel: { type: String, ref: "reel" },
});
module.exports = mongoose.models.comment || mongoose.model("comment", comment);
