import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Blogs from "./components/blogs";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
              <div className="p-4">
                <Blogs />
              </div>
              <div className="p-4">
                <CreateBlog />
              </div>
            </div>
          }
        />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
