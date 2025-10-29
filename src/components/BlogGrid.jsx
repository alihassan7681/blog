
// import React, { useState, useEffect, useMemo } from 'react';
// import { blogService } from '../services/blogService';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const BlogGrid = ({ isDarkMode, activeCategory, searchQuery, onSearchComplete }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [activeSearchQuery, setActiveSearchQuery] = useState('');
//   const navigate = useNavigate();
  
//   const { user, openSignInModal } = useAuth();

//   // Load liked posts from localStorage with user-specific key
//   const getLikedPosts = () => {
//     try {
//       const storageKey = user ? `likedPosts_${user.id}` : 'likedPosts_guest';
//       const stored = localStorage.getItem(storageKey);
//       return stored ? new Set(JSON.parse(stored)) : new Set();
//     } catch (error) {
//       console.error('Error loading liked posts:', error);
//       return new Set();
//     }
//   };

//   const [likedPosts, setLikedPosts] = useState(getLikedPosts);

//   // Save liked posts to localStorage whenever they change
//   useEffect(() => {
//     try {
//       const storageKey = user ? `likedPosts_${user.id}` : 'likedPosts_guest';
//       localStorage.setItem(storageKey, JSON.stringify([...likedPosts]));
//     } catch (error) {
//       console.error('Error saving liked posts:', error);
//     }
//   }, [likedPosts, user]);

//   // Jab user change ho to liked posts reload karo
//   useEffect(() => {
//     setLikedPosts(getLikedPosts());
//   }, [user]);

//   // Calculate trending score based on likes, views, and recency
//   const calculateTrendingScore = (post) => {
//     const likes = post.likes || 0;
//     const views = post.views || 0;
//     const daysAgo = post.daysAgo || 7;
    
//     return (likes * 2 + views) / (daysAgo + 1);
//   };

//   // Fetch blogs
//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 Fetching blogs for category:', activeCategory);
//       const response = await blogService.getBlogs(activeCategory);
//       const postsData = response.posts || [];
      
//       console.log(`📥 Received ${postsData.length} posts`);

//       // Add default metrics and trending data for all posts
//       const postsWithMetrics = postsData.map((post, index) => {
//         const postId = post._id || post.id;
//         const likes = post.likes || Math.floor(Math.random() * 100) + 20;
//         const views = post.views || Math.floor(Math.random() * 500) + 100;
//         const daysAgo = post.daysAgo || Math.floor(Math.random() * 14) + 1;
        
//         return {
//           ...post,
//           id: postId, // Ensure ID is set
//           _id: post._id,
//           likes,
//           views,
//           daysAgo,
//           trendingScore: calculateTrendingScore({ likes, views, daysAgo }),
//           trendingLevel: 'low'
//         };
//       });
      
//       // Calculate trending levels for all posts
//       const sortedByTrending = [...postsWithMetrics].sort((a, b) => b.trendingScore - a.trendingScore);
//       const postsWithTrendingLevels = sortedByTrending.map((post, index) => {
//         let trendingLevel = 'low';
//         if (index < Math.floor(sortedByTrending.length * 0.2)) {
//           trendingLevel = 'high';
//         } else if (index < Math.floor(sortedByTrending.length * 0.5)) {
//           trendingLevel = 'medium';
//         }
        
//         return {
//           ...post,
//           trendingLevel
//         };
//       });
      
//       setBlogs(postsWithTrendingLevels);
//       setCurrentPage(1);
      
//     } catch (error) {
//       console.error('❌ Error fetching blogs:', error);
//       setError('Unable to load blogs. Please check if the server is running.');
//       setBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch blogs only when activeCategory changes
//   useEffect(() => {
//     fetchBlogs();
//   }, [activeCategory]);

//   // Search functionality
//   useEffect(() => {
//     if (searchQuery && searchQuery.trim()) {
//       setActiveSearchQuery(searchQuery);
//       setCurrentPage(1);
      
//       if (onSearchComplete) {
//         onSearchComplete();
//       }
//     }
//   }, [searchQuery]);

//   // Filter blogs based on search
//   const filteredBlogs = useMemo(() => {
//     if (!activeSearchQuery || !activeSearchQuery.trim()) {
//       return blogs;
//     }

//     const searchLower = activeSearchQuery.toLowerCase();
//     return blogs.filter(blog => {
//       const titleMatch = blog.title?.toLowerCase().includes(searchLower);
//       const descMatch = blog.description?.toLowerCase().includes(searchLower);
//       const categoryMatch = blog.category?.toLowerCase().includes(searchLower);
//       const contentMatch = blog.content?.toLowerCase().includes(searchLower);
      
//       return titleMatch || descMatch || categoryMatch || contentMatch;
//     });
//   }, [blogs, activeSearchQuery]);

//   // FIXED: Handle blog click function
//   const handleBlogClick = (blog) => {
//     if (!blog) {
//       console.error('❌ No blog data provided');
//       return;
//     }

//     // Multiple ID sources check karein - FIXED
//     const blogId = blog._id || blog.id;
    
//     if (!blogId) {
//       console.error('❌ No valid ID found in blog:', blog);
//       alert('Cannot open blog: No valid ID found');
//       return;
//     }

//     console.log('🖱️ Blog clicked, ID:', blogId, 'Title:', blog.title);

//     // Views update karein
//     setBlogs(prevBlogs => 
//       prevBlogs.map(b => {
//         const currentId = b._id || b.id;
//         return currentId === blogId 
//           ? { 
//               ...b, 
//               views: (b.views || 0) + 1,
//               trendingScore: calculateTrendingScore({
//                 ...b,
//                 views: (b.views || 0) + 1
//               })
//             }
//           : b
//       })
//     );
    
//     // Navigate with proper ID - FIXED
//     navigate(`/blog/${blogId}`);
//   };

//   // FIXED: Handle like functionality - Proper ID comparison
//   const handleLike = (post, e) => {
//     e.stopPropagation();
    
//     // Check if user is authenticated
//     if (!user) {
//       openSignInModal();
//       return;
//     }

//     const postId = post._id || post.id;
//     if (!postId) {
//       console.error('❌ No valid post ID for like');
//       return;
//     }

//     console.log('❤️ Like clicked for post:', postId, 'Title:', post.title);

//     const isCurrentlyLiked = likedPosts.has(postId);

//     setBlogs(prevBlogs => {
//       return prevBlogs.map(blog => {
//         const currentId = blog._id || blog.id;
        
//         // Only update the specific post
//         if (currentId === postId) {
//           const newLikes = isCurrentlyLiked ? 
//             Math.max(0, (blog.likes || 0) - 1) : 
//             (blog.likes || 0) + 1;
          
//           console.log(`🔄 Updating likes for ${postId}: ${blog.likes} -> ${newLikes}`);

//           return {
//             ...blog,
//             likes: newLikes,
//             trendingScore: calculateTrendingScore({
//               ...blog,
//               likes: newLikes
//             })
//           };
//         }
//         return blog; // Return unchanged for other posts
//       });
//     });

//     // Update likedPosts set
//     setLikedPosts(prev => {
//       const newLiked = new Set(prev);
//       if (isCurrentlyLiked) {
//         newLiked.delete(postId);
//         console.log('❌ Removed like from:', postId);
//       } else {
//         newLiked.add(postId);
//         console.log('✅ Added like to:', postId);
//       }
//       return newLiked;
//     });
//   };

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Page change par scroll to top
//   useEffect(() => {
//     scrollToTop();
//   }, [currentPage]);

//   // Category change par search clear
//   useEffect(() => {
//     setActiveSearchQuery('');
//     scrollToTop();
//   }, [activeCategory]);

//   // Get current posts for current page
//   const { currentPosts, totalPages } = useMemo(() => {
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const posts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
//     const pages = Math.ceil(filteredBlogs.length / postsPerPage);
    
//     return { currentPosts: posts, totalPages: pages };
//   }, [filteredBlogs, currentPage, postsPerPage]);

//   // Change page
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Next page
//   const nextPage = () => {
//     setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
//   };

//   // Previous page
//   const prevPage = () => {
//     setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
//   };

//   // Clear search filter
//   const clearSearch = () => {
//     setActiveSearchQuery('');
//     setCurrentPage(1);
//   };

//   // Quick search handler
//   const handleQuickSearch = (term) => {
//     setActiveSearchQuery(term);
//     setCurrentPage(1);
//   };

//   // Format numbers for display
//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'k';
//     }
//     return num.toString();
//   };

//   // Get trending badge color based on level
//   const getTrendingBadgeColor = (level) => {
//     switch (level) {
//       case 'high':
//         return {
//           bg: 'bg-red-500',
//           text: 'text-white',
//           icon: '🔥',
//           label: 'HOT'
//         };
//       case 'medium':
//         return {
//           bg: 'bg-orange-500',
//           text: 'text-white',
//           icon: '⚡',
//           label: 'TRENDING'
//         };
//       case 'low':
//         return {
//           bg: 'bg-blue-500',
//           text: 'text-white',
//           icon: '📈',
//           label: 'POPULAR'
//         };
//       default:
//         return {
//           bg: 'bg-gray-500',
//           text: 'text-white',
//           icon: '📊',
//           label: 'TRENDING'
//         };
//     }
//   };

//   // Get trending indicator color for metrics section
//   const getTrendingIndicatorColor = (level) => {
//     switch (level) {
//       case 'high':
//         return 'text-red-500 bg-red-50 dark:bg-red-900/20';
//       case 'medium':
//         return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
//       case 'low':
//         return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
//       default:
//         return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
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

//   // Loading State
//   if (loading) {
//     return (
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center py-12">
//           <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${
//             isDarkMode ? 'border-purple-500' : 'border-purple-600'
//           }`}></div>
//           <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             Loading blogs...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">❌</div>
//           <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Error Loading Blogs
//           </h3>
//           <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//             {error}
//           </p>
//           <button
//             onClick={fetchBlogs}
//             className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="blogs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       {/* Category Stats */}
//       <div className="mb-8 text-center">
//         <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//           {activeSearchQuery 
//             ? `Search Results` 
//             : activeCategory === 'All' 
//             ? 'All Blog Posts' 
//             : `${activeCategory} Posts`}
//         </h2>
//         <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//           {activeSearchQuery 
//             ? `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''} for "${activeSearchQuery}"`
//             : '"Small steps today, a brighter future tomorrow."'}
//         </p>
        
//         {/* Clear Search Button */}
//         {activeSearchQuery && (
//           <button
//             onClick={clearSearch}
//             className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
//               isDarkMode 
//                 ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//             Clear Search
//           </button>
//         )}
//       </div>

//       {/* Search Suggestions - When no results */}
//       {activeSearchQuery && filteredBlogs.length === 0 && (
//         <div className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
//           <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             💡 No results found for "{activeSearchQuery}"
//           </h3>
//           <ul className={`space-y-2 text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             <li>• Try using different keywords</li>
//             <li>• Check your spelling</li>
//             <li>• Use more general terms</li>
//             <li>• Browse by categories above</li>
//           </ul>
          
//           {/* Popular Search Terms */}
//           <div className="mt-4">
//             <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Try popular searches:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {['React', 'Travel', 'Health', 'Technology', 'Lifestyle', 'Business'].map((term) => (
//                 <button
//                   key={`search-term-${term}`}
//                   onClick={() => handleQuickSearch(term)}
//                   className={`px-3 py-1 rounded-full text-xs transition-all ${
//                     isDarkMode 
//                       ? 'bg-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white' 
//                       : 'bg-white text-gray-700 hover:bg-purple-600 hover:text-white'
//                   } border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
//                 >
//                   {term}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Blog Posts Grid */}
//       {currentPosts.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
//           {currentPosts.map((post) => {
//             const postId = post._id || post.id;
//             const trendingBadge = getTrendingBadgeColor(post.trendingLevel);
//             const trendingIndicator = getTrendingIndicatorColor(post.trendingLevel);
//             const isLiked = likedPosts.has(postId);
            
//             return (
//               <div 
//                 key={`blog-${postId}`}
//                 onClick={() => handleBlogClick(post)}
//                 className={`rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group ${
//                   isDarkMode 
//                     ? 'bg-gray-800 shadow-lg hover:shadow-purple-500/20' 
//                     : 'bg-white shadow-sm hover:shadow-lg'
//                 }`}
//               >
//                 <div className="relative overflow-hidden">
//                   <img 
//                     src={post.image} 
//                     alt={post.title}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
//                     onError={(e) => handleImageError(e, post.category)}
//                   />
//                   <div className="absolute top-3 left-3">
//                     <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold uppercase">
//                       {post.category}
//                     </span>
//                   </div>
                  
//                   {/* Trending Badge */}
//                   <div className="absolute top-3 right-3">
//                     <span className={`${trendingBadge.bg} ${trendingBadge.text} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
//                       <span className="text-xs">{trendingBadge.icon}</span>
//                       {trendingBadge.label}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-5">
//                   <h3 className={`font-bold mt-2 mb-3 text-lg leading-tight group-hover:text-purple-600 transition-colors ${
//                     isDarkMode ? 'text-white' : 'text-gray-900'
//                   }`}>
//                     {post.title}
//                   </h3>
//                   <p className={`text-sm leading-relaxed mb-3 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}>
//                     {post.description}
//                   </p>
                  
//                   {/* Metrics Section */}
//                   <div className="flex items-center justify-between text-xs mb-3">
//                     <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {post.readTime}
//                     </span>
//                     <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {post.createdAt}
//                     </span>
//                   </div>
                  
//                   {/* Like, Views, and Trending Stats */}
//                   <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
//                     {/* Like Button - FIXED */}
//                     <button
//                       onClick={(e) => handleLike(post, e)}
//                       className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 ${
//                         isLiked
//                           ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
//                           : isDarkMode 
//                             ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
//                             : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
//                       }`}
//                     >
//                       <svg 
//                         className="w-4 h-4" 
//                         fill={isLiked ? "currentColor" : "none"} 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth={2} 
//                           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
//                         />
//                       </svg>
//                       <span className="text-xs font-medium">{formatNumber(post.likes || 0)}</span>
//                     </button>

//                     {/* Views */}
//                     <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
//                       isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       <span className="text-xs font-medium">{formatNumber(post.views || 0)}</span>
//                     </div>

//                     {/* Trending Indicator */}
//                     <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${trendingIndicator}`}>
//                       <span>{trendingBadge.icon}</span>
//                       <span>
//                         {post.trendingLevel === 'high' ? 'HOT' : 
//                          post.trendingLevel === 'medium' ? 'TRENDING' : 'POPULAR'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modern Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-16 mb-8">
//           <div className={`inline-flex items-center gap-1 px-2 py-2 rounded-full shadow-md ${
//             isDarkMode ? 'bg-gray-800' : 'bg-white'
//           }`}>
//             {/* Previous Arrow */}
//             <button
//               key="pagination-prev"
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
//                 currentPage === 1
//                   ? isDarkMode 
//                     ? 'text-gray-600 cursor-not-allowed' 
//                     : 'text-gray-300 cursor-not-allowed'
//                   : isDarkMode
//                   ? 'text-gray-300 hover:bg-gray-700'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             {/* Page Numbers */}
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//               <button
//                 key={`pagination-${number}`}
//                 onClick={() => paginate(number)}
//                 className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
//                   currentPage === number
//                     ? 'bg-purple-600 text-white shadow-lg scale-110'
//                     : isDarkMode
//                     ? 'text-gray-300 hover:bg-gray-700'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {number}
//               </button>
//             ))}

//             {/* Next Arrow */}
//             <button
//               key="pagination-next"
//               onClick={nextPage}
//               disabled={currentPage === totalPages}
//               className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
//                 currentPage === totalPages
//                   ? isDarkMode 
//                     ? 'text-gray-600 cursor-not-allowed' 
//                     : 'text-gray-300 cursor-not-allowed'
//                   : isDarkMode
//                   ? 'text-gray-300 hover:bg-gray-700'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* No Posts Message */}
//       {filteredBlogs.length === 0 && !activeSearchQuery && (
//         <div className="text-center py-12">
//           <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>📝</div>
//           <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             No posts found
//           </h3>
//           <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             {activeCategory === 'All' 
//               ? 'No blog posts available yet.' 
//               : `No blog posts available for ${activeCategory} category.`}
//           </p>
//         </div>
//       )}

//       {/* Scroll to Top Button */}
//       {currentPage > 1 && (
//         <div className="fixed bottom-8 right-8 z-40">
//           <button
//             onClick={scrollToTop}
//             className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
//               isDarkMode 
//                 ? 'bg-purple-600 text-white hover:bg-purple-700' 
//                 : 'bg-purple-600 text-white hover:bg-purple-700'
//             }`}
//             title="Scroll to top"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//             </svg>
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default BlogGrid;






import React, { useState, useEffect, useMemo } from 'react';
import { blogService } from '../services/blogService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BlogGrid = ({ isDarkMode, activeCategory, searchQuery, onSearchComplete }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { user, openSignInModal } = useAuth();

  // Load liked posts from localStorage with user-specific key
  const getLikedPosts = () => {
    try {
      const storageKey = user ? `likedPosts_${user.id}` : 'likedPosts_guest';
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (error) {
      console.error('Error loading liked posts:', error);
      return new Set();
    }
  };

  const [likedPosts, setLikedPosts] = useState(getLikedPosts);

  // Save liked posts to localStorage whenever they change
  useEffect(() => {
    try {
      const storageKey = user ? `likedPosts_${user.id}` : 'likedPosts_guest';
      localStorage.setItem(storageKey, JSON.stringify([...likedPosts]));
    } catch (error) {
      console.error('Error saving liked posts:', error);
    }
  }, [likedPosts, user]);

  // Jab user change ho to liked posts reload karo
  useEffect(() => {
    setLikedPosts(getLikedPosts());
  }, [user]);

  // Calculate trending score based on likes, views, and recency
  const calculateTrendingScore = (post) => {
    const likes = post.likes || 0;
    const views = post.views || 0;
    const daysAgo = post.daysAgo || 7;
    
    return (likes * 2 + views) / (daysAgo + 1);
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching blogs for category:', activeCategory);
      const response = await blogService.getBlogs(activeCategory);
      const postsData = response.posts || [];
      
      console.log(`📥 Received ${postsData.length} posts`);

      // Add default metrics and trending data for all posts
      const postsWithMetrics = postsData.map((post, index) => {
        const postId = post._id || post.id;
        const likes = post.likes || Math.floor(Math.random() * 100) + 20;
        const views = post.views || Math.floor(Math.random() * 500) + 100;
        const daysAgo = post.daysAgo || Math.floor(Math.random() * 14) + 1;
        
        return {
          ...post,
          id: postId, // Ensure ID is set
          _id: post._id,
          likes,
          views,
          daysAgo,
          trendingScore: calculateTrendingScore({ likes, views, daysAgo }),
          trendingLevel: 'low'
        };
      });
      
      // Calculate trending levels for all posts
      const sortedByTrending = [...postsWithMetrics].sort((a, b) => b.trendingScore - a.trendingScore);
      const postsWithTrendingLevels = sortedByTrending.map((post, index) => {
        let trendingLevel = 'low';
        if (index < Math.floor(sortedByTrending.length * 0.2)) {
          trendingLevel = 'high';
        } else if (index < Math.floor(sortedByTrending.length * 0.5)) {
          trendingLevel = 'medium';
        }
        
        return {
          ...post,
          trendingLevel
        };
      });
      
      setBlogs(postsWithTrendingLevels);
      setCurrentPage(1);
      
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      setError('Unable to load blogs. Please check if the server is running.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs only when activeCategory changes
  useEffect(() => {
    fetchBlogs();
  }, [activeCategory]);

  // Search functionality
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      setActiveSearchQuery(searchQuery);
      setCurrentPage(1);
      
      if (onSearchComplete) {
        onSearchComplete();
      }
    }
  }, [searchQuery]);

  // Filter blogs based on search
  const filteredBlogs = useMemo(() => {
    if (!activeSearchQuery || !activeSearchQuery.trim()) {
      return blogs;
    }

    const searchLower = activeSearchQuery.toLowerCase();
    return blogs.filter(blog => {
      const titleMatch = blog.title?.toLowerCase().includes(searchLower);
      const descMatch = blog.description?.toLowerCase().includes(searchLower);
      const categoryMatch = blog.category?.toLowerCase().includes(searchLower);
      const contentMatch = blog.content?.toLowerCase().includes(searchLower);
      
      return titleMatch || descMatch || categoryMatch || contentMatch;
    });
  }, [blogs, activeSearchQuery]);

  // FIXED: Handle blog click function - Scroll to top when opening blog
  const handleBlogClick = (blog) => {
    if (!blog) {
      console.error('❌ No blog data provided');
      return;
    }

    // Multiple ID sources check karein - FIXED
    const blogId = blog._id || blog.id;
    
    if (!blogId) {
      console.error('❌ No valid ID found in blog:', blog);
      alert('Cannot open blog: No valid ID found');
      return;
    }

    console.log('🖱️ Blog clicked, ID:', blogId, 'Title:', blog.title);

    // Views update karein
    setBlogs(prevBlogs => 
      prevBlogs.map(b => {
        const currentId = b._id || b.id;
        return currentId === blogId 
          ? { 
              ...b, 
              views: (b.views || 0) + 1,
              trendingScore: calculateTrendingScore({
                ...b,
                views: (b.views || 0) + 1
              })
            }
          : b
      })
    );
    
    // Scroll to top before navigation - FIXED
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate with proper ID - FIXED
    setTimeout(() => {
      navigate(`/blog/${blogId}`);
    }, 100);
  };

  // FIXED: Handle like functionality - Proper ID comparison
  const handleLike = (post, e) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    if (!user) {
      openSignInModal();
      return;
    }

    const postId = post._id || post.id;
    if (!postId) {
      console.error('❌ No valid post ID for like');
      return;
    }

    console.log('❤️ Like clicked for post:', postId, 'Title:', post.title);

    const isCurrentlyLiked = likedPosts.has(postId);

    setBlogs(prevBlogs => {
      return prevBlogs.map(blog => {
        const currentId = blog._id || blog.id;
        
        // Only update the specific post
        if (currentId === postId) {
          const newLikes = isCurrentlyLiked ? 
            Math.max(0, (blog.likes || 0) - 1) : 
            (blog.likes || 0) + 1;
          
          console.log(`🔄 Updating likes for ${postId}: ${blog.likes} -> ${newLikes}`);

          return {
            ...blog,
            likes: newLikes,
            trendingScore: calculateTrendingScore({
              ...blog,
              likes: newLikes
            })
          };
        }
        return blog; // Return unchanged for other posts
      });
    });

    // Update likedPosts set
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (isCurrentlyLiked) {
        newLiked.delete(postId);
        console.log('❌ Removed like from:', postId);
      } else {
        newLiked.add(postId);
        console.log('✅ Added like to:', postId);
      }
      return newLiked;
    });
  };

  // Scroll to top function - Manual use ke liye
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category change par search clear
  useEffect(() => {
    setActiveSearchQuery('');
  }, [activeCategory]);

  // Get current posts for current page
  const { currentPosts, totalPages } = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const posts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
    const pages = Math.ceil(filteredBlogs.length / postsPerPage);
    
    return { currentPosts: posts, totalPages: pages };
  }, [filteredBlogs, currentPage, postsPerPage]);

  // Change page - WITHOUT automatic scroll
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Next page - WITHOUT automatic scroll
  const nextPage = () => {
    setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
  };

  // Previous page - WITHOUT automatic scroll
  const prevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
  };

  // Clear search filter
  const clearSearch = () => {
    setActiveSearchQuery('');
    setCurrentPage(1);
  };

  // Quick search handler
  const handleQuickSearch = (term) => {
    setActiveSearchQuery(term);
    setCurrentPage(1);
  };

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  // Get trending badge color based on level - Purple removed
  const getTrendingBadgeColor = (level) => {
    switch (level) {
      case 'high':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          icon: '🔥',
          label: 'HOT'
        };
      case 'medium':
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          icon: '⚡',
          label: 'TRENDING'
        };
      case 'low':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          icon: '📈',
          label: 'POPULAR'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          icon: '📊',
          label: 'TRENDING'
        };
    }
  };

  // Get trending indicator color for metrics section - Purple removed
  const getTrendingIndicatorColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'low':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  // Local fallback images - Base64 encoded simple placeholders - Purple removed
  const getFallbackImage = (category) => {
    const colorMap = {
      'TECHNOLOGY': '#374151',
      'BUSINESS': '#059669', 
      'FINANCE': '#DC2626',
      'LIFESTYLE': '#7C3AED',
      'CAREERS': '#EA580C',
      'DESIGN': '#DB2777'
    };
    
    const color = colorMap[category] || '#6B7280';
    
    // Simple SVG placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">
          ${category || 'BLOG'} IMAGE
        </text>
      </svg>
    `)}`;
  };

  const handleImageError = (e, category) => {
    console.log('🖼️ Image failed to load, using SVG fallback');
    e.target.src = getFallbackImage(category);
    e.target.alt = 'Blog Image';
  };

  // Loading State
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${
            isDarkMode ? 'border-gray-400' : 'border-gray-600'
          }`}></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading blogs...
          </p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Error Loading Blogs
          </h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            {error}
          </p>
          <button
            onClick={fetchBlogs}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Category Stats */}
      <div className="mb-8 text-center">
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {activeSearchQuery 
            ? `Search Results` 
            : activeCategory === 'All' 
            ? 'All Blog Posts' 
            : `${activeCategory} Posts`}
        </h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {activeSearchQuery 
            ? `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''} for "${activeSearchQuery}"`
            : '"Small steps today, a brighter future tomorrow."'}
        </p>
        
        {/* Clear Search Button */}
        {activeSearchQuery && (
          <button
            onClick={clearSearch}
            className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Search
          </button>
        )}
      </div>

      {/* Search Suggestions - When no results */}
      {activeSearchQuery && filteredBlogs.length === 0 && (
        <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💡 No results found for "{activeSearchQuery}"
          </h3>
          <ul className={`space-y-2 text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>• Try using different keywords</li>
            <li>• Check your spelling</li>
            <li>• Use more general terms</li>
            <li>• Browse by categories above</li>
          </ul>
          
          {/* Popular Search Terms */}
          <div className="mt-4">
            <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try popular searches:
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Travel', 'Health', 'Technology', 'Lifestyle', 'Business'].map((term) => (
                <button
                  key={`search-term-${term}`}
                  onClick={() => handleQuickSearch(term)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  } border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      {currentPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
          {currentPosts.map((post) => {
            const postId = post._id || post.id;
            const trendingBadge = getTrendingBadgeColor(post.trendingLevel);
            const trendingIndicator = getTrendingIndicatorColor(post.trendingLevel);
            const isLiked = likedPosts.has(postId);
            
            return (
              <div 
                key={`blog-${postId}`}
                onClick={() => handleBlogClick(post)}
                className={`rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group ${
                  isDarkMode 
                    ? 'bg-gray-800 shadow-lg hover:shadow-gray-700/20' 
                    : 'bg-white shadow-sm hover:shadow-lg border border-gray-200'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                    onError={(e) => handleImageError(e, post.category)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gray-800 text-white px-2 py-1 rounded-lg text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Trending Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`${trendingBadge.bg} ${trendingBadge.text} px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1`}>
                      <span className="text-xs">{trendingBadge.icon}</span>
                      {trendingBadge.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className={`font-bold mt-2 mb-3 text-lg leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.description}
                  </p>
                  
                  {/* Metrics Section */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.readTime}
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.createdAt}
                    </span>
                  </div>
                  
                  {/* Like, Views, and Trending Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    {/* Like Button - FIXED */}
                    <button
                      onClick={(e) => handleLike(post, e)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 ${
                        isLiked
                          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                          : isDarkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                            : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                      }`}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill={isLiked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      <span className="text-xs font-medium">{formatNumber(post.likes || 0)}</span>
                    </button>

                    {/* Views */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs font-medium">{formatNumber(post.views || 0)}</span>
                    </div>

                    {/* Trending Indicator */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${trendingIndicator}`}>
                      <span>{trendingBadge.icon}</span>
                      <span>
                        {post.trendingLevel === 'high' ? 'HOT' : 
                         post.trendingLevel === 'medium' ? 'TRENDING' : 'POPULAR'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-16 mb-8">
          <div className={`inline-flex items-center gap-1 px-2 py-2 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            {/* Previous Arrow */}
            <button
              key="pagination-prev"
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? isDarkMode 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-300 cursor-not-allowed'
                  : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={`pagination-${number}`}
                onClick={() => paginate(number)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === number
                    ? 'bg-gray-800 text-white shadow-lg scale-110'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {number}
              </button>
            ))}

            {/* Next Arrow */}
            <button
              key="pagination-next"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? isDarkMode 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-300 cursor-not-allowed'
                  : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* No Posts Message */}
      {filteredBlogs.length === 0 && !activeSearchQuery && (
        <div className="text-center py-12">
          <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>📝</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            No posts found
          </h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {activeCategory === 'All' 
              ? 'No blog posts available yet.' 
              : `No blog posts available for ${activeCategory} category.`}
          </p>
        </div>
      )}

      {/* Scroll to Top Button */}
      {currentPage > 1 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            title="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogGrid;