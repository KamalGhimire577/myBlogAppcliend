import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("✅ Login Successful!");
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <section className="bg-[#200052] min-h-screen flex items-center justify-center">
        <svg
          className="absolute top-0 w-full"
          viewBox="0 0 1437 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0415039 108.599L15 93.6191C29.9584 78.8634 59.8754 48.5667 89.7923 33.8111C119.709 18.831 149.626 18.8309 179.543 18.8309C209.46 18.8309 239.377 18.831 269.294 45.7614C299.211 72.6919 337.083 42.1423 367 69.0728C373 111.573 434.625 87.672 464.542 81.6687C494.458 75.8899 541.125 84.474 571.042 81.6687C600.958 78.8634 636.083 126.385 666 108.599C695.917 90.4772 700.583 108.767 730.5 93.6191C760.417 78.4707 791.083 72.8602 821 93.6191C850.917 114.378 867.633 60.9098 897.55 63.715C927.467 66.5203 948.083 87.8403 978 63.715C1007.92 39.5898 1047.13 42.9562 1077.05 42.7879C1106.97 42.9562 1136.89 66.5203 1166.8 63.715C1196.72 60.9098 1226.64 30.6131 1256.55 39.7582C1286.47 48.5667 1316.39 96.8171 1346.3 111.573C1376.22 126.553 1381.54 90.6455 1396.5 81.6687L1436.05 90.6455V0.877274H1421.1C1406.14 0.877274 1376.22 0.877274 1346.3 0.877274C1316.39 0.877274 1286.47 0.877274 1256.55 0.877274C1226.64 0.877274 1196.72 0.877274 1166.8 0.877274C1136.89 0.877274 1106.97 0.877274 1077.05 0.877274C1047.13 0.877274 1017.22 0.877274 987.3 0.877274C957.384 0.877274 927.467 0.877274 897.55 0.877274C867.633 0.877274 837.716 0.877274 807.799 0.877274C777.882 0.877274 747.965 0.877274 718.048 0.877274C688.131 0.877274 658.214 0.877274 628.297 0.877274C598.38 0.877274 568.463 0.877274 538.546 0.877274C508.629 0.877274 478.713 0.877274 448.796 0.877274C418.879 0.877274 388.962 0.877274 359.045 0.877274C329.128 0.877274 299.211 0.877274 269.294 0.877274C239.377 0.877274 209.46 0.877274 179.543 0.877274C149.626 0.877274 119.709 0.877274 89.7923 0.877274C59.8754 0.877274 29.9584 0.877274 15 0.877274H0.0415039V108.599Z"
            fill="#7A0BC0"
          ></path>
        </svg>

        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-6 bg-[#270082] p-8 rounded-3xl w-full max-w-md z-10"
        >
          <h1 className="text-center text-white text-5xl font-bold tracking-wide">
            Login
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 rounded-full text-xl bg-[#270082] border-2 border-[#7A0BC0] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#fa58b6]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 rounded-full text-xl bg-[#270082] border-2 border-[#7A0BC0] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#fa58b6]"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] text-white text-2xl font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>

          <p className="text-center text-white">
            Don't have an account?{" "}
            <Link to="/signup">
              {" "}
              <span className="text-[#fa58b6] cursor-pointer underline">
                Sign Up
              </span>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
