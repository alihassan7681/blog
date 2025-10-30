// import express from 'express';
// import cors from 'cors';


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Temporary storage for ALL posts and users
// let allBlogPosts = [
//   {
//     id: 1,
//     category: "BUSINESS",
//     title: "A detailed plan to play guide to manage your PayPal",
//     description: "Progressively incentivize cooperative systems through technically sound functionalities.",
//     content: "This is the full content of the business blog post about PayPal management...",
//     image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
//     author: "John Doe",
//     readTime: "5 min read",
//     createdAt: "2024-01-15",
//     tags: ["Business", "PayPal", "Finance"]
//   }
// ];

// // Temporary storage for users
// let users = [
//   {
//     id: 1,
//     name: "Test User",
//     email: "test@example.com",
//     password: "password123", // In production, hash karna hoga
//     createdAt: new Date().toISOString()
//   }
// ];

// // CORS Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
// }));

// app.options('*', cors());
// app.use(express.json());

// // ==================== AUTH ROUTES ====================

// // 1. USER SIGN UP
// app.post('/api/auth/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     console.log('👤 User signup attempt:', email);

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email and password are required'
//       });
//     }

//     // Check if user already exists
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email'
//       });
//     }

//     // Create new user (password should be hashed in production)
//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//       password, // In production: await bcrypt.hash(password, 12)
//       createdAt: new Date().toISOString()
//     };

//     users.push(newUser);

//     console.log('✅ New user created:', email);

//     // Create simple token (in production use JWT)
//     const token = 'user-token-' + Date.now();

//     // Response (password exclude karein)
//     const userResponse = {
//       id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       createdAt: newUser.createdAt
//     };

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully!',
//       user: userResponse,
//       token
//     });

//   } catch (error) {
//     console.error('❌ Signup error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // 2. USER SIGN IN
// app.post('/api/auth/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log('🔐 User signin attempt:', email);

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//     }

//     // Find user
//     const user = users.find(u => u.email === email);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Check password (in production: await bcrypt.compare(password, user.password))
//     if (password !== user.password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid password'
//       });
//     }

//     // Create simple token
//     const token = 'user-token-' + Date.now();

//     console.log('✅ User signed in:', email);

//     // Response (password exclude karein)
//     const userResponse = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       createdAt: user.createdAt
//     };

//     res.json({
//       success: true,
//       message: 'Login successful!',
//       user: userResponse,
//       token
//     });

//   } catch (error) {
//     console.error('❌ Signin error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // 3. CHECK AUTH (Token verification)
// app.post('/api/auth/check', async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token provided'
//       });
//     }

//     // Simple token verification
//     if (token.startsWith('user-token-') || token.startsWith('admin-token-')) {
//       // Find user by token (simplified)
//       let user = null;
//       if (token.startsWith('user-token-')) {
//         // For demo, first user return karein
//         user = users[0] ? {
//           id: users[0].id,
//           name: users[0].name,
//           email: users[0].email,
//           createdAt: users[0].createdAt
//         } : null;
//       } else if (token.startsWith('admin-token-')) {
//         user = {
//           username: 'admin',
//           role: 'admin'
//         };
//       }

//       if (user) {
//         return res.json({
//           success: true,
//           user
//         });
//       }
//     }

//     return res.status(401).json({
//       success: false,
//       message: 'Invalid token'
//     });

//   } catch (error) {
//     console.error('Auth check error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // ==================== BLOG ROUTES ====================

// // 4. GET ALL BLOG POSTS (For website)
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const { category } = req.query;
    
//     let filteredPosts = allBlogPosts;
    
//     if (category && category !== 'All') {
//       filteredPosts = allBlogPosts.filter(post => 
//         post.category.toLowerCase() === category.toLowerCase()
//       );
//     }
    
//     console.log('📖 Fetching blog posts for website, count:', filteredPosts.length);
    
//     res.json({
//       success: true,
//       count: filteredPosts.length,
//       posts: filteredPosts
//     });
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching blogs'
//     });
//   }
// });

// // 5. GET SINGLE BLOG POST
// app.get('/api/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = allBlogPosts.find(p => p.id === parseInt(id));
    
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       post
//     });
//   } catch (error) {
//     console.error('Error fetching blog:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching blog'
//     });
//   }
// });

// // 6. GET ALL CATEGORIES
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = ['All', 'BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN'];
    
//     res.json({
//       success: true,
//       categories
//     });
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching categories'
//     });
//   }
// });

// // ==================== ADMIN ROUTES ====================

// // 7. ADMIN LOGIN
// app.post('/api/admin/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     console.log('🔐 Admin login attempt:', username);

//     // SECRET Admin Credentials
//     const ADMIN_CREDENTIALS = {
//       username: 'admin',
//       password: 'admin123'
//     };

//     // Validation
//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Username and password are required'
//       });
//     }

//     // Check credentials
//     if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid admin credentials'
//       });
//     }

//     // Create simple token
//     const token = 'admin-token-' + Date.now();

//     console.log('✅ Admin logged in successfully, token:', token);

//     res.json({
//       success: true,
//       message: 'Admin login successful!',
//       token,
//       admin: {
//         username: ADMIN_CREDENTIALS.username,
//         role: 'admin'
//       }
//     });

//   } catch (error) {
//     console.error('❌ Admin login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // 8. ADD NEW BLOG POST (Admin)
// app.post('/api/admin/blogs', async (req, res) => {
//   try {
//     const { title, description, content, image, category, tags } = req.body;

//     console.log('📝 Adding new blog post:', title);

//     // Validation
//     if (!title || !description || !image || !category) {
//       return res.status(400).json({
//         success: false,
//         message: 'Title, description, image and category are required'
//       });
//     }

//     // Tags ko properly handle karein
//     let processedTags = [];
    
//     if (tags) {
//       if (typeof tags === 'string') {
//         processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       } else if (Array.isArray(tags)) {
//         processedTags = tags;
//       }
//     } else {
//       processedTags = [category];
//     }

//     // Create new blog post
//     const newBlog = {
//       id: Date.now(),
//       title,
//       description,
//       content: content || description,
//       image,
//       category: category.toUpperCase(),
//       author: 'Admin',
//       readTime: `${Math.ceil((content || description).split(' ').length / 200)} min read`,
//       createdAt: new Date().toISOString().split('T')[0],
//       tags: processedTags
//     };

//     // Add to posts array (beginning mein)
//     allBlogPosts.unshift(newBlog);

//     console.log('✅ New blog post added:', newBlog.title);
//     console.log('📊 Total posts now:', allBlogPosts.length);

//     res.status(201).json({
//       success: true,
//       message: 'Blog post added successfully!',
//       blog: newBlog
//     });

//   } catch (error) {
//     console.error('❌ Add blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // 9. GET ALL ADMIN BLOG POSTS
// app.get('/api/admin/blogs', async (req, res) => {
//   try {
//     res.json({
//       success: true,
//       count: allBlogPosts.length,
//       posts: allBlogPosts
//     });
//   } catch (error) {
//     console.error('Error fetching admin blogs:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching admin blogs'
//     });
//   }
// });

// // 10. DELETE BLOG POST
// app.delete('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const postIndex = allBlogPosts.findIndex(post => post.id === parseInt(id));
    
//     if (postIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }

//     const deletedPost = allBlogPosts.splice(postIndex, 1)[0];
    
//     console.log('🗑️ Blog post deleted:', deletedPost.title);
//     console.log('📊 Total posts now:', allBlogPosts.length);

//     res.json({
//       success: true,
//       message: 'Blog post deleted successfully',
//       post: deletedPost
//     });

//   } catch (error) {
//     console.error('Delete blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting blog post'
//     });
//   }
// });

// // 11. UPDATE BLOG POST
// app.put('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, content, image, category, tags } = req.body;

//     const postIndex = allBlogPosts.findIndex(post => post.id === parseInt(id));
    
//     if (postIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }

//     // Tags ko properly handle karein
//     let processedTags = [];
    
//     if (tags) {
//       if (typeof tags === 'string') {
//         processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       } else if (Array.isArray(tags)) {
//         processedTags = tags;
//       }
//     } else {
//       processedTags = allBlogPosts[postIndex].tags;
//     }

//     // Update post
//     allBlogPosts[postIndex] = {
//       ...allBlogPosts[postIndex],
//       title: title || allBlogPosts[postIndex].title,
//       description: description || allBlogPosts[postIndex].description,
//       content: content || allBlogPosts[postIndex].content,
//       image: image || allBlogPosts[postIndex].image,
//       category: category ? category.toUpperCase() : allBlogPosts[postIndex].category,
//       tags: processedTags,
//       updatedAt: new Date().toISOString()
//     };

//     console.log('✏️ Blog post updated:', allBlogPosts[postIndex].title);

//     res.json({
//       success: true,
//       message: 'Blog post updated successfully',
//       post: allBlogPosts[postIndex]
//     });

//   } catch (error) {
//     console.error('Update blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating blog post'
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running!',
//     timestamp: new Date().toISOString(),
//     postsCount: allBlogPosts.length,
//     usersCount: users.length
//   });
// });

// // Handle 404 routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Backend server running on http://localhost:${PORT}`);
//   console.log(`🌐 CORS enabled for: http://localhost:5173`);
//   console.log(`📊 Initial posts count: ${allBlogPosts.length}`);
//   console.log(`👤 Initial users count: ${users.length}`);
//   console.log(`📝 Available endpoints:`);
//   console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
//   console.log(`   POST http://localhost:${PORT}/api/auth/signin`);
//   console.log(`   GET  http://localhost:${PORT}/api/blogs`);
//   console.log(`   POST http://localhost:${PORT}/api/admin/login`);
// });








// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import connectDB from './config/database.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Import models
// import User from './models/User.js';
// import Admin from './models/Admin.js';
// import BlogPost from './models/BlogPost.js';

// // CORS Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
// }));

// app.options('*', cors());
// app.use(express.json());

// // ==================== INITIAL SETUP ====================

// // Create default admin account if not exists
// const createDefaultAdmin = async () => {
//   try {
//     const adminExists = await Admin.findOne({ username: 'admin' });
    
//     if (!adminExists) {
//       const defaultAdmin = new Admin({
//         username: 'admin',
//         password: 'admin123', // Model mein automatically hash hoga
//         email: 'admin@blog.com',
//         role: 'superadmin'
//       });
      
//       await defaultAdmin.save();
//       console.log('✅ Default admin account created: admin / admin123');
//     } else {
//       console.log('✅ Admin account already exists');
//     }
//   } catch (error) {
//     console.error('❌ Error creating default admin:', error);
//   }
// };

// // Initialize on server start
// createDefaultAdmin();

// // ==================== AUTH ROUTES ====================

// // 1. USER SIGN UP
// app.post('/api/auth/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     console.log('👤 User signup attempt:', email);

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email and password are required'
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email'
//       });
//     }

//     // Create new user
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//     });

//     console.log('✅ New user created:', email);

//     // Create simple token
//     const token = 'user-token-' + Date.now();

//     // Response (password exclude karein)
//     const userResponse = {
//       id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       createdAt: newUser.createdAt
//     };

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully!',
//       user: userResponse,
//       token
//     });

//   } catch (error) {
//     console.error('❌ Signup error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // 2. USER SIGN IN - FIXED ROUTE
// app.post('/api/auth/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log('🔐 User signin attempt:', email);

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//     }

//     // Find user and include password for comparison
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Check password using model method
//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid password'
//       });
//     }

//     // Create simple token
//     const token = 'user-token-' + Date.now();

//     console.log('✅ User signed in:', email);

//     // Response (password exclude karein)
//     const userResponse = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       createdAt: user.createdAt
//     };

//     res.json({
//       success: true,
//       message: 'Login successful!',
//       user: userResponse,
//       token
//     });

//   } catch (error) {
//     console.error('❌ Signin error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // 3. CHECK AUTH (Token verification)
// app.post('/api/auth/check', async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token provided'
//       });
//     }

//     // Simple token verification
//     if (token.startsWith('user-token-')) {
//       // For demo, first user return karein
//       const user = await User.findOne().sort({ createdAt: -1 });
//       if (user) {
//         return res.json({
//           success: true,
//           user: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             createdAt: user.createdAt
//           }
//         });
//       }
//     } else if (token.startsWith('admin-token-')) {
//       const admin = await Admin.findOne();
//       if (admin) {
//         return res.json({
//           success: false, // Changed to false for admin check
//           message: 'Invalid token format for admin'
//         });
//       }
//     }

//     return res.status(401).json({
//       success: false,
//       message: 'Invalid token'
//     });

//   } catch (error) {
//     console.error('Auth check error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // ==================== BLOG ROUTES ====================

// // 4. GET ALL BLOG POSTS (For website)
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const { category } = req.query;
    
//     let query = {};
    
//     if (category && category !== 'All') {
//       query.category = category.toUpperCase();
//     }
    
//     const posts = await BlogPost.find(query).sort({ createdAt: -1 });
    
//     console.log('📖 Fetching blog posts for website, count:', posts.length);
    
//     res.json({
//       success: true,
//       count: posts.length,
//       posts
//     });
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching blogs: ' + error.message
//     });
//   }
// });

// // 5. GET SINGLE BLOG POST - FIXED VERSION
// app.get('/api/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     console.log('📖 Fetching blog with ID:', id);
    
//     // ObjectId validation - allow both ObjectId and other formats
//     if (!id || id === 'undefined' || id === 'null') {
//       return res.status(400).json({
//         success: false,
//         message: 'Blog ID is required'
//       });
//     }
    
//     let post;
    
//     // Try as ObjectId first
//     if (mongoose.Types.ObjectId.isValid(id)) {
//       post = await BlogPost.findById(id);
//     } 
    
//     // If not found as ObjectId, try other methods
//     if (!post) {
//       // Try with id field
//       post = await BlogPost.findOne({ id: id });
//     }
    
//     if (!post) {
//       // Try with _id as string
//       post = await BlogPost.findOne({ _id: id });
//     }
    
//     if (!post) {
//       console.log('❌ Blog post not found with ID:', id);
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }
    
//     console.log('✅ Blog post found:', post.title);
    
//     res.json({
//       success: true,
//       post
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching blog:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching blog: ' + error.message
//     });
//   }
// });

// // 6. GET ALL CATEGORIES
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = ['All', 'BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN'];
    
//     res.json({
//       success: true,
//       categories
//     });
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching categories: ' + error.message
//     });
//   }
// });

// // ==================== ADMIN ROUTES ====================

// // 7. ADMIN LOGIN - FIXED VERSION
// app.post('/api/admin/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     console.log('🔐 Admin login attempt:', username);

//     // Validation
//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Username and password are required'
//       });
//     }

//     // Find admin and include password for comparison
//     const admin = await Admin.findOne({ username }).select('+password');
//     if (!admin) {
//       console.log('❌ Admin not found:', username);
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid admin credentials'
//       });
//     }

//     // Check password
//     const isPasswordValid = await admin.comparePassword(password);
//     if (!isPasswordValid) {
//       console.log('❌ Invalid password for admin:', username);
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid admin credentials'
//       });
//     }

//     // Create simple token
//     const token = 'admin-token-' + Date.now();

//     console.log('✅ Admin logged in successfully:', username);

//     res.json({
//       success: true,
//       message: 'Admin login successful!',
//       token,
//       admin: {
//         username: admin.username,
//         role: 'admin'
//       }
//     });

//   } catch (error) {
//     console.error('❌ Admin login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // 8. ADD NEW BLOG POST (Admin)
// app.post('/api/admin/blogs', async (req, res) => {
//   try {
//     const { title, description, content, image, category, tags } = req.body;

//     console.log('📝 Adding new blog post:', title);

//     // Validation
//     if (!title || !description || !image || !category) {
//       return res.status(400).json({
//         success: false,
//         message: 'Title, description, image and category are required'
//       });
//     }

//     // Tags ko properly handle karein
//     let processedTags = [];
    
//     if (tags) {
//       if (typeof tags === 'string') {
//         processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       } else if (Array.isArray(tags)) {
//         processedTags = tags;
//       }
//     } else {
//       processedTags = [category];
//     }

//     // Create new blog post in MongoDB
//     const newBlog = await BlogPost.create({
//       title,
//       description,
//       content: content || description,
//       image,
//       category: category.toUpperCase(),
//       author: 'Admin',
//       readTime: `${Math.ceil((content || description).split(' ').length / 200)} min read`,
//       tags: processedTags
//     });

//     console.log('✅ New blog post added:', newBlog.title);

//     res.status(201).json({
//       success: true,
//       message: 'Blog post added successfully!',
//       blog: newBlog
//     });

//   } catch (error) {
//     console.error('❌ Add blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message
//     });
//   }
// });

// // 9. GET ALL ADMIN BLOG POSTS
// app.get('/api/admin/blogs', async (req, res) => {
//   try {
//     const posts = await BlogPost.find().sort({ createdAt: -1 });
    
//     res.json({
//       success: true,
//       count: posts.length,
//       posts
//     });
//   } catch (error) {
//     console.error('Error fetching admin blogs:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching admin blogs: ' + error.message
//     });
//   }
// });

// // 10. DELETE BLOG POST
// app.delete('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid blog post ID'
//       });
//     }
    
//     const deletedPost = await BlogPost.findByIdAndDelete(id);
    
//     if (!deletedPost) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }

//     console.log('🗑️ Blog post deleted:', deletedPost.title);

//     res.json({
//       success: true,
//       message: 'Blog post deleted successfully',
//       post: deletedPost
//     });

//   } catch (error) {
//     console.error('Delete blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting blog post: ' + error.message
//     });
//   }
// });

// // 11. UPDATE BLOG POST
// app.put('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, content, image, category, tags } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid blog post ID'
//       });
//     }

//     // Server.js mein yeh route add karein (Admin Routes section mein):

// // 12. VERIFY ADMIN TOKEN
// app.post('/api/admin/verify', async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token provided'
//       });
//     }

//     const token = authHeader.split(' ')[1];
    
//     // Simple token verification for demo
//     if (token.startsWith('admin-token-')) {
//       const admin = await Admin.findOne();
//       if (admin) {
//         return res.json({
//           success: true,
//           message: 'Token is valid',
//           admin: {
//             username: admin.username,
//             role: 'admin'
//           }
//         });
//       }
//     }

//     return res.status(401).json({
//       success: false,
//       message: 'Invalid token'
//     });

//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Token verification failed: ' + error.message
//     });
//   }
// });

//     // Tags ko properly handle karein
//     let processedTags = [];
    
//     if (tags) {
//       if (typeof tags === 'string') {
//         processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       } else if (Array.isArray(tags)) {
//         processedTags = tags;
//       }
//     }

//     // Update post
//     const updateData = {
//       ...(title && { title }),
//       ...(description && { description }),
//       ...(content && { content }),
//       ...(image && { image }),
//       ...(category && { category: category.toUpperCase() }),
//       ...(tags && { tags: processedTags }),
//       updatedAt: Date.now()
//     };

//     const updatedPost = await BlogPost.findByIdAndUpdate(
//       id, 
//       updateData, 
//       { new: true, runValidators: true }
//     );

//     if (!updatedPost) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog post not found'
//       });
//     }

//     console.log('✏️ Blog post updated:', updatedPost.title);

//     res.json({
//       success: true,
//       message: 'Blog post updated successfully',
//       post: updatedPost
//     });

//   } catch (error) {
//     console.error('Update blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating blog post: ' + error.message
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', async (req, res) => {
//   try {
//     const postsCount = await BlogPost.countDocuments();
//     const usersCount = await User.countDocuments();
//     const adminsCount = await Admin.countDocuments();

//     res.json({
//       success: true,
//       message: 'Server is running!',
//       timestamp: new Date().toISOString(),
//       postsCount,
//       usersCount,
//       adminsCount,
//       database: 'MongoDB Connected'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error: ' + error.message,
//       database: 'MongoDB Connection Failed'
//     });
//   }
// });

// // Handle 404 routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Backend server running on http://localhost:${PORT}`);
//   console.log(`🌐 CORS enabled for: http://localhost:5173`);
//   console.log(`🗄️ MongoDB Connected: ${process.env.MONGODB_URI}`);
//   console.log(`👤 Default Admin Credentials: admin / admin123`);
//   console.log(`📝 Available endpoints:`);
//   console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
//   console.log(`   POST http://localhost:${PORT}/api/auth/signin`);
//   console.log(`   GET  http://localhost:${PORT}/api/blogs`);
//   console.log(`   POST http://localhost:${PORT}/api/admin/login`);
// });






import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Import models
import User from './models/User.js';
import Admin from './models/Admin.js';
import BlogPost from './models/BlogPost.js';

// CORS Middleware - UPDATED for Vercel
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'https://blog-alihassan7681s-projects.vercel.app', 'https://*.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.options('*', cors());
app.use(express.json());

// ==================== INITIAL SETUP ====================

// Create default admin account if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const defaultAdmin = new Admin({
        username: 'admin',
        password: 'admin123',
        email: 'admin@blog.com',
        role: 'superadmin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin account created: admin / admin123');
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

// Initialize on server start
createDefaultAdmin();

// ==================== ROOT ROUTE ====================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'QuickBlog Backend API is running!',
    version: '1.0.0',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        signin: 'POST /api/auth/signin',
        check: 'POST /api/auth/check'
      },
      blogs: {
        getAll: 'GET /api/blogs',
        getOne: 'GET /api/blogs/:id',
        categories: 'GET /api/categories'
      },
      admin: {
        login: 'POST /api/admin/login',
        verify: 'POST /api/admin/verify',
        getAllBlogs: 'GET /api/admin/blogs',
        addBlog: 'POST /api/admin/blogs',
        updateBlog: 'PUT /api/admin/blogs/:id',
        deleteBlog: 'DELETE /api/admin/blogs/:id'
      }
    }
  });
});

// ==================== AUTH ROUTES ====================

// 1. USER SIGN UP
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('👤 User signup attempt:', email);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    console.log('✅ New user created:', email);

    // Create simple token
    const token = 'user-token-' + Date.now();

    // Response (password exclude karein)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// 2. USER SIGN IN
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 User signin attempt:', email);

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check password using model method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Create simple token
    const token = 'user-token-' + Date.now();

    console.log('✅ User signed in:', email);

    // Response (password exclude karein)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      message: 'Login successful!',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('❌ Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// 3. CHECK AUTH (Token verification)
app.post('/api/auth/check', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Simple token verification
    if (token.startsWith('user-token-')) {
      const user = await User.findOne().sort({ createdAt: -1 });
      if (user) {
        return res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          }
        });
      }
    } else if (token.startsWith('admin-token-')) {
      const admin = await Admin.findOne();
      if (admin) {
        return res.json({
          success: true,
          user: {
            username: admin.username,
            role: 'admin'
          }
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });

  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// ==================== BLOG ROUTES ====================

// 4. GET ALL BLOG POSTS (For website)
app.get('/api/blogs', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category.toUpperCase();
    }
    
    const posts = await BlogPost.find(query).sort({ createdAt: -1 });
    
    console.log('📖 Fetching blog posts for website, count:', posts.length);
    
    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs: ' + error.message
    });
  }
});

// 5. GET SINGLE BLOG POST
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('📖 Fetching blog with ID:', id);
    
    // ObjectId validation - allow both ObjectId and other formats
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required'
      });
    }
    
    let post;
    
    // Try as ObjectId first
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findById(id);
    } 
    
    // If not found as ObjectId, try other methods
    if (!post) {
      // Try with id field
      post = await BlogPost.findOne({ id: id });
    }
    
    if (!post) {
      // Try with _id as string
      post = await BlogPost.findOne({ _id: id });
    }
    
    if (!post) {
      console.log('❌ Blog post not found with ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    console.log('✅ Blog post found:', post.title);
    
    res.json({
      success: true,
      post
    });
    
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog: ' + error.message
    });
  }
});

// 6. GET ALL CATEGORIES
app.get('/api/categories', async (req, res) => {
  try {
    const categories = ['All', 'BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN'];
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories: ' + error.message
    });
  }
});

// ==================== ADMIN ROUTES ====================

// 7. ADMIN LOGIN
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('🔐 Admin login attempt:', username);

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin and include password for comparison
    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      console.log('❌ Admin not found:', username);
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for admin:', username);
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Create simple token
    const token = 'admin-token-' + Date.now();

    console.log('✅ Admin logged in successfully:', username);

    res.json({
      success: true,
      message: 'Admin login successful!',
      token,
      admin: {
        username: admin.username,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// 8. VERIFY ADMIN TOKEN
app.post('/api/admin/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Simple token verification for demo
    if (token.startsWith('admin-token-')) {
      const admin = await Admin.findOne();
      if (admin) {
        return res.json({
          success: true,
          message: 'Token is valid',
          admin: {
            username: admin.username,
            role: 'admin'
          }
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Token verification failed: ' + error.message
    });
  }
});

// 9. ADD NEW BLOG POST (Admin)
app.post('/api/admin/blogs', async (req, res) => {
  try {
    const { title, description, content, image, category, tags } = req.body;

    console.log('📝 Adding new blog post:', title);

    // Validation
    if (!title || !description || !image || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, image and category are required'
      });
    }

    // Tags ko properly handle karein
    let processedTags = [];
    
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(tags)) {
        processedTags = tags;
      }
    } else {
      processedTags = [category];
    }

    // Create new blog post in MongoDB
    const newBlog = await BlogPost.create({
      title,
      description,
      content: content || description,
      image,
      category: category.toUpperCase(),
      author: 'Admin',
      readTime: `${Math.ceil((content || description).split(' ').length / 200)} min read`,
      tags: processedTags
    });

    console.log('✅ New blog post added:', newBlog.title);

    res.status(201).json({
      success: true,
      message: 'Blog post added successfully!',
      blog: newBlog
    });

  } catch (error) {
    console.error('❌ Add blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// 10. GET ALL ADMIN BLOG POSTS
app.get('/api/admin/blogs', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin blogs: ' + error.message
    });
  }
});

// 11. DELETE BLOG POST
app.delete('/api/admin/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID'
      });
    }
    
    const deletedPost = await BlogPost.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    console.log('🗑️ Blog post deleted:', deletedPost.title);

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      post: deletedPost
    });

  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post: ' + error.message
    });
  }
});

// 12. UPDATE BLOG POST
app.put('/api/admin/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, category, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID'
      });
    }

    // Tags ko properly handle karein
    let processedTags = [];
    
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(tags)) {
        processedTags = tags;
      }
    }

    // Update post
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(content && { content }),
      ...(image && { image }),
      ...(category && { category: category.toUpperCase() }),
      ...(tags && { tags: processedTags }),
      updatedAt: Date.now()
    };

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    console.log('✏️ Blog post updated:', updatedPost.title);

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      post: updatedPost
    });

  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post: ' + error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const postsCount = await BlogPost.countDocuments();
    const usersCount = await User.countDocuments();
    const adminsCount = await Admin.countDocuments();

    res.json({
      success: true,
      message: 'Server is running on Vercel!',
      timestamp: new Date().toISOString(),
      postsCount,
      usersCount,
      adminsCount,
      database: 'MongoDB Connected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
      database: 'MongoDB Connection Failed'
    });
  }
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Export for Vercel (IMPORTANT!)
export default app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`🌐 CORS enabled for frontend`);
    console.log(`🗄️ MongoDB Connected`);
    console.log(`👤 Default Admin: admin / admin123`);
  });
}