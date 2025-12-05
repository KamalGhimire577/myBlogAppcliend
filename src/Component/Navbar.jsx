import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./logo";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center justify-center gap-6 md:flex">
          <li className="pt-1.5 font-dm text-sm font-medium text-slate-700">
            <Link to="/">Home</Link>
          </li>
          <li className="pt-1.5 font-dm text-sm font-medium text-slate-700">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="pt-1.5 font-dm text-sm font-medium text-slate-700">
            <Link to="/about">About</Link>
          </li>
          <li className="pt-1.5 font-dm text-sm font-medium text-slate-700">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex-grow" />

        {/* Desktop Actions */}
        <div className="hidden items-center justify-center gap-6 md:flex">
          <Link
            to="/login"
            className="font-dm text-sm font-medium text-slate-700"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
             Author Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="relative flex items-center justify-center md:hidden">
          <button 
            type="button" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-auto text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
              />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-6 py-4 space-y-4">
            <Link to="/" className="block font-dm text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/blog" className="block font-dm text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="block font-dm text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block font-dm text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <Link to="/login" className="block font-dm text-sm font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>Sign in</Link>
              <Link to="/signup" className="block rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 font-dm text-sm font-medium text-white text-center" onClick={() => setIsMenuOpen(false)}>Author Signup</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
