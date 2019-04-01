const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  imageUrl: {type: String, required: true},
  userId: {type: String, required: true},
  description: String,
  tags: [String],
  createdAt: {type: String, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);