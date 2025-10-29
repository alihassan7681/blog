// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useAdmin } from '../../contexts/AdminContext';

// const SignInModal = () => {
//   const [isAdminLogin, setIsAdminLogin] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     username: ''
//   });
//   const [errors, setErrors] = useState({});
  
//   const { signIn, loading: userLoading, closeAuthModals, isSignInModalOpen } = useAuth();
//   const { login: adminLogin, loading: adminLoading } = useAdmin();

//   const loading = userLoading || adminLoading;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (isAdminLogin) {
//       if (!formData.username) {
//         newErrors.username = 'Username is required';
//       }
//     } else {
//       if (!formData.email) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = 'Email is invalid';
//       }
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     if (isAdminLogin) {
//       // Admin login
//       const result = await adminLogin(formData.username, formData.password);
      
//       if (result.success) {
//         closeAuthModals();
//         // Admin dashboard par redirect
//         window.location.href = '/admin/dashboard';
//       } else {
//         setErrors({ submit: result.error });
//       }
//     } else {
//       // User login
//       const result = await signIn(formData.email, formData.password);
      
//       if (!result.success) {
//         setErrors({ submit: result.error });
//       }
//     }
//   };

//   const switchToAdmin = () => {
//     setIsAdminLogin(true);
//     setFormData({ email: '', password: '', username: '' });
//     setErrors({});
//   };

//   const switchToUser = () => {
//     setIsAdminLogin(false);
//     setFormData({ email: '', password: '', username: '' });
//     setErrors({});
//   };

//   if (!isSignInModalOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full p-6 mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {isAdminLogin ? 'Admin Login' : 'Sign In'}
//           </h2>
//           <button
//             onClick={closeAuthModals}
//             className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Login Type Tabs */}
//         <div className="flex border-b border-gray-200 mb-6">
//           <button
//             onClick={switchToUser}
//             className={`flex-1 py-2 text-center font-medium ${
//               !isAdminLogin 
//                 ? 'text-purple-600 border-b-2 border-purple-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             User Login
//           </button>
//           <button
//             onClick={switchToAdmin}
//             className={`flex-1 py-2 text-center font-medium ${
//               isAdminLogin 
//                 ? 'text-purple-600 border-b-2 border-purple-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Admin Login
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isAdminLogin ? (
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                 Admin Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                   errors.username ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter admin username"
//               />
//               {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
//             </div>
//           ) : (
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>
//           )}

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           {errors.submit && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
//               {errors.submit}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//           >
//             {loading ? 'Signing In...' : (isAdminLogin ? 'Sign In as Admin' : 'Sign In')}
//           </button>

//           {/* Admin Credentials Hint */}
//           {isAdminLogin && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//               <h4 className="text-sm font-medium text-yellow-800 mb-1">Admin Credentials:</h4>
//               <p className="text-xs text-yellow-700">
//                 Username: <span className="font-mono">admin</span><br/>
//                 Password: <span className="font-mono">admin123</span>
//               </p>
//             </div>
//           )}

//           <div className="text-center pt-2">
//             {isAdminLogin ? (
//               <button
//                 type="button"
//                 onClick={switchToUser}
//                 className="text-purple-600 hover:text-purple-800 text-sm font-medium"
//               >
//                 ← Back to User Login
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={switchToAdmin}
//                 className="text-purple-600 hover:text-purple-800 text-sm font-medium"
//               >
//                 Are you an admin? Click here
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
     
//     </div>
//   );
// };

// export default SignInModal;


// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useAdmin } from '../../contexts/AdminContext';

// const SignInModal = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
  
//   const { 
//     signIn, 
//     loading: userLoading, 
//     closeAuthModals, 
//     isSignInModalOpen,
//     switchToSignUp  // YEH ADD KARNA HAI
//   } = useAuth();
  
//   const { login: adminLogin, loading: adminLoading } = useAdmin();

//   const loading = userLoading || adminLoading;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     // SECRET: Check if admin credentials
//     if (formData.email === 'admin@blog.com' && formData.password === 'admin123') {
//       // Admin login
//       const result = await adminLogin('admin', 'admin123');
      
//       if (result.success) {
//         closeAuthModals();
//         // Admin dashboard par redirect
//         window.location.href = '/admin/dashboard';
//         return;
//       }
//     }

//     // Normal user login
//     const result = await signIn(formData.email, formData.password);
    
//     if (!result.success) {
//       setErrors({ submit: result.error });
//     }
//   };

//   if (!isSignInModalOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full p-6 mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
//           <button
//             onClick={closeAuthModals}
//             className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
//           >
//             &times;
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           {errors.submit && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
//               {errors.submit}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>

//           {/* YEH BUTTON UPDATE KARNA HAI */}
//           <div className="text-center pt-2">
//             <button
//               type="button"
//               onClick={switchToSignUp}  // YEH CHANGE KARNA HAI
//               className="text-purple-600 hover:text-purple-800 text-sm font-medium"
//             >
//               Don't have an account? Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInModal;





















import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';

const SignInModal = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { 
    signIn, 
    loading: userLoading, 
    closeAuthModals, 
    isSignInModalOpen,
    switchToSignUp
  } = useAuth();
  
  const { login: adminLogin, loading: adminLoading } = useAdmin();

  const loading = userLoading || adminLoading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // SECRET: Check if admin credentials
    if (formData.email === 'admin@blog.com' && formData.password === 'admin123') {
      // Admin login
      const result = await adminLogin('admin', 'admin123');
      
      if (result.success) {
        setFormData({ email: '', password: '' });
        setErrors({});
        closeAuthModals();
        window.location.href = '/admin/dashboard';
        return;
      }
    }

    // Normal user login
    const result = await signIn(formData.email, formData.password);
    
    if (result.success) {
      setFormData({ email: '', password: '' });
      setErrors({});
      closeAuthModals();
    } else {
      setErrors({ submit: result.error });
    }
  };

  if (!isSignInModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 mx-auto shadow-xl border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Sign In</h2>
          <button
            onClick={closeAuthModals}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? (
                // Eye Slash Icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                // Eye Icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={switchToSignUp}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
