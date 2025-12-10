import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "./logo";

function Footer() {
  return (
    <footer className="relative w-full mt-16 bg-white border-t border-slate-100 rounded-t-3xl shadow-lg">
      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Navigation */}
          <ul className="flex flex-col sm:flex-row text-center gap-4 sm:gap-8 font-dm text-sm font-medium text-slate-700">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
          </ul>

            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors text-lg">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-sky-500 transition-colors text-lg">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-pink-500 transition-colors text-lg">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-500 transition-colors text-lg">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        

        {/* Copyright */}
        <div className="border-t border-slate-200 text-center py-4 font-dm text-sm text-slate-600">
          © {new Date().getFullYear()} MyBlogApp. All rights reserved.
        </div>
    
    </footer>
  );
}

export default Footer;
