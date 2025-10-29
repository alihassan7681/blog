import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Success/Error messages

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    }
  }, []);

  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
  };

  const checkAuth = async (token) => {
    try {
      const response = await authService.checkAuth(token);
      setUser(response.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    }
  };

  // Modal functions
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsSignInModalOpen(false);
  };

  const closeAuthModals = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const switchToSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const switchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.signIn(email, password);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('token', response.token);
        closeAuthModals();
        showMessage('Login successful! Welcome back!', 'success');
        return { success: true };
      }
    } catch (error) {
      showMessage(error.message, 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await authService.signUp({ name, email, password });
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('token', response.token);
        closeAuthModals();
        showMessage('Account created successfully! Welcome to Quickblog!', 'success');
        return { success: true };
      }
    } catch (error) {
      showMessage(error.message, 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    showMessage('Logged out successfully!', 'success');
    console.log('✅ User signed out');
  };

  const value = {
    user,
    loading,
    message,
    isSignInModalOpen,
    isSignUpModalOpen,
    openSignInModal,
    openSignUpModal,
    closeAuthModals,
    switchToSignUp,
    switchToSignIn,
    signIn,
    signUp,
    signOut,
    showMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};