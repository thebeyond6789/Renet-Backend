const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const notification = new Schema({
  _id: { type: ObjectId },
  content: { type: String },
  dateNotification: { type: String },
  idAccount: { type: String, ref: "account" },
});
module.exports =
  mongoose.models.notification || mongoose.model("notification", notification);
