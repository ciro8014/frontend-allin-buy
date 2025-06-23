// src/contexts/CartContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { carritoAPI } from '../../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    total_items: 0,
    total_productos: 0,
    total_precio: 0,
    items_disponibles: 0,
    hay_items_no_disponibles: false
  });
  const [loading, setLoading] = useState(false);

  // Cargar carrito cuando el usuario cambie
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      clearCart();
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await carritoAPI.get(user.id);
      
      if (response.success) {
        setCartItems(response.data.items || []);
        setCartSummary(response.data.resumen || cartSummary);
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated || !user) {
      throw new Error('Debes iniciar sesión para añadir productos al carrito');
    }

    try {
      const response = await carritoAPI.addItem(user.id, productId, quantity);
      
      if (response.success) {
        await loadCart(); // Recargar carrito
        return { success: true, message: 'Producto añadido al carrito' };
      } else {
        throw new Error(response.error || 'Error al añadir al carrito');
      }
    } catch (error) {
      console.error('Error añadiendo al carrito:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    
    try {
      const response = await carritoAPI.updateItem(user.id, productId, quantity);
      
      if (response.success) {
        await loadCart(); // Recargar carrito
        return { success: true };
      } else {
        throw new Error(response.error || 'Error al actualizar cantidad');
      }
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    
    try {
      const response = await carritoAPI.removeItem(user.id, productId);
      
      if (response.success) {
        await loadCart(); // Recargar carrito
        return { success: true };
      } else {
        throw new Error(response.error || 'Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error eliminando del carrito:', error);
      throw error;
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartSummary({
      total_items: 0,
      total_productos: 0,
      total_precio: 0,
      items_disponibles: 0,
      hay_items_no_disponibles: false
    });
  };

  const getCartItemsCount = () => {
    return cartSummary.total_productos || 0;
  };

  const getCartTotal = () => {
    return cartSummary.total_precio || 0;
  };

  const value = {
    cartItems,
    cartSummary,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
    getCartItemsCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};