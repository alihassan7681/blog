// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { IoSunnyOutline, IoMoonSharp, IoSearchOutline, IoCloseOutline } from "react-icons/io5";

// const Header = ({ isDarkMode, toggleTheme, onSearch }) => {
//   const { user, openSignInModal, signOut } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     console.log('Sign In button clicked');
//     openSignInModal();
//     setIsMobileMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleSearch = () => {
//     setIsSearchOpen(!isSearchOpen);
//     if (!isSearchOpen) {
//       setSearchQuery('');
//     }
//   };

//   // ESC key press pe search close
//   useEffect(() => {
//     const handleEscKey = (e) => {
//       if (e.key === 'Escape' && isSearchOpen) {
//         setIsSearchOpen(false);
//         setSearchQuery('');
//       }
//     };

//     document.addEventListener('keydown', handleEscKey);
//     return () => document.removeEventListener('keydown', handleEscKey);
//   }, [isSearchOpen]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       console.log('🔍 Searching for:', searchQuery);
      
//       // Pass search query to parent
//       if (onSearch) {
//         onSearch(searchQuery);
//       }
      
//       // Navigate to home page
//       navigate('/');
      
//       // Close search
//       setIsSearchOpen(false);
//     }
//   };

//   const handleLogoClick = () => {
//     navigate('/');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center gap-3">
//               <div 
//                 onClick={handleLogoClick}
//                 className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:bg-purple-700 transition-all duration-300 hover:scale-110"
//               >
//                 <span className="text-white font-bold text-sm">QB</span>
//               </div>
//               <span 
//                 onClick={handleLogoClick}
//                 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} hidden sm:block cursor-pointer hover:text-purple-600 transition-colors`}
//               >
//                 Chai Aur Blog
//               </span>
//               <span 
//                 onClick={handleLogoClick}
//                 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} sm:hidden cursor-pointer hover:text-purple-600 transition-colors`}
//               >
//                 CAB
//               </span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center gap-4">
//               {/* Search Button */}
//               <button 
//                 onClick={toggleSearch}
//                 className={`p-2 rounded-full transition-all duration-300 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 } hover:scale-110`}
//                 aria-label="Search"
//               >
//                 <IoSearchOutline className="w-5 h-5" />
//               </button>

//               {/* Theme Toggle */}
//               <button 
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-full transition-all duration-300 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 } hover:scale-110`}
//                 aria-label="Toggle theme"
//               >
//                 {isDarkMode ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonSharp className="w-5 h-5" />}
//               </button>
              
//               {user ? (
//                 <div className="flex items-center gap-3">
//                   <span className={`${isDarkMode ? 'text-white' : 'text-gray-700'} text-sm font-medium`}>
//                     Welcome, <span className="text-purple-600">{user.name}</span>
//                   </span>
//                   <button 
//                     onClick={signOut}
//                     className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-sm"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <button 
//                   onClick={handleSignInClick}
//                   className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-2"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   Sign In
//                 </button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex md:hidden items-center gap-2">
//               {/* Search Button - Mobile */}
//               <button 
//                 onClick={toggleSearch}
//                 className={`p-2 rounded-full transition-all ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-gray-300' 
//                     : 'bg-gray-200 text-gray-700'
//                 }`}
//                 aria-label="Search"
//               >
//                 <IoSearchOutline className="w-5 h-5" />
//               </button>

//               {/* Theme Toggle - Mobile */}
//               <button 
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-full transition-all ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-yellow-300' 
//                     : 'bg-gray-200 text-gray-700'
//                 }`}
//                 aria-label="Toggle theme"
//               >
//                 {isDarkMode ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonSharp className="w-5 h-5" />}
//               </button>

//               <button
//                 onClick={toggleMobileMenu}
//                 className={`p-2 rounded-md transition-colors ${
//                   isDarkMode 
//                     ? 'text-gray-300 hover:bg-gray-700' 
//                     : 'text-gray-600 hover:bg-gray-200'
//                 }`}
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Search Bar Overlay */}
//           {isSearchOpen && (
//             <div className={`absolute left-0 right-0 top-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} animate-slideDown`}>
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                 <form onSubmit={handleSearch} className="relative">
//                   <div className="relative">
//                     <IoSearchOutline className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       placeholder="Search for articles, topics, keywords..."
//                       autoFocus
//                       className={`w-full pl-12 pr-12 py-3 rounded-full text-base transition-all ${
//                         isDarkMode 
//                           ? 'bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 border border-gray-700 focus:border-purple-500' 
//                           : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white border border-gray-300 focus:border-purple-500'
//                       } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
//                     />
//                     <button
//                       type="button"
//                       onClick={toggleSearch}
//                       className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
//                         isDarkMode 
//                           ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
//                           : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
//                       }`}
//                     >
//                       <IoCloseOutline className="w-5 h-5" />
//                     </button>
//                   </div>
                  
//                   {/* Search Tips */}
//                   <div className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-4`}>
//                     <span>💡 Try: "React", "Travel", "Health"</span>
//                     <span className="hidden sm:inline">Press ESC to close</span>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className={`md:hidden border-t transition-all duration-300 ${
//               isDarkMode ? 'border-gray-700' : 'border-gray-200'
//             }`}>
//               <div className="px-2 pt-2 pb-3 space-y-2">
//                 {user ? (
//                   <>
//                     <div className={`px-3 py-2 rounded-lg ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
//                     }`}>
//                       <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         Welcome, {user.name}
//                       </p>
//                       <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                         {user.email}
//                       </p>
//                     </div>
//                     <button 
//                       onClick={signOut}
//                       className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={handleSignInClick}
//                     className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     Sign In / Register
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* CSS in separate style tag - NO JSX attribute */}
//       <style>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;







import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IoSunnyOutline, IoMoonSharp, IoSearchOutline, IoCloseOutline } from "react-icons/io5";

const Header = ({ isDarkMode, toggleTheme, onSearch }) => {
  const { user, openSignInModal, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignInClick = () => {
    console.log('Sign In button clicked');
    openSignInModal();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  // ESC key press pe search close
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('🔍 Searching for:', searchQuery);
      
      // Pass search query to parent
      if (onSearch) {
        onSearch(searchQuery);
      }
      
      // Navigate to home page
      navigate('/');
      
      // Close search
      setIsSearchOpen(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`  ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div 
                onClick={handleLogoClick}
                className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <span className="text-white font-bold text-sm">QB</span>
              </div>
              <span 
                onClick={handleLogoClick}
                className={`text-xl font-bold hidden sm:block cursor-pointer transition-colors ${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                }`}
              >
                Chai Aur Blog
              </span>
              <span 
                onClick={handleLogoClick}
                className={`text-lg font-bold sm:hidden cursor-pointer transition-colors ${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                }`}
              >
                CAB
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Button */}
              <button 
                onClick={toggleSearch}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Search"
              >
                <IoSearchOutline className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonSharp className="w-5 h-5" />}
              </button>
              
              {user ? (
                <div className="flex items-center gap-3">
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-700'} text-sm font-medium hidden lg:block`}>
                    Welcome, <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.name}</span>
                  </span>
                  <button 
                    onClick={signOut}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignInClick}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Search Button - Mobile */}
              <button 
                onClick={toggleSearch}
                className={`p-2 rounded-full transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Search"
              >
                <IoSearchOutline className="w-5 h-5" />
              </button>

              {/* Theme Toggle - Mobile */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonSharp className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar Overlay */}
          {isSearchOpen && (
            <div className={`absolute left-0 right-0 top-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} animate-slideDown`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <IoSearchOutline className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for articles, topics, keywords..."
                      autoFocus
                      className={`w-full pl-12 pr-12 py-3 rounded-full text-base transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700 border border-gray-700 focus:border-gray-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white border border-gray-300 focus:border-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-gray-500/20`}
                    />
                    <button
                      type="button"
                      onClick={toggleSearch}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <IoCloseOutline className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Search Tips */}
                  <div className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1`}>
                    <span>💡 Try: "React", "Travel", "Health"</span>
                    <span className="text-xs">Press ESC to close</span>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden border-t transition-all duration-300 ${
              isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}>
              <div className="px-2 pt-2 pb-3 space-y-2">
                {user ? (
                  <>
                    {/* User Info */}
                    <div className={`px-3 py-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Welcome, {user.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </p>
                    </div>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={signOut}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  /* Sign In Button */
                  <button 
                    onClick={handleSignInClick}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign In / Register
                  </button>
                )}
                
                {/* Additional Mobile Menu Items */}
                <div className={`border-t pt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button 
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    🏠 Home
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/#blogs');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    📚 All Blogs
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* CSS in separate style tag */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        /* Mobile responsive improvements */
        @media (max-width: 640px) {
          .header-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        /* Tablet responsive */
        @media (min-width: 641px) and (max-width: 768px) {
          .header-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;