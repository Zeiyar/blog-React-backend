const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  username: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);