const API_BASE_URL = 'http://localhost:5000/api';

export const authService = {
  // User Sign Up
  async signUp(userData) {
    try {
      console.log('📝 Signup request:', userData);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      console.log('✅ Signup successful:', data);
      return data;
    } catch (error) {
      console.error('❌ SignUp API Error:', error);
      throw error;
    }
  },

  // User Sign In
  async signIn(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      return data;
    } catch (error) {
      console.error('SignIn API Error:', error);
      throw error;
    }
  },

  // Check Authentication
  async checkAuth(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Auth Check Error:', error);
      throw error;
    }
  }
};