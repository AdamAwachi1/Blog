const mongoose = require("mongoose");
const UserModel = require("./models/BlogModel");

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(async () => {
    console.log("Connected to MongoDB");

    await UserModel.createIndexes();
    console.log("Database structure initialized");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });
