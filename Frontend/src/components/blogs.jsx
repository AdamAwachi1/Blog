import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

function Blogs() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/getBlogs")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleView = (id) => {
    navigate(`/blogs/${id}`);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-8">Created Blogs</h1>
      <div className="flex space-x-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-700 w-1/2">Title</h2>
        <h2 className="text-lg font-semibold text-gray-700 w-1/4">Author</h2>
      </div>
      <div>
        {paginatedData.map((blog, index) => (
          <div
            key={index}
            className="flex space-x-8 py-3 border-b border-gray-200 hover:bg-gray-50 transition duration-200"
          >
            <p className="w-1/2 text-lg text-gray-900">{blog.title}</p>
            <p className="w-1/4 text-lg text-gray-600">{blog.author}</p>
            <button
              onClick={() => handleView(blog._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              View
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          <GrFormPrevious />
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default Blogs;
