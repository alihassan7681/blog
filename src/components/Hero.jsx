// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// const Hero = ({ isDarkMode, activeCategory, setActiveCategory, categories }) => {
//   const { openSignUpModal } = useAuth(); // YEH ADD KARNA HAI

//   return (
//     <section className="max-w-4xl mx-auto px-8 py-16 text-center">
//       <div className="inline-block mb-6">
//         <span className="text-purple-600 text-sm font-medium bg-purple-100 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-300 cursor-pointer">
//           Start Blogging For Free ▲
//         </span>
//       </div>
      
//       <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//         Your own <span className="text-purple-600">blogging</span><br />platform.
//       </h1>
      
//       <p className={`mb-8 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//         The most advanced blog management platform used by professionals. Build the blog of your dreams! Seamlessly grow your blog! Effortlessly grow your brand!
//       </p>

//       {/* Email Signup */}
//       <div className="flex gap-3 max-w-md mx-auto mb-8">
//         <input
//           type="email"
//           placeholder="Insert Email"
//           className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300 ${
//             isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'border-gray-300'
//           }`}
//         />
//         <button 
//           onClick={openSignUpModal} // YEH CHANGE KARNA HAI
//           className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 hover:scale-105"
//         >
//           Get Started
//         </button>
//       </div>

//       {/* YEH NAYA SECTION ADD KARNA HAI */}
//       <div className="mb-8">
//         <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
//           Ready to start your blogging journey?
//         </p>
//         <button 
//           onClick={openSignUpModal} // YEH ADD KARNA HAI
//           className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-all duration-300"
//         >
//           Create Free Account
//         </button>
//       </div>

//       {/* Categories */}
//       <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveCategory(category)}
//             className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
//               activeCategory === category
//                 ? 'bg-purple-600 text-white hover:bg-purple-700'
//                 : isDarkMode
//                 ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-800'
//                 : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;




import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Hero = ({ isDarkMode, activeCategory, setActiveCategory, categories }) => {
  const { openSignUpModal } = useAuth();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
      {/* Badge */}
      <div className="inline-block mb-6 sm:mb-8 animate-bounce">
        <span className={`text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer inline-flex items-center gap-2 ${
          isDarkMode 
            ? 'bg-white text-gray-900 hover:bg-gray-200 hover:shadow-lg' 
            : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
        }`}>
          <span className="hidden sm:inline">🚀</span> Start Blogging For Free ▲
        </span>
      </div>
      
      {/* Main Heading */}
      <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Your own <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} relative inline-block`}>
          blogging
          <span className={`absolute bottom-0 left-0 w-full h-1 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
        </span><br />
        platform.
      </h1>
      
      {/* Subheading */}
      <p className={`text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        The most advanced blog management platform used by professionals worldwide. Build the blog of your dreams with powerful tools and intuitive design. Seamlessly grow your audience and reach millions! Effortlessly grow your brand with analytics and insights!
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className={`p-4 sm:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10K+</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Bloggers</div>
        </div>
        <div className={`p-4 sm:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>50M+</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Readers</div>
        </div>
        <div className={`p-4 sm:p-6 rounded-lg col-span-2 sm:col-span-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>99.9%</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uptime</div>
        </div>
      </div>

      {/* Email Signup */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8 sm:mb-10 px-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className={`flex-1 px-4 sm:px-5 py-3 sm:py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-white focus:border-white' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-900 focus:border-gray-900'
          }`}
        />
        <button 
          onClick={openSignUpModal}
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base whitespace-nowrap ${
            isDarkMode
              ? 'bg-white text-gray-900 hover:bg-gray-200'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Get Started Free
        </button>
      </div>

      {/* Features List */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 text-xs sm:text-sm">
        {['✓ No credit card required', '✓ 14-day free trial', '✓ Cancel anytime'].map((feature, index) => (
          <span key={index} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
            {feature}
          </span>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="mb-10 sm:mb-12 px-4">
        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          Ready to start your blogging journey? Join thousands of creators already using our platform.
        </p>
        <button 
          onClick={openSignUpModal}
          className={`border-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base ${
            isDarkMode
              ? 'border-white text-white hover:bg-white hover:text-gray-900'
              : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
          }`}
        >
          Create Free Account →
        </button>
      </div>

      {/* Categories */}
      <div className="border-t pt-8 sm:pt-10 px-4" style={{borderColor: isDarkMode ? '#374151' : '#e5e7eb'}}>
        <p className={`text-xs sm:text-sm font-medium mb-4 sm:mb-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          EXPLORE BY CATEGORY
        </p>
        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === category
                  ? isDarkMode
                    ? 'bg-white text-gray-900 hover:bg-gray-200 shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;