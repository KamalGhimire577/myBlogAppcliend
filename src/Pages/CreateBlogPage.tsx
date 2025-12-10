import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "",
    seo: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Created:", formData);
    alert("✅ Blog Created Successfully!");
    setFormData({
      title: "",
      author: "",
      type: "",
      seo: "",
      content: "",
      image: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-12 px-6 md:px-12 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            ✍️ Create a New Blog
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Share your knowledge, ideas, or story with the world. Fill out the
            form below to publish your blog post.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a catchy title"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Blog Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Blog Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
              </select>
            </div>

            {/* SEO Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                SEO Description
              </label>
              <textarea
                name="seo"
                value={formData.seo}
                onChange={handleChange}
                placeholder="Short description (150-160 characters for SEO)"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24"
                maxLength="160"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.seo.length}/160 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-48"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>

              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition text-gray-500 hover:text-indigo-600"
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mb-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 014-4h10a4 4 0 014 4m-4-4v4m0 0l-3-3m3 3l3-3"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Click to add image
                    </span>
                  </>
                )}
              </label>

              <input
                id="imageUpload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
              >
                🚀 Publish Blog
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CreateBlogPage;
