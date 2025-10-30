// 
// const API_BASE_URL = 'http://localhost:5000/api';

// // export const blogService = {
// //   // Get all blogs with optional category filter
// //   async getBlogs(category = 'All') {
// //     try {
// //       const url = category === 'All' 
// //         ? `${API_BASE_URL}/blogs`
// //         : `${API_BASE_URL}/blogs?category=${category}`;
      
// //       console.log('🌐 Fetching blogs from:', url);
      
// //       const response = await fetch(url);
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
// //       }
      
// //       const data = await response.json();
// //       console.log('📥 Received blogs:', data);
// //       console.log('🔢 Posts count:', data.posts?.length || 0);
      
// //       return data;
      
// //     } catch (error) {
// //       console.error('❌ Error fetching blogs:', error);
// //       throw new Error('Failed to fetch blogs: ' + error.message);
// //     }
// //   },

// //   // Get single blog by ID
// //   async getBlogById(id) {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch blog');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Error fetching blog:', error);
// //       throw error;
// //     }
// //   },

// //   // Get all categories
// //   async getCategories() {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/categories`);
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch categories');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Error fetching categories:', error);
// //       throw error;
// //     }
// //   },

// //   // Health check
// //   async healthCheck() {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/health`);
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Health check error:', error);
// //       throw error;
// //     }
// //   }
// // };


// const API_BASE_URL = 'http://localhost:5000/api';

// export const blogService = {
//   async getBlogs(category = 'All') {
//     try {
//       const url = category === 'All' 
//         ? `${API_BASE_URL}/blogs`
//         : `${API_BASE_URL}/blogs?category=${category}`;
      
//       console.log('🌐 Fetching blogs from:', url);
      
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log('📥 Received blogs:', data);
//       return data;
      
//     } catch (error) {
//       console.error('❌ Error fetching blogs:', error);
//       throw new Error('Failed to fetch blogs: ' + error.message);
//     }
//   },

//   async getBlogById(id) {
//     try {
//       // Validate ID
//       if (!id || id === 'undefined') {
//         throw new Error('Invalid blog ID');
//       }

//       console.log('🌐 Fetching blog by ID:', id);
//       const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch blog: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('📥 Received blog:', data);
//       return data;
      
//     } catch (error) {
//       console.error('❌ Error fetching blog:', error);
//       throw new Error('Failed to fetch blog: ' + error.message);
//     }
//   },
//   async getCategories() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/categories`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       throw error;
//     }
//   },

//   // Health check
//   async healthCheck() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/health`);
//       return await response.json();
//     } catch (error) {
//       console.error('Health check error:', error);
//       throw error;
//     }
//   }

//   // ... rest of the functions
// };


// const API_BASE_URL = 'http://localhost:5000/api';





const API_BASE_URL = 'https://backend-llg1.vercel.app/api';
export const blogService = {
  // Get all blogs with optional category filter
  async getBlogs(category = 'All') {
    try {
      const url = category === 'All' 
        ? `${API_BASE_URL}/blogs`
        : `${API_BASE_URL}/blogs?category=${category}`;
      
      console.log('🌐 Fetching blogs from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📥 Received blogs:', data);
      console.log('🔢 Posts count:', data.posts?.length || 0);
      
      return data;
      
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      throw new Error('Failed to fetch blogs: ' + error.message);
    }
  },

  // Get single blog by ID
  async getBlogById(id) {
    try {
      // Validate ID
      if (!id || id === 'undefined') {
        throw new Error('Invalid blog ID');
      }

      console.log('🌐 Fetching blog by ID:', id);
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Received blog:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Error fetching blog:', error);
      throw new Error('Failed to fetch blog: ' + error.message);
    }
  },

  // Get all categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
};