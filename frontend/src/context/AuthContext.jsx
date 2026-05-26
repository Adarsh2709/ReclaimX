'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import { safeGetLocalStorage, safeSetLocalStorage } from '../utils/helpers';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safely hydrate auth state on mount
    const storedToken = localStorage.getItem('reclaimx_token');
    const storedUser = safeGetLocalStorage('reclaimx_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Helper to infer or resolve a user's role from their email
  const resolveRole = (email) => {
    // 1. Check local email-to-role dictionary from registrations
    const roleRegistry = safeGetLocalStorage('reclaimx_user_roles') || {};
    if (roleRegistry[email]) {
      return roleRegistry[email];
    }

    // 2. Fail-safe pattern matching
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('admin')) {
      return ROLES.ADMIN;
    }
    if (lowerEmail.includes('recycler') || lowerEmail.includes('plant')) {
      return ROLES.RECYCLER;
    }
    return ROLES.USER;
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const jwtToken = data.token;
      
      // Resolve name & role
      const role = resolveRole(email);
      // Clean display name from email
      const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      const loggedUser = {
        email,
        role,
        name: formattedName,
      };

      // Persist
      localStorage.setItem('reclaimx_token', jwtToken);
      safeSetLocalStorage('reclaimx_user', loggedUser);
      
      setToken(jwtToken);
      setUser(loggedUser);

      return { success: true, user: loggedUser };
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      const message = error.response?.data?.message || 'Invalid email or password';
      return { success: false, message };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const message = await authService.register(name, email, password, role);
      
      if (message && (message.includes('already exist') || message.includes('fail'))) {
        return { success: false, message };
      }

      // Record this user's role and name locally so login knows it
      const roleRegistry = safeGetLocalStorage('reclaimx_user_roles') || {};
      roleRegistry[email] = role;
      safeSetLocalStorage('reclaimx_user_roles', roleRegistry);

      // Also record the name mapping
      const nameRegistry = safeGetLocalStorage('reclaimx_user_names') || {};
      nameRegistry[email] = name;
      safeSetLocalStorage('reclaimx_user_names', nameRegistry);

      return { success: true, message };
    } catch (error) {
      console.error('Registration error in AuthContext:', error);
      const message = error.response?.data || 'Registration failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('reclaimx_token');
    localStorage.removeItem('reclaimx_user');
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
