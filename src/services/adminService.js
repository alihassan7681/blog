// const API_BASE_URL = 'http://localhost:5000/api';

const API_BASE_URL = 'https://backend-llg1.vercel.app/api';

export const adminService = {
  // Admin Login
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      return data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  },

  // Add new blog post
  async addBlogPost(blogData, token) {
    try {
      console.log('Adding blog post:', blogData);
      
      const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add blog post');
      }

      console.log('Blog post added successfully:', data);
      return data;
    } catch (error) {
      console.error('Add blog post error:', error);
      throw error;
    }
  },

  // Get all blog posts (for admin)
  async getBlogPosts(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      return await response.json();
    } catch (error) {
      console.error('Get blog posts error:', error);
      throw error;
    }
  },

  // Delete blog post
  async deleteBlogPost(id, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete blog post');
      }

      return data;
    } catch (error) {
      console.error('Delete blog post error:', error);
      throw error;
    }
  },

  // Update blog post
  async updateBlogPost(id, blogData, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update blog post');
      }

      return data;
    } catch (error) {
      console.error('Update blog post error:', error);
      throw error;
    }
  },

  // Check admin authentication
  async checkAuth(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/check-auth`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Check auth error:', error);
      throw error;
    }
  },
// adminService.js - addBlogPost function fix
async addBlogPost(blogData, token) {
  try {
    console.log('📝 Sending blog data:', blogData);
    console.log('🔑 Using token:', token);
    
    const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(blogData)
    });
    
    console.log('📝 Add blog response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Add blog failed:', errorText);
      throw new Error(`Failed to add blog: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📝 Add blog success:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Add blog post error:', error);
    throw new Error('Failed to add blog post: ' + error.message);
  }
},
};


