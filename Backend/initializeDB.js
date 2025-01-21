const mongoose = require("mongoose");
const BlogModel = require("./models/BlogModel");

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(async () => {
    console.log("Connected to MongoDB");

    await BlogModel.createIndexes();
    console.log("Database structure initialized");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });
