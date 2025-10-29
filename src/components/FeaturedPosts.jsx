import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedPosts = ({ isDarkMode }) => {
  const navigate = useNavigate();

  // Featured posts data - aap isko props se bhi pass kar sakte ho
  const featuredPosts = [
    {
      id: 1,
      title: 'Explore more to get your comfort zone',
      subtitle: 'Book your perfect stay with us.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      buttonText: 'Booking Now',
      type: 'large', // large card
      hasOverlay: true
    },
    {
      id: 2,
      title: 'Article Available',
      count: '78',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
      type: 'small', // small card with count
      hasOverlay: true
    },
    {
      id: 3,
      title: 'Beyond accommodation, creating memories of a lifetime',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      type: 'large', // large horizontal card
      hasOverlay: true,
      isWide: true
    }
  ];

  const handleCardClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading Section */}
      <div className="mb-12 text-center">
        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Articles
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Discover our handpicked stories and experiences
        </p>
      </div>

      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Large Card with Button */}
        <div 
          onClick={() => handleCardClick(featuredPosts[0].id)}
          className={`lg:col-span-1 rounded-3xl overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode ? 'shadow-xl hover:shadow-purple-500/20' : 'shadow-lg hover:shadow-2xl'
          }`}
          style={{ minHeight: '400px' }}
        >
          <img 
            src={featuredPosts[0].image}
            alt={featuredPosts[0].title}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Text and Button */}
            <div>
              <h3 className="text-white text-3xl font-bold mb-3 leading-tight">
                {featuredPosts[0].title}
              </h3>
              <p className="text-gray-200 text-sm mb-6">
                {featuredPosts[0].subtitle}
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors duration-300">
                {featuredPosts[0].buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - 2 Cards Stacked */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Top Small Card with Number */}
          <div 
            onClick={() => handleCardClick(featuredPosts[1].id)}
            className={`rounded-3xl overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? 'shadow-xl hover:shadow-purple-500/20' : 'shadow-lg hover:shadow-2xl'
            }`}
            style={{ minHeight: '190px' }}
          >
            <img 
              src={featuredPosts[1].image}
              alt={featuredPosts[1].title}
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-gray-300 text-sm mb-2">{featuredPosts[1].title}</p>
              <h2 className="text-white text-6xl font-bold">{featuredPosts[1].count}</h2>
            </div>
          </div>

          {/* Bottom Large Horizontal Card */}
          <div 
            onClick={() => handleCardClick(featuredPosts[2].id)}
            className={`rounded-3xl overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? 'shadow-xl hover:shadow-purple-500/20' : 'shadow-lg hover:shadow-2xl'
            }`}
            style={{ minHeight: '190px' }}
          >
            <img 
              src={featuredPosts[2].image}
              alt={featuredPosts[2].title}
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex items-end">
              <h3 className="text-white text-2xl font-bold leading-tight max-w-2xl">
                {featuredPosts[2].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;