require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const BlogModel = require("./models/BlogModel");
const UserModel = require("./models/UserModel");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/getBlogs", (req, res) => {
  BlogModel.find({})
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

  BlogModel.findById(id)
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

  const newBlog = new BlogModel({ title, author, content });

  newBlog
    .save()
    .then(() => res.status(201).json({ message: "Blog created successfully!" }))
    .catch((err) => {
      console.error("Error creating blog:", err);
      res.status(500).json({ error: "Error creating blog" });
    });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.error("Missing fields:", { name, email, password });
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.error("Email already in use:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("User registered successfully:", newUser);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error in /signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
