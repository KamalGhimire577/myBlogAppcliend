import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
function Footer() {
  return (
    <footer className="relative w-full text-white bg-gradient-to-r from-blue-600 via-white to-rose-500">
      {/* Overlay for dark effect (optional, remove if you want clean gradient) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <Link to="/" className="flex justify-center">
            <span className="text-2xl font-bold text-indigo-900">MyBrand</span>
          </Link>

          {/* Navigation */}
          <ul className="flex flex-col sm:flex-row text-center gap-4 sm:gap-8 text-indigo-900 font-medium">
            <li><Link to="/" className="hover:text-gray-700">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-700">Products</Link></li>
            <li><Link to="/resources" className="hover:text-gray-700">Resources</Link></li>
            <li><Link to="/blog" className="hover:text-gray-700">Blog</Link></li>
            <li><Link to="/support" className="hover:text-gray-700">Support</Link></li>
          </ul>

          {/* Social Icons */}
         {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-xl">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 text-xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 text-xl">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-xl">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
        

        {/* Copyright */}
        <div className="relative border-t border-gray-300 text-center py-4 text-sm text-gray-700">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
