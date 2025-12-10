import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from '../hooks/redux';
import { setLoading, setError, setSuccess } from '../store/slices/statusSlice';
import { registerAuthor } from '../store/slices/auth/auth.slice';
import BackButton from "../Component/BackButton";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profile: null as File | null
  });
  
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'userName':
        if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Please enter a valid email';
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) error = 'Phone number must be 10 digits';
        break;
      case 'password':
        if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match';
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === 'profile' && files) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        dispatch(setError('File size must be less than 10MB'));
        return;
      }
      setFormData({ ...formData, profile: file });
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'profile') {
        validateField(key, formData[key as keyof typeof formData] as string);
      }
    });
    
    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('username', formData.userName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('password', formData.password);
    if (formData.profile) {
      submitData.append('profile', formData.profile);
    }
    
    try {
      dispatch(setLoading(true));
      await dispatch(registerAuthor(submitData)).unwrap();
      dispatch(setSuccess('Registration successful!'));
      setFormData({ userName: "", email: "", password: "", confirmPassword: "", phone: "", profile: null });
      // Navigate to login page after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      dispatch(setError(error as string));
    }
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
          className="relative flex flex-col gap-4 bg-[#270082] p-6 rounded-3xl w-full max-w-md z-10"
        >
          <div className="flex items-center justify-between">
            <BackButton className="w-8 h-8" />
            <h1 className="text-center text-white text-3xl font-bold tracking-wide flex-1">
              Sign Up
            </h1>
          </div>

          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full text-lg bg-[#270082] border-2 border-[#7A0BC0] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#fa58b6]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full text-lg bg-[#270082] border-2 border-[#7A0BC0] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#fa58b6]"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full text-lg bg-[#270082] border-2 border-[#7A0BC0] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#fa58b6]"
          />
          <div className="relative">
            <input
              type="file"
              name="profile"
              onChange={handleChange}
              accept="image/*"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full px-4 py-2 rounded-full text-lg bg-[#270082] border-2 border-[#7A0BC0] text-white flex items-center gap-2 cursor-pointer">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{formData.profile ? formData.profile.name : 'Choose Profile Photo'}</span>
            </div>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-12 rounded-full text-lg bg-[#270082] border-2 border-orange-500 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-lg focus:shadow-orange-400/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center z-10"
            >
              {showPassword ? (
                <svg className="w-5 h-5 text-orange-400 hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-orange-400 hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-12 rounded-full text-lg bg-[#270082] border-2 border-orange-500 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-lg focus:shadow-orange-400/50"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center z-10"
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5 text-orange-400 hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-orange-400 hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] text-white text-xl font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </button>

          <p className="text-center text-white text-sm">
            Already have an account?{" "}
         <Link to="/login"  > <span className="text-[#fa58b6] cursor-pointer underline">
              Login
            </span></Link>
          </p>
        </form>
      </section>
      
    </>
  );
};

export default SignupPage;
