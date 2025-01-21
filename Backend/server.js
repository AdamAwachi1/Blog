const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const UserModel = require("./models/BlogModel"); // Import the Blog model

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/getBlogs", (req, res) => {
  UserModel.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ error: "Error fetching blogs" });
    });
});

app.get("/getBlog/:id", (req, res) => {
  const { id } = req.params;

  UserModel.findById(id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    })
    .catch((err) => {
      console.error("Error fetching blog:", err);
      res.status(500).json({ error: "Error fetching blog" });
    });
});

app.post("/createBlog", (req, res) => {
  const { title, author, content } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newBlog = new UserModel({ title, author, content });

  newBlog
    .save()
    .then(() => res.status(201).json({ message: "Blog created successfully!" }))
    .catch((err) => {
      console.error("Error creating blog:", err);
      res.status(500).json({ error: "Error creating blog" });
    });
});

app.listen(3001, () => {
  console.log("Server is Running on http://localhost:3001");
});
