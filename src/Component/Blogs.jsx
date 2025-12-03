import { useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 font-sans">
      {/* Secondary Navbar with Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 mb-8">
        <div className="flex justify-between items-center w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            All Articles
          </h2>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mt-4 md:mt-0 w-full md:w-72">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
          {/* Inline Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
            />
          </svg>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>

          {/* Signup & Login */}
          <Link
            to="/create"
            className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Create Own Articles
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mb-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Link
            to="/create"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition text-center"
          >
            Create Own Articles
          </Link>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Blog Card 1 */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Blog post"
              className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-blue-500">
              Technology
            </span>
            <h3 className="mt-3 text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
              The Future of Web Development in 2023
            </h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Explore the emerging trends and technologies that are shaping the
              future of web development this year.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-gray-500">
              <span>June 15, 2023</span>
              <span className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                  alt="Author"
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
                Sarah Johnson
              </span>
            </div>
          </div>
        </article>

        {/* Blog Card 2 */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
              alt="Blog post"
              className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-green-500">
              Business
            </span>
            <h3 className="mt-3 text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
              5 Strategies for Growing Your Online Business
            </h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Learn proven strategies to scale your online business and reach
              new customers effectively.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-gray-500">
              <span>June 10, 2023</span>
              <span className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Author"
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
                Michael Chen
              </span>
            </div>
          </div>
        </article>

        {/* Blog Card 3 */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80"
              alt="Blog post"
              className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-purple-500">
              Design
            </span>
            <h3 className="mt-3 text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
              UX Design Principles for Better Conversions
            </h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              How applying fundamental UX principles can significantly improve
              your website's conversion rates.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-gray-500">
              <span>June 5, 2023</span>
              <span className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80"
                  alt="Author"
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
                Emma Rodriguez
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Blogs;
