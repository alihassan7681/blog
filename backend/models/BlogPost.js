import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['BUSINESS', 'TECHNOLOGY', 'FINANCE', 'LIFESTYLE', 'CAREERS', 'DESIGN']
  },
  author: {
    type: String,
    default: 'Admin'
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

export default mongoose.model('BlogPost', blogPostSchema);

