import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getAllAuthors, deleteAuthor, getAuthorById, createAuthor, updateAuthor } from '../store/slices/admin/admin.author.slice';
import { setLoading, setError, setSuccess } from '../store/slices/statusSlice';

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Sidebar menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "authors", label: "Authors" },
    { key: "blogs", label: "Blogs" },
    { key: "comments", label: "Comments" },
    { key: "profile", label: "Admin Profile" },
    { key: "categories", label: "Categories" },
    { key: "blogAuthors", label: "Blog Authors" },
    { key: "logout", label: "Logout" },
  ];

  const dispatch = useAppDispatch();
  const { authors, loading } = useAppSelector(state => state.adminAuthor);
  const { user: adminUser } = useAppSelector(state => state.adminAuth);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any>(null);
  const [viewAuthor, setViewAuthor] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Author',
    profile: null as File | null
  });

  // Load authors when component mounts
  useEffect(() => {
    if (activeSection === 'authors') {
      dispatch(getAllAuthors());
    }
  }, [activeSection, dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await dispatch(deleteAuthor(id)).unwrap();
        dispatch(setSuccess('Author deleted successfully'));
      } catch (error) {
        dispatch(setError(error as string));
      }
    }
  };

  const handleView = async (id: string) => {
    try {
      const author = await dispatch(getAuthorById(id)).unwrap();
      setViewAuthor(author);
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const author = await dispatch(getAuthorById(id)).unwrap();
      setEditingAuthor(author);
      setFormData({
        name: author.username,
        email: author.email,
        phone: author.phone,
        password: '',
        role: typeof author.role === 'string' ? author.role : 'Author',
        profile: null
      });
      setShowEditForm(true);
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('username', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    if (formData.password) submitData.append('password', formData.password);
    submitData.append('role', formData.role);
    
    if (formData.profile) {
      submitData.append('profile', formData.profile);
    } else if (showEditForm && editingAuthor?.profile) {
      submitData.append('profile', editingAuthor.profile);
    }
    
    try {
      dispatch(setLoading(true));
      if (showEditForm && editingAuthor) {
        await dispatch(updateAuthor({ id: editingAuthor.id, formData: submitData })).unwrap();
        dispatch(setSuccess('Author updated successfully'));
        setShowEditForm(false);
        setEditingAuthor(null);
      } else {
        await dispatch(createAuthor(submitData)).unwrap();
        dispatch(setSuccess('Author created successfully'));
        setShowAddForm(false);
      }
      dispatch(getAllAuthors());
      setFormData({ name: '', email: '', phone: '', password: '', role: 'Author', profile: null });
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

  // Authors Section Component
  const AuthorsSection = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Authors Management</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Author
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">SN</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.id} className="text-center border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img 
                      src={author.profile || '/default-avatar.png'} 
                      alt={author.username}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{author.username}</td>
                  <td className="px-4 py-2">{author.email}</td>
                  <td className="px-4 py-2">{author.phone}</td>
                  <td className="px-4 py-2">{typeof author.role === 'string' ? author.role : 'Author'}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button 
                      onClick={() => author.id && handleView(author.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => author.id && handleEdit(author.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => author.id && handleDelete(author.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  // Reusable Dummy Table Component
  const DummyTable = ({ title }: { title: string }) => (
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
              <td className="px-4 py-2">{title} {id}</td>
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
        return <AuthorsSection />;
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
            <div className="bg-white shadow-md rounded-lg p-6">
              {adminUser ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={adminUser.profile || '/default-avatar.png'} 
                      alt={adminUser.username}
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{adminUser.username}</h3>
                      <p className="text-gray-600">{typeof adminUser.role === 'string' ? adminUser.role : 'Admin'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>Email:</strong> {adminUser.email}</p>
                    <p><strong>Phone:</strong> {adminUser.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-red-600">Please login to view profile</p>
              )}
            </div>
          </div>
        );
      case "logout":
        return (
          <div className="p-6 text-center text-red-600 font-bold text-xl">
            You have been logged out.
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
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

      {/* Add/Edit Author Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto border border-white/20 shadow-xl">
            <h3 className="text-lg font-bold mb-4">{showEditForm ? 'Edit Author' : 'Create New Author'}</h3>
            <form className="space-y-3" onSubmit={handleFormSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Enter full name" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="example@gmail.com" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="1234567890" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                >
                  <option value="Author">Author</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Profile Photo</label>
                {showEditForm && editingAuthor?.profile && (
                  <div className="mb-2">
                    <img 
                      src={editingAuthor.profile} 
                      alt="Current profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current profile image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  onChange={(e) => setFormData({...formData, profile: e.target.files?.[0] || null})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-teal-600">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pr-10"
                    placeholder={showEditForm ? "Leave empty to keep current" : "••••••••"} 
                    required={!showEditForm} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
                  {showEditForm ? 'Update Author' : 'Create Author'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setEditingAuthor(null);
                    setFormData({ name: '', email: '', phone: '', password: '', role: 'Author', profile: null });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 font-medium rounded-lg text-sm px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Author Modal */}
      {viewAuthor && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 max-w-md w-full mx-4 border border-white/20 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Author Details</h3>
            <div className="space-y-2">
              <p><strong>Username:</strong> {viewAuthor.username}</p>
              <p><strong>Email:</strong> {viewAuthor.email}</p>
              <p><strong>Phone:</strong> {viewAuthor.phone}</p>
              <p><strong>Role:</strong> {viewAuthor.role}</p>
            </div>
            <button
              onClick={() => setViewAuthor(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;