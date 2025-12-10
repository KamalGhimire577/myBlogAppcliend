"use client";

import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-rose-100 via-orange-100 to-yellow-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to{" "}
            <span className="font-semibold text-rose-600">Our Blog</span> 🌱 — a
            place where ideas, knowledge, and stories come to life.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our mission is to create a space where readers can explore diverse
            topics, learn new perspectives, and share meaningful insights. From
            technology and lifestyle to personal growth and creativity, our blog
            covers it all.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We believe in the power of words ✍️ to inspire, connect, and
            transform. Through this platform, we aim to build a community of
            curious minds and passionate storytellers.
          </p>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <Link
              to="/"
              className="px-6 py-3 bg-rose-500 text-white rounded-xl shadow-md hover:bg-rose-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition duration-300"
            >
              Read Blog
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
