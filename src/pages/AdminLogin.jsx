import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminLogin = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAdmin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
// AdminLogin.jsx mein login function ke andar
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const result = await login(username, password);
  
  if (result.success) {
    console.log('✅ Login successful, navigating to dashboard');
    navigate('/admin/dashboard'); // ✅ Correct navigation
    // navigate('/admin'); // ❌ Wrong - yeh route exist nahi karta
  } else {
    setError(result.error);
  }
};

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div>
          <div className="mx-auto h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Login
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Access the admin dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.username ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
                placeholder="Enter admin username"
              />
              {errors.username && (
                <p className="mt-1 text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.password ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
                placeholder="Enter admin password"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {errors.submit}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              } ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}
            >
              {loading ? 'Signing in...' : 'Sign in as Admin'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`text-sm ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
              } transition-colors duration-300`}
            >
              ← Back to Home
            </button>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className={`mt-6 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <h4 className={`text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Demo Credentials:
          </h4>
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Username: <span className="font-mono">admin</span><br/>
            Password: <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;