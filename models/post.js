const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const post = new Schema({
  _id: {
    type: ObjectId,
  },
  post: { type:Array},
  title: { type: String },
  datePost: { type: String },
  idAccount: { type: String, ref: "account" },
});
module.exports = mongoose.models.post || mongoose.model("post", post);
