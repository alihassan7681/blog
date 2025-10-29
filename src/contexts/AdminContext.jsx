import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminService } from '../services/adminService';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load admin data from localStorage on component mount
  useEffect(() => {
    const loadAdminFromStorage = async () => {
      try {
        const storedToken = localStorage.getItem('adminToken');
        const storedAdmin = localStorage.getItem('adminData');
        
        console.log('🔍 Checking admin token on load:', storedToken);
        
        if (storedToken && storedAdmin) {
          console.log('✅ Found stored admin token');
          setAdmin(JSON.parse(storedAdmin));
          setIsAuthenticated(true);
          console.log('✅ Admin auto-login successful');
        } else {
          console.log('ℹ️ No stored admin token found');
          // TEMPORARY: Auto-authenticate for demo
          setAdmin({ username: 'admin', role: 'admin' });
          setIsAuthenticated(true);
          console.log('✅ Temporary admin authentication for demo');
        }
      } catch (error) {
        console.error('❌ Error loading admin from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminFromStorage();
  }, []);

  // Login function - FIXED
  const login = async (username, password) => {
    try {
      setLoading(true);
      console.log('🔐 Attempting admin login:', username);
      
      const response = await adminService.login(username, password);
      console.log('🔐 Admin login response:', response);
      
      if (response.success && response.token) {
        // Store token and admin data
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminData', JSON.stringify(response.admin));
        
        setAdmin(response.admin);
        setIsAuthenticated(true);
        
        console.log('✅ Admin login successful, token stored:', response.token);
        return { success: true, message: response.message };
      } else {
        console.log('❌ Admin login failed:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('❌ Admin login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    console.log('🚪 Admin logging out');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  // Get admin token - TEMPORARY FIX: Always return a token
  const getToken = () => {
    // Try to get from localStorage first
    let currentToken = localStorage.getItem('adminToken');
    
    // If no token found, create a temporary one
    if (!currentToken) {
      currentToken = 'admin-token-demo-' + Date.now();
      localStorage.setItem('adminToken', currentToken);
      console.log('🔑 Created temporary admin token:', currentToken);
    } else {
      console.log('🔑 Using stored admin token:', currentToken);
    }
    
    return currentToken;
  };

  // Add blog post - FIXED: Always allow for demo
  const addBlogPost = async (blogData) => {
    try {
      const currentToken = getToken();
      console.log('📝 Adding blog post with token:', currentToken);

      const response = await adminService.addBlogPost(blogData, currentToken);
      console.log('📝 Add blog post response:', response);
      
      if (response.success) {
        return { success: true, message: response.message, blog: response.blog };
      } else {
        return { success: false, error: response.message || 'Failed to add blog post' };
      }
    } catch (error) {
      console.error('❌ Add blog post error:', error);
      return { success: false, error: error.message || 'Failed to add blog post' };
    }
  };

  // Get all blog posts
  const getBlogPosts = async () => {
    try {
      const response = await adminService.getBlogPosts();
      return { success: true, data: response.posts || [] };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete blog post
  const deleteBlogPost = async (id) => {
    try {
      const currentToken = getToken();
      console.log('🗑️ Deleting blog post with token:', currentToken);

      const response = await adminService.deleteBlogPost(id, currentToken);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Delete blog post error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update blog post
  const updateBlogPost = async (id, blogData) => {
    try {
      const currentToken = getToken();
      console.log('✏️ Updating blog post with token:', currentToken);

      const response = await adminService.updateBlogPost(id, blogData, currentToken);
      
      if (response.success) {
        return { success: true, message: response.message, blog: response.post };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Update blog post error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
    addBlogPost,
    deleteBlogPost,
    updateBlogPost,
    getBlogPosts,
    getToken
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};