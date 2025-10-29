// import React from 'react';

// const Footer = ({ isDarkMode }) => {
//   const footerLinks = {
//     "Quick Links": ['About', 'Get Started', 'Videos', 'Subscribe'],
//     "Start Out": ['Terms & Conditions', 'Privacy Policy', 'Refund Policy'],
//     "Pages": ['Privacy', 'Careers', 'Podcast']
//   };

//   return (
//     <footer className={`mt-16 transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//     }`}>
//       <div className="max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">QB</span>
//               </div>
//               <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
//                 Chai Aur Blog
//               </span>
//             </div>
//             <p className={`text-sm leading-relaxed ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-600'
//             }`}>
//               Build the blog you always wanted with us. A seamless experience in blogging.
//             </p>
//           </div>

//           {/* Dynamic Footer Links */}
//           {Object.entries(footerLinks).map(([title, links]) => (
//             <div key={title}>
//               <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 {title}
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <a href="#" className={`hover:text-purple-600 transition-colors duration-300 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                     }`}>
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className={`border-t mt-12 pt-8 text-center text-sm ${
//           isDarkMode 
//             ? 'border-gray-700 text-gray-400' 
//             : 'border-gray-200 text-gray-600'
//         }`}>
//           Copyright 2025 © ChaiAurBlog | Ali hassan 
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;













import React from 'react';
import { Twitter, Linkedin, Github, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  const footerLinks = {
    "Quick Links": ['About', 'Get Started', 'Videos', 'Subscribe'],
    "Start Out": ['Terms & Conditions', 'Privacy Policy', 'Refund Policy'],
    "Pages": ['Privacy', 'Careers', 'Podcast']
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'GitHub', icon: Github },
    { name: 'Instagram', icon: Instagram }
  ];

  return (
    <footer className={`mt-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-white' : 'bg-gray-900'
              }`}>
                <span className={`font-bold text-base ${
                  isDarkMode ? 'text-gray-900' : 'text-white'
                }`}>QB</span>
              </div>
              <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Chai Aur Blog
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Build the blog you always wanted with us. A seamless experience in blogging with powerful tools and amazing features.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href="#"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-white text-gray-400 hover:text-gray-900' 
                        : 'bg-gray-200 hover:bg-gray-900 text-gray-600 hover:text-white'
                    }`}
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className={`font-bold text-base sm:text-lg mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className={`transition-all duration-300 inline-flex items-center gap-2 group ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className={`mt-12 sm:mt-16 pt-8 sm:pt-12 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail className={isDarkMode ? 'text-white' : 'text-gray-900'} size={24} />
              <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay in the loop
              </h3>
            </div>
            <p className={`text-sm sm:text-base mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Join our newsletter to get updates about new features and releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-1 px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-white' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-900'
                }`}
              />
              <button className={`px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base whitespace-nowrap inline-flex items-center justify-center gap-2 ${
                isDarkMode
                  ? 'bg-white text-gray-900 hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t mt-12 sm:mt-16 pt-8 ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-base">
            <p className={`text-center sm:text-left ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Copyright 2025 © ChaiAurBlog | Ali Hassan
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
                Privacy Policy
              </a>
              <a href="#" className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;