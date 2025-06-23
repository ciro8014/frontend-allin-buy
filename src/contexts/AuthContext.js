// src/contexts/AuthContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usuariosAPI } from '../../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario al inicializar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    try {
      const currentUser = usuariosAPI.getCurrentUser();
      const token = typeof window !== 'undefined' ? localStorage.getItem('allinbuy_token') : null;
      
      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await usuariosAPI.login(email, password);
      
      if (response.success) {
        const userData = response.data.usuario || response.data;
        const token = response.data.token || 'demo_token';
        
        // Guardar en localStorage
        usuariosAPI.setCurrentUser(userData);
        localStorage.setItem('allinbuy_token', token);
        
        // Actualizar estado
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await usuariosAPI.register(userData);
      
      if (response.success) {
        const newUser = response.data.usuario || response.data;
        const token = response.data.token || 'demo_token';
        
        // Guardar en localStorage
        usuariosAPI.setCurrentUser(newUser);
        localStorage.setItem('allinbuy_token', token);
        
        // Actualizar estado
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true, user: newUser };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('allinbuy_user');
      localStorage.removeItem('allinbuy_token');
    }
    
    // Limpiar estado
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    usuariosAPI.setCurrentUser(userData);
  };

  const isVendor = () => {
    return user && user.rol === 'vendedor';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    isVendor,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};