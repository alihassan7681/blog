// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAdmin } from '../contexts/AdminContext';

// const AdminDashboard = ({ isDarkMode }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     image: '',
//     category: 'BUSINESS',
//     tags: ''
//   });
//   const [errors, setErrors] = useState({});
//   const { admin, logout, addBlogPost, deleteBlogPost, updateBlogPost, getBlogPosts, loading } = useAdmin();
//   const navigate = useNavigate();

//   // Load posts on component mount
//   useEffect(() => {
//     loadPosts();
//   }, []);

//   const loadPosts = async () => {
//     const result = await getBlogPosts();
//     if (result.success) {
//       setPosts(result.data || []);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
//     if (!formData.image.trim()) {
//       newErrors.image = 'Image URL is required';
//     }
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     const blogData = {
//       ...formData,
//       tags: formData.tags
//     };

//     console.log('📤 Sending blog data:', blogData);

//     const result = await addBlogPost(blogData);
    
//     if (result.success) {
//       alert('Blog post added successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         content: '',
//         image: '',
//         category: 'BUSINESS',
//         tags: ''
//       });
//       setShowAddForm(false);
//       loadPosts(); // Refresh posts list
//     } else {
//       setErrors({ submit: result.error });
//       console.error('Add blog post error:', result.error);
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     const blogData = {
//       ...formData,
//       tags: formData.tags
//     };

//     const result = await updateBlogPost(selectedPost.id, blogData);
    
//     if (result.success) {
//       alert('Blog post updated successfully!');
//       setShowEditForm(false);
//       setSelectedPost(null);
//       loadPosts(); // Refresh posts list
//     } else {
//       setErrors({ submit: result.error });
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
//       const result = await deleteBlogPost(id);
//       if (result.success) {
//         alert('Blog post deleted successfully!');
//         loadPosts(); // Refresh posts list
//       } else {
//         alert('Error deleting post: ' + result.error);
//       }
//     }
//   };

//   const handleEdit = (post) => {
//     setSelectedPost(post);
//     setFormData({
//       title: post.title,
//       description: post.description,
//       content: post.content || '',
//       image: post.image,
//       category: post.category,
//       tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
//     });
//     setShowEditForm(true);
//     setShowAddForm(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const resetForms = () => {
//     setShowAddForm(false);
//     setShowEditForm(false);
//     setSelectedPost(null);
//     setFormData({
//       title: '',
//       description: '',
//       content: '',
//       image: '',
//       category: 'BUSINESS',
//       tags: ''
//     });
//     setErrors({});
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//     }`}>
//       {/* Header */}
//       <div className={`border-b ${
//         isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">A</span>
//               </div>
//               <span className={`text-xl font-bold ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Admin Dashboard
//               </span>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <span className={`text-sm ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
//               }`}>
//                 Welcome, {admin?.username}
//               </span>
//               <button
//                 onClick={() => {
//                   resetForms();
//                   setShowAddForm(true);
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
//               >
//                 Add New Post
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Add Blog Form */}
//         {showAddForm && (
//           <div className={`mb-8 p-6 rounded-2xl shadow-lg ${
//             isDarkMode ? 'bg-gray-800' : 'bg-white'
//           }`}>
//             <h2 className={`text-2xl font-bold mb-6 ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               Add New Blog Post
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Form fields same as before */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Title *
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                       errors.title ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter blog title"
//                   />
//                   {errors.title && (
//                     <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                       errors.category ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                     }`}
//                   >
//                     <option value="BUSINESS">Business</option>
//                     <option value="TECHNOLOGY">Technology</option>
//                     <option value="FINANCE">Finance</option>
//                     <option value="LIFESTYLE">Lifestyle</option>
//                     <option value="CAREERS">Careers</option>
//                     <option value="DESIGN">Design</option>
//                   </select>
//                   {errors.category && (
//                     <p className="mt-1 text-red-500 text-sm">{errors.category}</p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     errors.description ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter blog description"
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Content
//                 </label>
//                 <textarea
//                   name="content"
//                   value={formData.content}
//                   onChange={handleChange}
//                   rows="5"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter full blog content (optional)"
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Image URL *
//                 </label>
//                 <input
//                   type="url"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     errors.image ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="https://images.unsplash.com/photo-..."
//                 />
//                 {errors.image && (
//                   <p className="mt-1 text-red-500 text-sm">{errors.image}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Tags (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Business, Finance, Tips"
//                 />
//               </div>

//               {errors.submit && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
//                   {errors.submit}
//                 </div>
//               )}

//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={resetForms}
//                   className={`px-6 py-2 border rounded-lg transition-colors duration-300 ${
//                     isDarkMode 
//                       ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50"
//                 >
//                   {loading ? 'Adding...' : 'Add Blog Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Edit Blog Form */}
//         {showEditForm && (
//           <div className={`mb-8 p-6 rounded-2xl shadow-lg ${
//             isDarkMode ? 'bg-gray-800' : 'bg-white'
//           }`}>
//             <h2 className={`text-2xl font-bold mb-6 ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               Edit Blog Post
//             </h2>

//             <form onSubmit={handleEditSubmit} className="space-y-6">
//               {/* Same form fields as Add form */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Title *
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                       errors.title ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter blog title"
//                   />
//                   {errors.title && (
//                     <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                       errors.category ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                     }`}
//                   >
//                     <option value="BUSINESS">Business</option>
//                     <option value="TECHNOLOGY">Technology</option>
//                     <option value="FINANCE">Finance</option>
//                     <option value="LIFESTYLE">Lifestyle</option>
//                     <option value="CAREERS">Careers</option>
//                     <option value="DESIGN">Design</option>
//                   </select>
//                   {errors.category && (
//                     <p className="mt-1 text-red-500 text-sm">{errors.category}</p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     errors.description ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter blog description"
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Content
//                 </label>
//                 <textarea
//                   name="content"
//                   value={formData.content}
//                   onChange={handleChange}
//                   rows="5"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter full blog content (optional)"
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Image URL *
//                 </label>
//                 <input
//                   type="url"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     errors.image ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="https://images.unsplash.com/photo-..."
//                 />
//                 {errors.image && (
//                   <p className="mt-1 text-red-500 text-sm">{errors.image}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Tags (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                     isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
//                   }`}
//                   placeholder="Business, Finance, Tips"
//                 />
//               </div>

//               {errors.submit && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
//                   {errors.submit}
//                 </div>
//               )}

//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={resetForms}
//                   className={`px-6 py-2 border rounded-lg transition-colors duration-300 ${
//                     isDarkMode 
//                       ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50"
//                 >
//                   {loading ? 'Updating...' : 'Update Blog Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Posts List */}
//         <div className={`mb-8 rounded-2xl shadow-lg ${
//           isDarkMode ? 'bg-gray-800' : 'bg-white'
//         }`}>
//           <div className="p-6 border-b border-gray-200">
//             <h2 className={`text-2xl font-bold ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               All Blog Posts ({posts.length})
//             </h2>
//           </div>
          
//           <div className="p-6">
//             {posts.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className={`text-lg ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>
//                   No blog posts found. Create your first post!
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {posts.map((post) => (
//                   <div
//                     key={post.id}
//                     className={`p-4 rounded-lg border transition-colors duration-300 ${
//                       isDarkMode 
//                         ? 'border-gray-700 bg-gray-700 hover:bg-gray-600' 
//                         : 'border-gray-200 bg-gray-50 hover:bg-white'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <h3 className={`font-semibold text-lg ${
//                           isDarkMode ? 'text-white' : 'text-gray-900'
//                         }`}>
//                           {post.title}
//                         </h3>
//                         <p className={`text-sm mt-1 ${
//                           isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                         }`}>
//                           {post.category} • {post.readTime} • {post.createdAt}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2 ml-4">
//                         <button
//                           onClick={() => handleEdit(post)}
//                           className={`px-3 py-1 rounded text-sm transition-colors duration-300 ${
//                             isDarkMode 
//                               ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                               : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                           }`}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(post.id, post.title)}
//                           className={`px-3 py-1 rounded text-sm transition-colors duration-300 ${
//                             isDarkMode 
//                               ? 'bg-red-600 text-white hover:bg-red-700' 
//                               : 'bg-red-100 text-red-700 hover:bg-red-200'
//                           }`}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className={`mb-8 p-6 rounded-2xl ${
//           isDarkMode ? 'bg-gray-800' : 'bg-white'
//         }`}>
//           <h2 className={`text-xl font-semibold mb-4 ${
//             isDarkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             Quick Actions
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <button
//               onClick={() => {
//                 resetForms();
//                 setShowAddForm(true);
//               }}
//               className={`p-4 rounded-lg border-2 border-dashed text-center transition-colors duration-300 ${
//                 isDarkMode 
//                   ? 'border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400' 
//                   : 'border-gray-300 text-gray-500 hover:border-purple-400 hover:text-purple-600'
//               }`}
//             >
//               <div className="text-2xl mb-2">📝</div>
//               <div className="font-medium">Add New Post</div>
//             </button>
            
//             <button
//               onClick={() => navigate('/')}
//               className={`p-4 rounded-lg border-2 border-dashed text-center transition-colors duration-300 ${
//                 isDarkMode 
//                   ? 'border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400' 
//                   : 'border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600'
//               }`}
//             >
//               <div className="text-2xl mb-2">👁️</div>
//               <div className="font-medium">View Website</div>
//             </button>
            
//             <button
//               onClick={handleLogout}
//               className={`p-4 rounded-lg border-2 border-dashed text-center transition-colors duration-300 ${
//                 isDarkMode 
//                   ? 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400' 
//                   : 'border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-600'
//               }`}
//             >
//               <div className="text-2xl mb-2">🚪</div>
//               <div className="font-medium">Logout</div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";

const AdminDashboard = ({ isDarkMode }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    category: "BUSINESS",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [actionLoading, setActionLoading] = useState({
    add: false,
    edit: false,
    delete: null
  });
  
  const {
    admin,
    logout,
    addBlogPost,
    deleteBlogPost,
    updateBlogPost,
    getBlogPosts,
    loading,
  } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const result = await getBlogPosts();
      console.log('📚 Loaded posts:', result);
      if (result.success) {
        setPosts(result.posts || result.data || []);
      } else {
        console.error('Failed to load posts:', result.message);
        alert('Failed to load posts: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      alert('Error loading posts: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(prev => ({ ...prev, add: true }));
    
    try {
      const result = await addBlogPost({ ...formData });
      console.log('➕ Add post result:', result);
      
      if (result.success) {
        alert("✅ Blog post added successfully!");
        setFormData({
          title: "",
          description: "",
          content: "",
          image: "",
          category: "BUSINESS",
          tags: "",
        });
        setShowAddForm(false);
        await loadPosts(); // Reload posts
      } else {
        setErrors({ submit: result.message || result.error || "Failed to add post" });
      }
    } catch (error) {
      console.error('Add post error:', error);
      setErrors({ submit: error.message || "Failed to add post" });
    } finally {
      setActionLoading(prev => ({ ...prev, add: false }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (!selectedPost) {
      alert("No post selected for editing");
      return;
    }

    // Get correct ID - multiple sources check karein
    const postId = selectedPost._id || selectedPost.id;
    if (!postId) {
      alert("Cannot update: No valid post ID found");
      return;
    }

    setActionLoading(prev => ({ ...prev, edit: true }));
    
    try {
      const result = await updateBlogPost(postId, { ...formData });
      console.log('✏️ Update post result:', result);
      
      if (result.success) {
        alert("✅ Blog post updated successfully!");
        setShowEditForm(false);
        setSelectedPost(null);
        await loadPosts(); // Reload posts
      } else {
        setErrors({ submit: result.message || result.error || "Failed to update post" });
      }
    } catch (error) {
      console.error('Update post error:', error);
      setErrors({ submit: error.message || "Failed to update post" });
    } finally {
      setActionLoading(prev => ({ ...prev, edit: false }));
    }
  };

  const handleDelete = async (post) => {
    if (!post) {
      console.error('❌ No post data provided');
      return;
    }

    // Get correct ID - multiple sources check karein
    const postId = post._id || post.id;
    if (!postId) {
      alert("Cannot delete: No valid post ID found");
      return;
    }

    console.log('🗑️ Deleting post:', post.title, 'ID:', postId);

    if (!window.confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, delete: postId }));
    
    try {
      const result = await deleteBlogPost(postId);
      console.log('🗑️ Delete post result:', result);
      
      if (result.success) {
        alert("🗑️ Blog post deleted successfully!");
        // UI update - remove deleted post from state
        setPosts(prevPosts => prevPosts.filter(p => {
          const currentId = p._id || p.id;
          return currentId !== postId;
        }));
      } else {
        alert(`Delete failed: ${result.message || result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error('Delete post error:', error);
      alert(`Delete failed: ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, delete: null }));
    }
  };

  const handleEdit = (post) => {
    if (!post) {
      console.error('❌ No post data provided for editing');
      return;
    }

    console.log('✏️ Editing post:', post);
    setSelectedPost(post);
    setFormData({
      title: post.title || "",
      description: post.description || "",
      content: post.content || "",
      image: post.image || "",
      category: post.category || "BUSINESS",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags || ""),
    });
    setShowEditForm(true);
    setShowAddForm(false);
    setErrors({});
  };

  const resetForms = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedPost(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      image: "",
      category: "BUSINESS",
      tags: "",
    });
    setErrors({});
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const bgMain = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-800";

  const cardBg = isDarkMode
    ? "bg-gray-800/60 backdrop-blur-md border-gray-700"
    : "bg-white/70 backdrop-blur-md border-gray-200";

  const inputStyle = `w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
  }`;

  return (
    <div className={`min-h-screen ${bgMain} transition-colors duration-300`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-lg border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-purple-500 tracking-wide">
            ✨ Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">Welcome, {admin?.username}</span>
            <button
              onClick={() => {
                resetForms();
                setShowAddForm(true);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg disabled:opacity-50"
              disabled={actionLoading.add}
            >
              {actionLoading.add ? "⏳ Adding..." : "➕ New Post"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white hover:opacity-90 shadow-lg"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Add/Edit Forms */}
        {(showAddForm || showEditForm) && (
          <div className={`p-6 rounded-2xl border shadow-xl ${cardBg}`}>
            <h2 className="text-xl font-semibold mb-4">
              {showEditForm ? "✏️ Edit Blog Post" : "📝 Add New Blog Post"}
            </h2>

            <form
              onSubmit={showEditForm ? handleEditSubmit : handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`${inputStyle} ${
                      errors.title ? "border-red-500" : ""
                    }`}
                    placeholder="Enter blog title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="TECHNOLOGY">TECHNOLOGY</option>
                    <option value="FINANCE">FINANCE</option>
                    <option value="LIFESTYLE">LIFESTYLE</option>
                    <option value="CAREERS">CAREERS</option>
                    <option value="DESIGN">DESIGN</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputStyle} ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Short blog description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content (optional)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="5"
                  className={inputStyle}
                  placeholder="Full blog content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`${inputStyle} ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="Business, Finance, Design"
                />
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm">{errors.submit}</p>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-5 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  disabled={actionLoading.add || actionLoading.edit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading.add || actionLoading.edit}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {actionLoading.edit ? "⏳ Updating..." : 
                   actionLoading.add ? "⏳ Adding..." :
                   showEditForm ? "Update Post" : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className={`p-6 rounded-2xl border shadow-xl ${cardBg}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">📚 All Blog Posts</h2>
            <span className="text-sm opacity-70">
              {posts.length} total posts
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 opacity-70">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center py-8 opacity-70">
              No blog posts yet. Create one above!
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const postId = post._id || post.id;
                const isDeleting = actionLoading.delete === postId;
                
                return (
                  <div
                    key={postId}
                    className={`p-4 rounded-xl border transform transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700/60 border-gray-600 hover:bg-gray-700"
                        : "bg-white/70 border-gray-200 hover:bg-gray-100"
                    } ${isDeleting ? 'opacity-50' : 'hover:scale-[1.01]'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-sm opacity-70 mb-1 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs opacity-60">
                          <span className="bg-purple-500 text-white px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>{formatDate(post.createdAt)}</span>
                          <span>•</span>
                          <span>{post.readTime || '5 min read'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(post)}
                          disabled={isDeleting}
                          className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          disabled={isDeleting}
                          className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;