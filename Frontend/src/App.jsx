import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Blogs from "./components/blogs";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetails";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {user ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-24">
                  <div className="p-4">
                    <Blogs />
                  </div>
                  <div className="p-4">
                    <CreateBlog user={user} />
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold">
                    Blogs will display when you log in.
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Please log in to view or create blogs.
                  </p>
                </div>
              )}
            </div>
          }
        />
        {user && <Route path="/blogs/:id" element={<BlogDetail />} />}
      </Routes>
    </Router>
  );
}

export default App;
