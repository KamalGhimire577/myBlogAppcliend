import { useState } from "react";

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Sidebar menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "authors", label: "Authors" },
    { key: "blogs", label: "Blogs" },
    { key: "categories", label: "Categories" },
    { key: "blogAuthors", label: "Blog Authors" },
    { key: "comments", label: "Comments" },
    { key: "profile", label: "Admin Profile" },
    { key: "logout", label: "Logout" },
  ];

  // Reusable Dummy Table Component
  const DummyTable = ({ title }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((id) => (
            <tr key={id} className="text-center border-b">
              <td className="px-4 py-2">{id}</td>
              <td className="px-4 py-2">
                {title} {id}
              </td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Content for each section
  const renderSection = () => {
    switch (activeSection) {
      case "authors":
        return <DummyTable title="Authors" />;
      case "blogs":
        return <DummyTable title="Blogs" />;
      case "categories":
        return <DummyTable title="Categories" />;
      case "blogAuthors":
        return <DummyTable title="Blog Authors" />;
      case "comments":
        return <DummyTable title="Comments" />;
      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p>
                <strong>Name:</strong> Admin User
              </p>
              <p>
                <strong>Email:</strong> admin@example.com
              </p>
              <p>
                <strong>Role:</strong> Super Admin
              </p>
            </div>
          </div>
        );
      case "logout":
        return (
          <div className="p-6 text-center text-red-600 font-bold text-xl">
            🚪 You have been logged out.
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Authors</h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Blogs</h3>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Comments</h3>
                <p className="text-2xl font-bold text-purple-600">120</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col rounded-r-2xl">
        <div className="p-4 font-bold text-xl text-center border-b border-gray-600">
          Admin Panel
        </div>
        <div className="flex-1 flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`flex items-center px-4 py-2 rounded-xl transition ${
                activeSection === item.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderSection()}</div>
    </div>
  );
};

export default AdminDashboardPage;
