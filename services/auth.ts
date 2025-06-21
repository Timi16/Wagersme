import React from 'react';
// Types
interface SignupRequest {
    username: string;
    email: string;
    password: string;
  }
  
  interface SignupResponse {
    id: number;
    username: string;
    email: string;
    token?: string; // Add token for authentication
  }
  
  interface AuthError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
  }
  
  interface User {
    id: number;
    username: string;
    email: string;
  }
  
  // Auth state type
  interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  // Configuration
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  // Auth service class with state management
  class AuthService {
    private baseUrl: string;
    private authState: AuthState;
    private listeners: Set<(state: AuthState) => void>;
  
    constructor(baseUrl: string = API_URL) {
      this.baseUrl = baseUrl;
      this.authState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
      this.listeners = new Set();
      
      // Initialize from stored token if available
      this.initializeAuth();
    }
  
    /**
     * Initialize authentication from stored token
     */
    private async initializeAuth() {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Verify token and get user data
          const user = await this.verifyToken(token);
          if (user) {
            this.updateAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        // Clear invalid token
        localStorage.removeItem('auth_token');
      }
    }
  
    /**
     * Verify token with backend
     */
    private async verifyToken(token: string): Promise<User | null> {
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          return data.user;
        }
        return null;
      } catch (error) {
        return null;
      }
    }
  
    /**
     * Update auth state and notify listeners
     */
    private updateAuthState(newState: Partial<AuthState>) {
      this.authState = { ...this.authState, ...newState };
      this.listeners.forEach(listener => listener(this.authState));
    }
  
    /**
     * Subscribe to auth state changes
     */
    subscribe(listener: (state: AuthState) => void) {
        this.listeners.add(listener);
        listener(this.authState);
        
        return () => {
          this.listeners.delete(listener);
        };
      }
  
    /**
     * Get current auth state
     */
    getAuthState(): AuthState {
      return { ...this.authState };
    }
  
    /**
     * Sign up a new user and automatically log them in
     */
    async signup(userData: SignupRequest): Promise<SignupResponse> {
      this.updateAuthState({ isLoading: true });
  
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }
  
        // If signup includes a token, store it and update auth state
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          
          // Update auth state with user data
          this.updateAuthState({
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // If no token returned, just stop loading
          this.updateAuthState({ isLoading: false });
        }
  
        return data;
      } catch (error) {
        this.updateAuthState({ isLoading: false });
        console.error('Signup error:', error);
        throw error;
      }
    }
  
    /**
     * Sign out user
     */
    async signOut() {
      try {
        // Call backend to invalidate token
        const token = localStorage.getItem('auth_token');
        if (token) {
          await fetch(`${this.baseUrl}/api/auth/signout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      } catch (error) {
        console.error('Signout error:', error);
      } finally {
        // Clear local storage and update state
        localStorage.removeItem('auth_token');
        this.updateAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }
  
    /**
     * Sign in user
     */
    async signIn(email: string, password: string): Promise<User> {
      this.updateAuthState({ isLoading: true });
  
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/signin`, {
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
  
        // Store token and update auth state
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
  
        const user = {
          id: data.id,
          username: data.username,
          email: data.email,
        };
  
        this.updateAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
  
        return user;
      } catch (error) {
        this.updateAuthState({ isLoading: false });
        console.error('Sign in error:', error);
        throw error;
      }
    }
  
    /**
     * Validate signup data before sending
     */
    validateSignupData(userData: SignupRequest): string[] {
      const errors: string[] = [];
  
      if (!userData.username || userData.username.trim().length < 2) {
        errors.push('Username must be at least 2 characters long');
      }
  
      if (!userData.email || !this.isValidEmail(userData.email)) {
        errors.push('Please provide a valid email address');
      }
  
      if (!userData.password || userData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
  
      return errors;
    }
  
    private isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  
  // Create singleton instance
  const authService = new AuthService();
  
  // Custom hook for React components (similar to useAuth)
  export const useAuthService = () => {
    const [authState, setAuthState] = React.useState<AuthState>(authService.getAuthState());
  
    React.useEffect(() => {
      const unsubscribe = authService.subscribe(setAuthState);
      return unsubscribe;
    }, []);
  
    return {
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      signUp: (username: string, email: string, password: string) => 
        authService.signup({ username, email, password }),
      signIn: authService.signIn.bind(authService),
      signOut: authService.signOut.bind(authService),
    };
  };
  
  // Export functions for easy use (backward compatibility)
  export const signup = (userData: SignupRequest) => authService.signup(userData);
  export const validateSignupData = (userData: SignupRequest) => authService.validateSignupData(userData);
  export const signIn = (email: string, password: string) => authService.signIn(email, password);
  export const signOut = () => authService.signOut();
  
  // Export types and service
  export type { SignupRequest, SignupResponse, AuthError, User, AuthState };
  export { AuthService };
  export default authService;