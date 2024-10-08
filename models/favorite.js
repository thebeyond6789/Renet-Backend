const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const favorite = new Schema({
  _id: { type: ObjectId },
  icon: { type: String },
  idAccount: { type: String, ref: "account" },
  idPost: { type: String, ref: "post" },
  idReel: { type: String, ref: "reel" },
});
module.exports =
  mongoose.models.favorite || mongoose.model("favorite", favorite);
