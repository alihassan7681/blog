// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { AdminProvider } from './contexts/AdminContext';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import BlogGrid from './components/BlogGrid';
// import FeaturedPosts from './components/FeaturedPosts';
// import Newsletter from './components/Newsletter';
// import Footer from './components/Footer';
// import SignInModal from './components/auth/SignInModal';
// import SignUpModal from './components/auth/SignUpModal';
// import MessageToast from './components/MessageToast';
// import BlogDetail from './pages/BlogDetail';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';
// import { categories } from './data/blogPosts';
// // import BlogDetail from './components/BlogDetail';


// function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   // Handle search from Header
//   const handleSearch = (query) => {
//     console.log('🔍 App received search query:', query);
//     setSearchQuery(query);
//     setActiveCategory('All'); // Reset category when searching
//   };

//   return (
//     <AdminProvider>
//       <AuthProvider>
//         <Router>
//           <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-purple-50 to-white'}`}>
//             <MessageToast />
//             <Header 
//               isDarkMode={isDarkMode} 
//               toggleTheme={toggleTheme}
//               onSearch={handleSearch}
//             />
            
//             <Routes>
//               <Route 
//                 path="/" 
//                 element={
//                   <>
//                     <Hero 
//                       isDarkMode={isDarkMode} 
//                       activeCategory={activeCategory} 
//                       setActiveCategory={setActiveCategory}
//                       categories={categories}
//                     />
//                     <BlogGrid 
//                       isDarkMode={isDarkMode} 
//                       activeCategory={activeCategory}
//                       searchQuery={searchQuery}
//                       onSearchComplete={() => setSearchQuery('')}
//                     />
//                     <FeaturedPosts isDarkMode={isDarkMode} />
//                     <Newsletter isDarkMode={isDarkMode} />
//                   </>
//                 } 
//               />
//               <Route 
//                 path="/blog/:id" 
//                 element={<BlogDetail isDarkMode={isDarkMode} />} 
//               />
//               <Route 
//                 path="/admin/login" 
//                 element={<AdminLogin isDarkMode={isDarkMode} />} 
//               />
//               <Route 
//                 path="/admin/dashboard" 
//                 element={<AdminDashboard isDarkMode={isDarkMode} />} 
//               />
//             </Routes>
//             {/* <Route path="/blog/:id" element={<BlogDe isDarkMode={isDarkMode} user={user} />} /> */}
            
//             <Footer isDarkMode={isDarkMode} />
            
//             {/* AUTH MODALS */}
//             <SignInModal />
//             <SignUpModal />
//           </div>
//         </Router>
//       </AuthProvider>
//     </AdminProvider>
//   );
// }

// export default App;









import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Hero from './components/Hero';
import BlogGrid from './components/BlogGrid';
import FeaturedPosts from './components/FeaturedPosts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SignInModal from './components/auth/SignInModal';
import SignUpModal from './components/auth/SignUpModal';
import MessageToast from './components/MessageToast';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { categories } from './data/blogPosts';

// Global responsive CSS
const globalStyles = `
  /* Mobile First Responsive Design */
  @media (max-width: 640px) {
    .container-mobile {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .text-mobile-lg {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    
    .text-mobile-base {
      font-size: 0.875rem;
    }
    
    .grid-mobile {
      grid-template-columns: 1fr;
    }
  }
  
  @media (min-width: 641px) and (max-width: 768px) {
    .grid-tablet {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-desktop-sm {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Smooth transitions for theme change */
  .theme-transition {
    transition: all 0.3s ease-in-out;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query) => {
    console.log('🔍 App received search query:', query);
    setSearchQuery(query);
    setActiveCategory('All');
  };

  return (
    <AdminProvider>
      <AuthProvider>
        <Router>
          {/* Inject global styles */}
          <style>{globalStyles}</style>
          
          <div className={`min-h-screen theme-transition ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <MessageToast />
            <Header 
              isDarkMode={isDarkMode} 
              toggleTheme={toggleTheme}
              onSearch={handleSearch}
            />
            
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <Hero 
                      isDarkMode={isDarkMode} 
                      activeCategory={activeCategory} 
                      setActiveCategory={setActiveCategory}
                      categories={categories}
                    />
                    <BlogGrid 
                      isDarkMode={isDarkMode} 
                      activeCategory={activeCategory}
                      searchQuery={searchQuery}
                      onSearchComplete={() => setSearchQuery('')}
                    />
                    <FeaturedPosts isDarkMode={isDarkMode} />
                    <Newsletter isDarkMode={isDarkMode} />
                  </>
                } 
              />
              <Route 
                path="/blog/:id" 
                element={<BlogDetail isDarkMode={isDarkMode} />} 
              />
              <Route 
                path="/admin/login" 
                element={<AdminLogin isDarkMode={isDarkMode} />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={<AdminDashboard isDarkMode={isDarkMode} />} 
              />
            </Routes>
            
            <Footer isDarkMode={isDarkMode} />
            
            {/* AUTH MODALS */}
            <SignInModal />
            <SignUpModal />
          </div>
        </Router>
      </AuthProvider>
    </AdminProvider>
  );
}

export default App;