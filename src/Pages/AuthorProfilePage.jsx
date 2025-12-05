import { useState } from "react";
import NavBar from "../Component/Navbar";
import Footer from "../Component/Footer";

const AuthorProfilePage = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate writer and blogger"
  });
  const [blogs, setBlogs] = useState([
    { id: 1, title: "My First Blog", status: "Published", comments: 5 },
    { id: 2, title: "React Tips", status: "Draft", comments: 2 },
  ]);

  const [comments, setComments] = useState([
    { id: 1, blogId: 1, author: "John", text: "Great post!", date: "2023-12-01" },
    { id: 2, blogId: 1, author: "Jane", text: "Very helpful", date: "2023-12-02" },
  ]);

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Author Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your blogs and comments</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap gap-2 sm:gap-8 px-4 sm:px-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "blogs"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  My Blogs ({blogs.length})
                </button>
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "comments"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Comments ({comments.length})
                </button>
                <button
                  onClick={() => setActiveTab("create")}
                  className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "create"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Create New
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "settings"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {/* Blogs Tab */}
              {activeTab === "blogs" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Blogs</h2>
                  </div>
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{blog.title}</h3>
                            <p className="text-sm text-gray-600">
                              Status: <span className={`px-2 py-1 rounded text-xs ${
                                blog.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}>{blog.status}</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{blog.comments} comments</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteBlog(blog.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Blog Comments</h2>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{comment.author}</p>
                            <p className="text-gray-700 mt-1">{comment.text}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Blog ID: {comment.blogId} • {comment.date}
                            </p>
                          </div>
                          <button 
                            onClick={() => deleteComment(comment.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 self-start"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Create Tab */}
              {activeTab === "create" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Create New Blog</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                      <textarea
                        rows="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your blog content here..."
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Publish
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto sm:mx-0">
                        {profile.name.charAt(0)}
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold">{profile.name}</h3>
                        <p className="text-gray-600">{profile.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          rows="3"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Change Password
                        </button>
                      </form>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h3 className="text-lg font-semibold mb-4 text-red-800">Danger Zone</h3>
                      <p className="text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthorProfilePage;