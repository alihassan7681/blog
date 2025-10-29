// import express from 'express';
// const router = express.Router();

// // Temporary storage for ALL blog posts (public + admin)
// let allBlogPosts = [
//   // Existing public posts
//   {
//     id: 1,
//     category: "BUSINESS",
//     title: "A detailed plan to play guide to manage your PayPal",
//     description: "Progressively incentivize cooperative systems through technically sound functionalities.",
//     image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop",
//     author: "John Doe",
//     readTime: "5 min read",
//     createdAt: "2024-01-15"
//   },
//   {
//     id: 2,
//     category: "BUSINESS",
//     title: "How to choose an effective and fast route to find clients",
//     description: "Progressively incentivize cooperative systems through technically sound functionalities.",
//     content: "Complete guide on finding clients quickly and effectively for your business...",
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
//     author: "Jane Smith",
//     readTime: "4 min read",
//     createdAt: "2024-01-10",
//     tags: ["Business", "Clients", "Marketing"]
//   },
//   {
//     id: 3,
//     category: "TECHNOLOGY",
//     title: "Learning new technology to manage your lifestyle",
//     description: "Progressively incentivize cooperative systems through technically sound functionalities.",
//     content: "How technology can help you manage your daily lifestyle efficiently...",
//     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop",
//     author: "Mike Johnson",
//     readTime: "6 min read",
//     createdAt: "2024-01-08",
//     tags: ["Technology", "Lifestyle", "Apps"]
//   },
//   {
//     id: 4,
//     category: "TECHNOLOGY",
//     title: "Latest Tech Trends in 2024",
//     description: "Discover the latest technology trends that will dominate 2024.",
//     content: "Complete overview of AI, blockchain, and other emerging technologies...",
//     image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
//     author: "Sarah Wilson",
//     readTime: "7 min read",
//     createdAt: "2024-01-05",
//     tags: ["Technology", "Trends", "AI"]
//   },
//   {
//     id: 5,
//     category: "FINANCE",
//     title: "Smart Investment Strategies for Beginners",
//     description: "Learn how to start investing with minimal risk and maximum returns.",
//     content: "Beginner-friendly guide to investment strategies and portfolio management...",
//     image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
//     author: "Robert Brown",
//     readTime: "8 min read",
//     createdAt: "2024-01-03",
//     tags: ["Finance", "Investment", "Money"]
//   },
//   {
//     id: 6,
//     category: "FINANCE",
//     title: "Personal Finance Management Tips",
//     description: "Essential tips to manage your personal finances effectively.",
//     content: "Comprehensive guide to budgeting, saving, and financial planning...",
//     image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
//     author: "Emily Davis",
//     readTime: "5 min read",
//     createdAt: "2024-01-01",
//     tags: ["Finance", "Personal", "Budgeting"]
//   },
//   {
//     id: 7,
//     category: "LIFESTYLE",
//     title: "Healthy Living in Modern World",
//     description: "Balancing work and health in today's fast-paced world.",
//     content: "Tips and strategies for maintaining a healthy lifestyle...",
//     image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop",
//     author: "Lisa Anderson",
//     readTime: "6 min read",
//     createdAt: "2023-12-28",
//     tags: ["Lifestyle", "Health", "Wellness"]
//   },
//   {
//     id: 8,
//     category: "CAREERS",
//     title: "Career Growth Strategies for 2024",
//     description: "How to advance your career in the current job market.",
//     content: "Professional development strategies and career advancement tips...",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
//     author: "David Miller",
//     readTime: "7 min read",
//     createdAt: "2023-12-25",
//     tags: ["Careers", "Growth", "Professional"]
//   },
//   {
//     id: 9,
//     category: "CAREERS",
//     title: "Remote Work Best Practices",
//     description: "Mastering the art of working from home efficiently.",
//     content: "Complete guide to productivity and work-life balance in remote work...",
//     image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
//     author: "Karen White",
//     readTime: "5 min read",
//     createdAt: "2023-12-20",
//     tags: ["Careers", "Remote Work", "Productivity"]
//   }
//   // ... other existing posts
// ];

// // Get all blog posts with optional category filter
// router.get('/blogs', (req, res) => {
//   const { category } = req.query;
  
//   let filteredPosts = allBlogPosts;
  
//   if (category && category !== 'All') {
//     filteredPosts = allBlogPosts.filter(post => 
//       post.category.toLowerCase() === category.toLowerCase()
//     );
//   }
  
//   res.json({
//     success: true,
//     count: filteredPosts.length,
//     posts: filteredPosts
//   });
// });

// // Get single blog post by ID
// router.get('/blogs/:id', (req, res) => {
//   const { id } = req.params;
//   const post = allBlogPosts.find(p => p.id === parseInt(id));
  
//   if (!post) {
//     return res.status(404).json({
//       success: false,
//       message: 'Blog post not found'
//     });
//   }
  
//   res.json({
//     success: true,
//     post
//   });
// });

// // Get all categories
// router.get('/categories', (req, res) => {
//   const categories = ['All', 'BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN'];
  
//   res.json({
//     success: true,
//     categories
//   });
// });

// export default router;

import express from 'express';
const router = express.Router();

// YEH ARRAY BANAYEIN JO DONO POSTS STORE KAREGA
let allBlogPosts = [
  // Existing public posts yahan rahenge
  {
    id: 1,
    category: "BUSINESS",
    title: "A detailed plan to play guide to manage your PayPal",
    description: "Progressively incentivize cooperative systems through technically sound functionalities.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop",
    author: "John Doe",
    readTime: "5 min read",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    category: "BUSINESS",
    title: "How to choose an effective and fast route to find clients",
    description: "Progressively incentivize cooperative systems through technically sound functionalities.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
    author: "Jane Smith", 
    readTime: "4 min read",
    createdAt: "2024-01-10"
  }
  // ... aapke existing posts
];

// FUNCTION BANAYEIN JO ADMIN POSTS KO ADD KAREGA
export const addAdminPostToPublic = (post) => {
  allBlogPosts.unshift(post); // New post beginning mein add hoga
  console.log('✅ Admin post added to public:', post.title);
};

// Get all blog posts with optional category filter
router.get('/blogs', (req, res) => {
  const { category } = req.query;
  
  let filteredPosts = allBlogPosts;
  
  if (category && category !== 'All') {
    filteredPosts = allBlogPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  res.json({
    success: true,
    count: filteredPosts.length,
    posts: filteredPosts
  });
});

// Get single blog post by ID
router.get('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const post = allBlogPosts.find(p => p.id === parseInt(id));
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found'
    });
  }
  
  res.json({
    success: true,
    post
  });
});

// Get all categories
router.get('/categories', (req, res) => {
  const categories = ['All', 'BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN'];
  
  res.json({
    success: true,
    categories
  });
});

export default router;
export { allBlogPosts }; // Export karein taki admin routes use kar sake