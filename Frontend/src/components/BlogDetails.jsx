import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/getBlog/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">By {blog.author}</p>
      <p className="text-lg">{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
