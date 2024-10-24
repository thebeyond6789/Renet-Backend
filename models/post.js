const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const post = new Schema({
  _id: {
    type: ObjectId,
  },
  post: [{ type: String }], // Mảng lưu tên file ảnh,
  title: { type: String },
  datePost: { type: String ,
    default:currentDate()
  },
  idAccount: { type: String, ref: "account" },
});
function currentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}
module.exports = mongoose.models.post || mongoose.model("post", post);
