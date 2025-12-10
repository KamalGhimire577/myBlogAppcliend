

import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setLoading, setError, setSuccess } from '../store/slices/statusSlice';
import { loginAdmin } from '../store/slices/admin/admin.auth.Slice';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Please enter a valid email';
        break;
      case 'password':
        if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });
    
    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    try {
      dispatch(setLoading(true));
      const result = await dispatch(loginAdmin(formData)).unwrap();
      
      // Store token in localStorage (already done in slice)
      if (result.user) {
        localStorage.setItem('adminUser', JSON.stringify(result.user));
      }
      
      dispatch(setSuccess('Login successful!'));
      setFormData({ email: '', password: '' });
      
      // Navigate to dashboard after success
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 2000);
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-100 to-purple-200">
        <div className="w-4/5 max-w-sm bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-2xl border-2 border-orange-400 my-[10vh] transform hover:scale-105 transition-transform duration-300 shadow-orange-200/50">
          <div className="p-4 space-y-3">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-teal-600 md:text-2xl text-center mb-4">
              Admin Login
            </h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-teal-600">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="admin@example.com" 
                  required 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-teal-600">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pr-10`}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                Login
              </button>
              <p className="text-sm font-light text-teal-600">
                Don't have an account?
                <a className="font-medium text-teal-700 hover:underline" href="/admin/signup"> Sign up here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminLoginPage