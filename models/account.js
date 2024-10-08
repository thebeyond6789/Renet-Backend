const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const account = new Schema({
  _id: { type: ObjectId },
  firstName: { type: String },
  lastName: { type: String },
  avata: { type: String },
  role: { type: String, default: "user" },
  birth: { type: String },
  lastTimeOnline:{type:String},
  phoneNumber: { type: Number },
  date: { type: Number },
  email: { type: String },
  password: { type: String },
});
module.exports = mongoose.models.account || mongoose.model("account", account);
