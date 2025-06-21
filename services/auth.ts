interface SignupRequest {
    username: string;
    email: string;
    password: string;
  }
  
  interface SignupResponse {
    success: boolean;
    message?: string;
    user?: {
      id: string;
      username: string;
      email: string;
    };
    token?: string;
  }
  
  interface AuthError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
  }
  
  // Configuration
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6000';
  
  // Auth service class
  class AuthService {
    private baseUrl: string;
  
    constructor(baseUrl: string = API_URL) {
      this.baseUrl = baseUrl;
    }
  
    /**
     * Sign up a new user
     */
    async signup(userData: SignupRequest): Promise<SignupResponse> {
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
  
        return data;
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      }
    }
  
    /**
     * Validate signup data before sending
     */
    validateSignupData(userData: SignupRequest): string[] {
      const errors: string[] = [];
  
      if (!userData.username || userData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
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
  
  // Export functions for easy use
  export const signup = (userData: SignupRequest) => authService.signup(userData);
  export const validateSignupData = (userData: SignupRequest) => authService.validateSignupData(userData);
  
  // Export types and service
  export type { SignupRequest, SignupResponse, AuthError };
  export { AuthService };
  export default authService;