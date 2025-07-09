import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  followers: string[];
  following: string[];
  watchedMovies: string[];
  ratings: Record<string, number>;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, password: string, username: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('cineconnect_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('cineconnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Validate input
      if (!email || !password || !username) {
        return { success: false, message: 'All fields are required.' };
      }

      if (password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long.' };
      }

      if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters long.' };
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('cineconnect_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email || u.username === username);
      
      if (existingUser) {
        if (existingUser.email === email) {
          return { success: false, message: 'Email already registered.' };
        } else {
          return { success: false, message: 'Username already taken.' };
        }
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        username,
        followers: [],
        following: [],
        watchedMovies: [],
        ratings: {},
        createdAt: new Date().toISOString()
      };
      
      // Store user data
      users.push({ ...newUser, password: btoa(password) }); // Basic encoding
      localStorage.setItem('cineconnect_users', JSON.stringify(users));
      
      setUser(newUser);
      localStorage.setItem('cineconnect_user', JSON.stringify(newUser));
      
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!email || !password) {
        return { success: false, message: 'Email and password are required.' };
      }

      const users = JSON.parse(localStorage.getItem('cineconnect_users') || '[]');
      const userData = users.find((u: any) => u.email === email && u.password === btoa(password));
      
      if (userData) {
        const { password: _, ...user } = userData;
        setUser(user);
        localStorage.setItem('cineconnect_user', JSON.stringify(user));
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: 'Invalid email or password.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem('cineconnect_users') || '[]');
      const userExists = users.find((u: any) => u.email === email);
      
      if (!userExists) {
        return { success: false, message: 'No account found with this email address.' };
      }

      // In a real app, this would send a reset email
      return { success: true, message: 'Password reset instructions would be sent to your email.' };
    } catch (error) {
      return { success: false, message: 'Failed to process password reset.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cineconnect_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isLoading,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};