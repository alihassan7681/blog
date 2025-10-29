// import React from 'react';

// const Newsletter = ({ isDarkMode }) => {
//   return (
//     <section className="max-w-4xl mx-auto px-8 py-16 text-center">
//       <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//         Never Miss a Blog!
//       </h2>
//       <div className="flex gap-3 max-w-md mx-auto">
//         <input
//           type="email"
//           placeholder="Insert email here"
//           className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300 ${
//             isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'border-gray-300'
//           }`}
//         />
//         <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 hover:scale-105">
//           Subscribe Now
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;


import React from 'react';

const Newsletter = ({ isDarkMode }) => {
  return (
    <section className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center rounded-2xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      {/* Badge */}
      <div className="inline-block mb-4 sm:mb-6">
        <span className={`text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full ${
          isDarkMode 
            ? 'bg-gray-700 text-gray-300' 
            : 'bg-gray-200 text-gray-700'
        }`}>
          📬 STAY UPDATED
        </span>
      </div>

      {/* Heading */}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Never Miss a Blog!
      </h2>
      
      {/* Subheading */}
      <p className={`text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Subscribe to our newsletter and get the latest articles, updates, and exclusive content delivered straight to your inbox every week.
      </p>

      {/* Email Form */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className={`flex-1 px-4 sm:px-5 py-3 sm:py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-white focus:border-white' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-900 focus:border-gray-900'
          }`}
        />
        <button className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base whitespace-nowrap ${
          isDarkMode
            ? 'bg-white text-gray-900 hover:bg-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}>
          Subscribe Now →
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 text-xs sm:text-sm">
        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Weekly updates
        </span>
        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          No spam, ever
        </span>
        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Unsubscribe anytime
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
        <div className={`p-4 sm:p-5 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>25K+</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subscribers</div>
        </div>
        <div className={`p-4 sm:p-5 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4.9/5</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rating</div>
        </div>
        <div className={`p-4 sm:p-5 rounded-lg col-span-2 sm:col-span-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>100+</div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Articles Sent</div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;