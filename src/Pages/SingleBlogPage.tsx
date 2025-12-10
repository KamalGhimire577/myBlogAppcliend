import { useState } from "react";
import NavBar from "../Component/Navbar";
import Footer from "../Component/Footer";

const SingleBlogPage = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      comment: "Great article! Very informative.",
      date: "2023-12-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "Thanks for sharing this valuable content.",
      date: "2023-12-02"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: "Anonymous",
        comment: comment,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <>
    <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Blog post header */}
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Blog post title</h1>
            <p className="text-gray-500 text-sm">
              Published on <time dateTime="2022-04-05">April 5, 2022</time>
            </p>
          </div>
          {/* Featured image */}
          <img
            src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c"
            alt="Featured image"
            className="w-full h-auto mb-8"
          />
          {/* Blog post content */}
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto mb-12">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              varius fringilla augue, vel vestibulum nisl mattis vel. Praesent
              porttitor pharetra purus eu tincidunt.
              Nullam vitae sapien non est suscipit blandit quis sit amet ipsum.
              Aliquam euismod accumsan nunc, in convallis felis luctus in. Sed
              rhoncus metus a elit rutrum aliquam.
              Integer ullamcorper leo nulla, nec commodo metus vehicula eget.
              Duis vel vestibulum tellus, eget mattis quam. Nullam euismod
              libero sed nibh tristique, vel eleifend risus sagittis. In hac
              habitasse platea dictumst. Sed dapibus magna at arcu euismod, a
              pulvinar turpis tristique. Suspendisse imperdiet velit nec lectus
              rutrum varius.
            </p>
          </div>

          {/* Comment Section */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </form>

            {/* Comments Display */}
            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{c.name}</h4>
                    <span className="text-sm text-gray-500">{c.date}</span>
                  </div>
                  <p className="text-gray-700">{c.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default SingleBlogPage;