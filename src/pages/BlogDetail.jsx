// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { blogService } from '../services/blogService';

// const BlogDetail = ({ isDarkMode }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   useEffect(() => {
//     fetchBlogDetail();
//   }, [id]);

//   const fetchBlogDetail = async () => {
//     try {
//       setLoading(true);
//       const response = await blogService.getBlogById(id);
//       setBlog(response.post);
      
//       // Fetch related blogs
//       const relatedResponse = await blogService.getBlogs(response.post.category);
//       setRelatedBlogs(relatedResponse.posts.filter(post => post.id !== parseInt(id)).slice(0, 3));
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-96 rounded-lg mb-6`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-8 rounded mb-4`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded mb-2`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded w-3/4`}></div>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className="text-center">
//           <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Blog Post Not Found
//           </h1>
//           <button 
//             onClick={() => navigate('/')}
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//       {/* Featured Image */}
//       <div className="relative h-96 overflow-hidden">
//         <img 
//           src={blog.image} 
//           alt={blog.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <div className="max-w-4xl mx-auto">
//             <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase mb-4 inline-block">
//               {blog.category}
//             </span>
//             <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//             <div className="flex items-center gap-4 text-sm">
//               <span>By {blog.author}</span>
//               <span>•</span>
//               <span>{blog.readTime}</span>
//               <span>•</span>
//               <span>{blog.createdAt}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <article className={`prose max-w-none ${
//               isDarkMode ? 'prose-invert' : ''
//             }`}>
//               <div className={`rounded-lg p-6 mb-6 ${
//                 isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//               }`}>
//                 <p className={`text-lg italic ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                 }`}>
//                   {blog.description}
//                 </p>
//               </div>
              
//               <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
//                 <p className="mb-4">{blog.content}</p>
                
//                 <h2 className={`text-2xl font-bold mt-8 mb-4 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   Key Takeaways
//                 </h2>
                
//                 <ul className={`space-y-2 mb-6 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   <li>• Important point one from the article</li>
//                   <li>• Key learning number two</li>
//                   <li>• Essential takeaway three</li>
//                 </ul>
                
//                 <p className="mb-4">
//                   This comprehensive guide provides you with all the necessary information
//                   to understand and implement these strategies in your daily life or business.
//                 </p>
//               </div>
//             </article>

//             {/* Tags */}
//             <div className="mt-8">
//               <h3 className={`text-lg font-semibold mb-3 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Tags
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {blog.tags?.map((tag, index) => (
//                   <span 
//                     key={index}
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-300' 
//                         : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Author Info */}
//             <div className={`rounded-lg p-6 mb-6 ${
//               isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//             }`}>
//               <h3 className={`text-lg font-semibold mb-3 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 About the Author
//               </h3>
//               <p className={`text-sm ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
//               }`}>
//                 {blog.author} is an experienced writer specializing in {blog.category.toLowerCase()} 
//                 topics with years of industry experience.
//               </p>
//             </div>

//             {/* Related Posts */}
//             {relatedBlogs.length > 0 && (
//               <div className={`rounded-lg p-6 ${
//                 isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//               }`}>
//                 <h3 className={`text-lg font-semibold mb-4 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   Related Posts
//                 </h3>
//                 <div className="space-y-4">
//                   {relatedBlogs.map(relatedBlog => (
//                     <div 
//                       key={relatedBlog.id}
//                       onClick={() => navigate(`/blog/${relatedBlog.id}`)}
//                       className={`cursor-pointer group ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white'
//                       } p-2 rounded transition-colors`}
//                     >
//                       <h4 className={`font-medium text-sm group-hover:text-purple-600 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         {relatedBlog.title}
//                       </h4>
//                       <p className={`text-xs mt-1 ${
//                         isDarkMode ? 'text-gray-500' : 'text-gray-500'
//                       }`}>
//                         {relatedBlog.readTime}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { blogService } from '../services/blogService';

// const BlogDetail = ({ isDarkMode }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   // ObjectId validation function
//   const isValidObjectId = (id) => {
//     if (!id || id === 'undefined' || id === 'null') return false;
//     return /^[0-9a-fA-F]{24}$/.test(id);
//   };

//   useEffect(() => {
//     console.log('🔍 BlogDetail mounted');
//     console.log('📍 URL Params ID:', id);
//     console.log('📍 Location state:', location.state);
//     console.log('📍 Full path:', location.pathname);
    
//     // Extract ID from URL path as backup
//     const pathParts = location.pathname.split('/');
//     const urlId = pathParts[pathParts.length - 1];
//     console.log('📍 Extracted URL ID:', urlId);
    
//     // Priority: 1. useParams id, 2. URL extracted id, 3. location state
//     let blogId = id;
    
//     if (!blogId || blogId === 'undefined') {
//       blogId = urlId;
//     }
    
//     if (!blogId || blogId === 'undefined' || blogId === 'null') {
//       if (location.state && location.state.blogId) {
//         blogId = location.state.blogId;
//         console.log('📍 Using location state ID:', blogId);
//       }
//     }
    
//     console.log('📍 Final blog ID to fetch:', blogId);
    
//     if (blogId && blogId !== 'undefined' && blogId !== 'null' && blogId !== 'blog') {
//       if (isValidObjectId(blogId)) {
//         console.log('✅ Valid ObjectId, fetching blog...');
//         fetchBlogDetail(blogId);
//       } else {
//         console.log('🔄 ID is not ObjectId format, but trying to fetch anyway...');
//         fetchBlogDetail(blogId);
//       }
//     } else {
//       console.error('❌ No valid ID found in URL');
//       setLoading(false);
//       setBlog(null);
//     }
//   }, [id, location]);

//   const fetchBlogDetail = async (blogId) => {
//     try {
//       setLoading(true);
//       console.log('📄 Fetching blog detail for ID:', blogId);
      
//       const response = await blogService.getBlogById(blogId);
//       console.log('📄 Blog detail response:', response);
      
//       if (response && response.success && response.post) {
//         setBlog(response.post);
        
//         // Fetch related blogs
//         try {
//           if (response.post.category) {
//             const relatedResponse = await blogService.getBlogs(response.post.category);
//             const filteredRelated = relatedResponse.posts 
//               ? relatedResponse.posts.filter(post => {
//                   // Multiple ID fields check karein
//                   const postId = post.id || post._id;
//                   const currentBlogId = response.post.id || response.post._id;
//                   return postId !== currentBlogId && postId !== blogId;
//                 }).slice(0, 3)
//               : [];
//             setRelatedBlogs(filteredRelated);
//           }
//         } catch (relatedError) {
//           console.error('Error fetching related blogs:', relatedError);
//           setRelatedBlogs([]);
//         }
//       } else {
//         console.warn('⚠️ No blog post found in response');
//         setBlog(null);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching blog:', error);
//       setBlog(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Local fallback images - Base64 encoded simple placeholders
//   const getFallbackImage = (category) => {
//     const colorMap = {
//       'TECHNOLOGY': '#4F46E5',
//       'BUSINESS': '#059669', 
//       'FINANCE': '#DC2626',
//       'LIFESTYLE': '#7C3AED',
//       'CAREERS': '#EA580C',
//       'DESIGN': '#DB2777'
//     };
    
//     const color = colorMap[category] || '#6B7280';
    
//     // Simple SVG placeholder
//     return `data:image/svg+xml;base64,${btoa(`
//       <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
//         <rect width="100%" height="100%" fill="${color}"/>
//         <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">
//           ${category || 'BLOG'} IMAGE
//         </text>
//       </svg>
//     `)}`;
//   };

//   const handleImageError = (e, category) => {
//     console.log('🖼️ Image failed to load, using SVG fallback');
//     e.target.src = getFallbackImage(category);
//     e.target.alt = 'Blog Image';
//   };

//   const handleRetry = () => {
//     const pathParts = location.pathname.split('/');
//     const urlId = pathParts[pathParts.length - 1];
    
//     if (urlId && urlId !== 'undefined' && urlId !== 'null' && urlId !== 'blog') {
//       fetchBlogDetail(urlId);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleRelatedBlogClick = (relatedBlog) => {
//     const relatedId = relatedBlog.id || relatedBlog._id;
//     if (relatedId) {
//       // Refresh the page with new blog ID
//       navigate(`/blog/${relatedId}`, { 
//         state: { blogId: relatedId },
//         replace: true 
//       });
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   if (loading) {
//     return (
//       <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-96 rounded-lg mb-6`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-8 rounded mb-4`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded mb-2`}></div>
//           <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded w-3/4`}></div>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className="text-center max-w-md mx-4">
//           <div className="text-6xl mb-4">❌</div>
//           <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Blog Not Found
//           </h1>
//           <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             We couldn't find the blog post you're looking for. 
//             It might have been removed or the link might be incorrect.
//           </p>
//           <div className="flex gap-3 justify-center">
//             <button 
//               onClick={() => navigate('/')}
//               className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               Back to Home
//             </button>
//             <button 
//               onClick={handleRetry}
//               className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//       {/* Featured Image */}
//       <div className="relative h-96 overflow-hidden">
//         <img 
//           src={blog.image} 
//           alt={blog.title}
//           className="w-full h-full object-cover"
//           onError={(e) => handleImageError(e, blog.category)}
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <div className="max-w-4xl mx-auto">
//             <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase mb-4 inline-block">
//               {blog.category || 'Uncategorized'}
//             </span>
//             <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//             <div className="flex items-center gap-4 text-sm">
//               <span>By {blog.author || 'Unknown Author'}</span>
//               <span>•</span>
//               <span>{blog.readTime || '5 min read'}</span>
//               <span>•</span>
//               <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm ${
//             isDarkMode 
//               ? 'bg-black/30 text-white hover:bg-black/50' 
//               : 'bg-white/30 text-gray-800 hover:bg-white/50'
//           } transition-all duration-300`}
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//         </button>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <article className={`prose max-w-none ${
//               isDarkMode ? 'prose-invert' : ''
//             }`}>
//               {/* Description */}
//               <div className={`rounded-lg p-6 mb-6 ${
//                 isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//               }`}>
//                 <p className={`text-lg italic ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                 }`}>
//                   {blog.description || 'No description available.'}
//                 </p>
//               </div>
              
//               {/* Main Content */}
//               <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
//                 {blog.content ? (
//                   typeof blog.content === 'string' ? (
//                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                   ) : (
//                     <p>{blog.content}</p>
//                   )
//                 ) : (
//                   <div>
//                     <p className="mb-4">
//                       This blog post doesn't have detailed content yet. Please check back later for updates.
//                     </p>
                    
//                     <h2 className={`text-2xl font-bold mt-8 mb-4 ${
//                       isDarkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       Key Takeaways
//                     </h2>
                    
//                     <ul className={`space-y-2 mb-6 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       <li>• Important insights from this topic</li>
//                       <li>• Practical applications you can implement</li>
//                       <li>• Key learning points to remember</li>
//                     </ul>
                    
//                     <p className="mb-4">
//                       We're working on bringing you the complete content for this article. 
//                       Stay tuned for more detailed information and insights.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </article>

//             {/* Tags */}
//             <div className="mt-8">
//               <h3 className={`text-lg font-semibold mb-3 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Tags
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {blog.tags && blog.tags.length > 0 ? (
//                   blog.tags.map((tag, index) => (
//                     <span 
//                       key={`tag-${index}-${tag}`}
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         isDarkMode 
//                           ? 'bg-gray-700 text-gray-300' 
//                           : 'bg-gray-200 text-gray-700'
//                       }`}
//                     >
//                       #{tag}
//                     </span>
//                   ))
//                 ) : (
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     isDarkMode 
//                       ? 'bg-gray-700 text-gray-300' 
//                       : 'bg-gray-200 text-gray-700'
//                   }`}>
//                     #general
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Author Info */}
//             <div className={`rounded-lg p-6 mb-6 ${
//               isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//             }`}>
//               <h3 className={`text-lg font-semibold mb-3 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 About the Author
//               </h3>
//               <p className={`text-sm ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
//               }`}>
//                 {blog.author || 'The Author'} is an experienced writer specializing in {blog.category?.toLowerCase() || 'various'} 
//                 topics with years of industry experience.
//               </p>
//             </div>

//             {/* Related Posts */}
//             {relatedBlogs.length > 0 && (
//               <div className={`rounded-lg p-6 ${
//                 isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//               }`}>
//                 <h3 className={`text-lg font-semibold mb-4 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   Related Posts
//                 </h3>
//                 <div className="space-y-4">
//                   {relatedBlogs.map(relatedBlog => (
//                     <div 
//                       key={`related-${relatedBlog.id || relatedBlog._id}`}
//                       onClick={() => handleRelatedBlogClick(relatedBlog)}
//                       className={`cursor-pointer group ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white'
//                       } p-3 rounded-lg transition-all duration-300 border ${
//                         isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                       }`}
//                     >
//                       <h4 className={`font-medium text-sm group-hover:text-purple-600 line-clamp-2 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         {relatedBlog.title}
//                       </h4>
//                       <div className="flex items-center justify-between mt-2">
//                         <p className={`text-xs ${
//                           isDarkMode ? 'text-gray-500' : 'text-gray-500'
//                         }`}>
//                           {relatedBlog.readTime}
//                         </p>
//                         <span className={`text-xs px-2 py-1 rounded-full ${
//                           isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
//                         }`}>
//                           {relatedBlog.category}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;
























import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import { blogService } from '../services/blogService';

const BlogDetail = ({ isDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [imageError, setImageError] = useState(false);

  // ObjectId validation function
  const isValidObjectId = (id) => {
    if (!id || id === 'undefined' || id === 'null') return false;
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  useEffect(() => {
    console.log('🔍 BlogDetail mounted');
    console.log('📍 URL Params ID:', id);
    console.log('📍 Location state:', location.state);
    
    const pathParts = location.pathname.split('/');
    const urlId = pathParts[pathParts.length - 1];
    
    let blogId = id;
    
    if (!blogId || blogId === 'undefined') {
      blogId = urlId;
    }
    
    if (!blogId || blogId === 'undefined' || blogId === 'null') {
      if (location.state && location.state.blogId) {
        blogId = location.state.blogId;
      }
    }
    
    console.log('📍 Final blog ID to fetch:', blogId);
    
    if (blogId && blogId !== 'undefined' && blogId !== 'null' && blogId !== 'blog') {
      fetchBlogDetail(blogId);
    } else {
      setLoading(false);
      setBlog(null);
    }
  }, [id, location]);

  const fetchBlogDetail = async (blogId) => {
    try {
      setLoading(true);
      setImageError(false);
      console.log('📄 Fetching blog detail for ID:', blogId);
      
      const response = await blogService.getBlogById(blogId);
      console.log('📄 Blog detail response:', response);
      console.log('🖼️ Image URL:', response?.post?.image);
      
      if (response && response.success && response.post) {
        setBlog(response.post);
        
        // Fetch related blogs
        try {
          if (response.post.category) {
            const relatedResponse = await blogService.getBlogs(response.post.category);
            const filteredRelated = relatedResponse.posts 
              ? relatedResponse.posts.filter(post => {
                  const postId = post.id || post._id;
                  const currentBlogId = response.post.id || response.post._id;
                  return postId !== currentBlogId && postId !== blogId;
                }).slice(0, 3)
              : [];
            setRelatedBlogs(filteredRelated);
          }
        } catch (relatedError) {
          console.error('Error fetching related blogs:', relatedError);
          setRelatedBlogs([]);
        }
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error('❌ Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  // Fallback image generator
  const getFallbackImage = (category) => {
    const colorMap = {
      'TECHNOLOGY': '#4F46E5',
      'BUSINESS': '#059669', 
      'FINANCE': '#DC2626',
      'LIFESTYLE': '#7C3AED',
      'CAREERS': '#EA580C',
      'DESIGN': '#DB2777'
    };
    
    const color = colorMap[category] || '#6B7280';
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)"/>
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">
          ${category || 'BLOG'}
        </text>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.7">
          Article Image
        </text>
      </svg>
    `)}`;
  };

  const handleImageError = (e, category) => {
    console.log('🖼️ Image failed to load, using fallback');
    console.log('Failed URL:', e.target.src);
    setImageError(true);
    e.target.src = getFallbackImage(category);
    e.target.alt = 'Blog Image';
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully');
    setImageError(false);
  };

  const handleRetry = () => {
    const pathParts = location.pathname.split('/');
    const urlId = pathParts[pathParts.length - 1];
    
    if (urlId && urlId !== 'undefined' && urlId !== 'null' && urlId !== 'blog') {
      fetchBlogDetail(urlId);
    } else {
      navigate('/');
    }
  };

  const handleRelatedBlogClick = (relatedBlog) => {
    const relatedId = relatedBlog.id || relatedBlog._id;
    if (relatedId) {
      navigate(`/blog/${relatedId}`, { 
        state: { blogId: relatedId },
        replace: true 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-96 rounded-lg mb-6`}></div>
          <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-8 rounded mb-4`}></div>
          <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded mb-2`}></div>
          <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded w-3/4`}></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">❌</div>
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Blog Not Found
          </h1>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We couldn't find the blog post you're looking for.
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate('/')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-white text-gray-900 hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Back to Home
            </button>
            <button 
              onClick={handleRetry}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Featured Image Section */}
      <div className="relative h-96 overflow-hidden">
        {/* Image with fallback */}
        {blog.image ? (
          <img 
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => handleImageError(e, blog.category)}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
          />
        ) : (
          <img 
            src={getFallbackImage(blog.category)}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4 inline-block ${
              isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
            }`}>
              {blog.category || 'Uncategorized'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <User size={16} />
                {blog.author || 'Unknown Author'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {blog.readTime || '5 min read'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 left-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isDarkMode 
              ? 'bg-black/30 text-white hover:bg-black/50' 
              : 'bg-white/30 text-gray-800 hover:bg-white/50'
          }`}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
              {/* Description */}
              <div className={`rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className={`text-lg italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {blog.description || 'No description available.'}
                </p>
              </div>
              
              {/* Main Content */}
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-base sm:text-lg`}>
                {blog.content ? (
                  typeof blog.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <p>{blog.content}</p>
                  )
                ) : (
                  <div>
                    <p className="mb-4">
                      This blog post doesn't have detailed content yet. Please check back later for updates.
                    </p>
                  </div>
                )}
              </div>
            </article>

            {/* Tags */}
            <div className="mt-8">
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Tag size={20} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags && blog.tags.length > 0 ? (
                  blog.tags.map((tag, index) => (
                    <span 
                      key={`tag-${index}-${tag}`}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    #general
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <div className={`rounded-lg p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                About the Author
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {blog.author || 'The Author'} is an experienced writer specializing in {blog.category?.toLowerCase() || 'various'} 
                topics with years of industry experience.
              </p>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {relatedBlogs.map(relatedBlog => (
                    <div 
                      key={`related-${relatedBlog.id || relatedBlog._id}`}
                      onClick={() => handleRelatedBlogClick(relatedBlog)}
                      className={`cursor-pointer group p-3 rounded-lg transition-all duration-300 border ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 border-gray-700' 
                          : 'hover:bg-white border-gray-200'
                      }`}
                    >
                      <h4 className={`font-medium text-sm line-clamp-2 transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 group-hover:text-white' 
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {relatedBlog.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {relatedBlog.readTime}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {relatedBlog.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;