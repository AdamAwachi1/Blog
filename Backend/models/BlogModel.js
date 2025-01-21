const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogModel = mongoose.model("blogs", BlogsSchema);

module.exports = BlogModel;
