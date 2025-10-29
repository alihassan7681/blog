import express from 'express';

const router = express.Router();

// Temporary storage for ALL posts
let allBlogPosts = [
  {
    id: 1,
    category: "BUSINESS",
    title: "A detailed plan to play guide to manage your PayPal",
    description: "Progressively incentivize cooperative systems through technically sound functionalities.",
    content: "This is the full content of the business blog post about PayPal management...",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    author: "John Doe",
    readTime: "5 min read",
    createdAt: "2024-01-15",
    tags: ["Business", "PayPal", "Finance"]
  },
  {
    id: 2,
    category: "TECHNOLOGY", 
    title: "Learning new technology to manage your lifestyle",
    description: "Progressively incentivize cooperative systems through technically sound functionalities.",
    content: "How technology can help you manage your daily lifestyle efficiently...",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop",
    author: "Mike Johnson",
    readTime: "6 min read",
    createdAt: "2024-01-08",
    tags: ["Technology", "Lifestyle", "Apps"]
  }
];

// SECRET Admin Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// 1. ADMIN LOGIN
router.post('/login', async (req, res) => {
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

    // Check credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Create simple token
    const token = 'admin-token-' + Date.now();

    console.log('✅ Admin logged in successfully, token:', token);

    res.json({
      success: true,
      message: 'Admin login successful!',
      token,
      admin: {
        username: ADMIN_CREDENTIALS.username,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// 2. ADD NEW BLOG POST
router.post('/blogs', async (req, res) => {
  try {
    const { title, description, content, image, category, tags } = req.body;

    console.log('📝 Adding new blog post:', title);
    console.log('📦 Received data:', req.body);

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

    // Create new blog post
    const newBlog = {
      id: Date.now(),
      title,
      description,
      content: content || description,
      image,
      category: category.toUpperCase(),
      author: 'Admin',
      readTime: `${Math.ceil((content || description).split(' ').length / 200)} min read`,
      createdAt: new Date().toISOString().split('T')[0],
      tags: processedTags
    };

    // Add to posts array (beginning mein)
    allBlogPosts.unshift(newBlog);

    console.log('✅ New blog post added:', newBlog.title);
    console.log('📊 Total posts now:', allBlogPosts.length);

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

// 3. GET ALL BLOG POSTS (For website)
router.get('/blogs', async (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredPosts = allBlogPosts;
    
    if (category && category !== 'All') {
      filteredPosts = allBlogPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    console.log('📖 Fetching blog posts, count:', filteredPosts.length);
    
    res.json({
      success: true,
      count: filteredPosts.length,
      posts: filteredPosts
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

// 4. GET SINGLE BLOG POST
router.get('/blogs/:id', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog'
    });
  }
});

// 5. DELETE BLOG POST
router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const postIndex = allBlogPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const deletedPost = allBlogPosts.splice(postIndex, 1)[0];
    
    console.log('🗑️ Blog post deleted:', deletedPost.title);
    console.log('📊 Total posts now:', allBlogPosts.length);

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      post: deletedPost
    });

  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post'
    });
  }
});

// 6. UPDATE BLOG POST
router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, category, tags } = req.body;

    const postIndex = allBlogPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
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
      processedTags = allBlogPosts[postIndex].tags;
    }

    // Update post
    allBlogPosts[postIndex] = {
      ...allBlogPosts[postIndex],
      title: title || allBlogPosts[postIndex].title,
      description: description || allBlogPosts[postIndex].description,
      content: content || allBlogPosts[postIndex].content,
      image: image || allBlogPosts[postIndex].image,
      category: category ? category.toUpperCase() : allBlogPosts[postIndex].category,
      tags: processedTags,
      updatedAt: new Date().toISOString()
    };

    console.log('✏️ Blog post updated:', allBlogPosts[postIndex].title);

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      post: allBlogPosts[postIndex]
    });

  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post'
    });
  }
});

// 7. GET ALL CATEGORIES
router.get('/categories', async (req, res) => {
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
      message: 'Error fetching categories'
    });
  }
});

export default router;