// src/components/layout/Header.js
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { LogoIcon, SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from '../common/Icons';

const Header = () => {
  const { user, isAuthenticated, logout, isVendor } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartItemsCount = getCartItemsCount();
  const userMenuRef = useRef(null);
  
  // Optimización: Usar efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Efecto para cerrar el menú de usuario al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cargar cantidad de items en carrito se maneja automáticamente por el contexto
  // useEffect removido ya que getCartItemsCount() se actualiza automáticamente

  // Enlaces de navegación
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Categorías', path: '/categorias' },
    { name: 'Quiénes Somos', path: '/quienes-somos' }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    alert('Has cerrado sesión correctamente');
  };

  const getUserInitials = () => {
    if (!user) return '?';
    const nombre = user.nombre || '';
    const apellido = user.apellido || '';
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    return `${user.nombre} ${user.apellido}`.trim() || user.email;
  };

  return (
    <header className={`bg-gradient-to-r from-amber-50 via-white to-amber-50 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md py-2' : 'py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <LogoIcon className="h-10 w-10 mr-2 text-amber-700 group-hover:text-red-600 transition-colors duration-200" />
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-red-600">
              AllinBuy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((item, index) => (
              <Link 
                key={index}
                href={item.path}
                className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium border-b-2 border-transparent hover:border-amber-500 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart and User Profile */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-56 pl-10 pr-4 py-2.5 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent group-hover:border-amber-400 transition-all duration-200 text-gray-800 placeholder-gray-500"
              />
              <div className="absolute left-3 top-3">
                <SearchIcon className="h-5 w-5 text-amber-600 group-hover:text-amber-700 transition-colors" />
              </div>
            </div>

            {/* Carrito */}
            <Link href="/cart" className="p-2 text-amber-700 hover:text-red-600 relative hover:scale-105 transition-all">
              <CartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                className="flex items-center space-x-2 p-2 text-amber-700 hover:text-red-600 hover:scale-105 transition-all focus:outline-none"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                {isAuthenticated ? (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {getUserInitials()}
                    </div>
                    <span className="hidden lg:block text-sm font-medium">
                      {user.nombre}
                    </span>
                  </>
                ) : (
                  <UserIcon className="h-6 w-6" />
                )}
                {isAuthenticated && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                  {isAuthenticated ? (
                    <div>
                      <div className="px-4 py-3">
                        <p className="text-sm">Conectado como</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        {isVendor() && (
                          <p className="text-xs text-amber-600 font-medium">Vendedor</p>
                        )}
                      </div>
                      <div className="py-1">
                        {isVendor() ? (
                          <>
                            <Link 
                              href="/vendor/dashboard" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                            >
                              Dashboard Vendedor
                            </Link>
                            <Link 
                              href="/vendor/products" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                            >
                              Mis productos
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link 
                              href="/customer/profile" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                            >
                              Mi perfil
                            </Link>
                            <Link 
                              href="/customer/orders" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                            >
                              Mis pedidos
                            </Link>
                            <Link 
                              href="/customer/favorites" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                            >
                              Favoritos
                            </Link>
                          </>
                        )}
                      </div>
                      <div className="py-1">
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-1">
                      <Link 
                        href="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                      >
                        Iniciar sesión
                      </Link>
                      <Link 
                        href="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-red-600"
                      >
                        Registrarse
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-amber-100 p-2 rounded-lg text-amber-700 hover:text-red-600 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-white shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-3 py-4 space-y-2">
          {navLinks.map((item, index) => (
            <Link 
              key={index}
              href={item.path}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-50 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile search */}
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2.5 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
              />
              <div className="absolute left-3 top-3">
                <SearchIcon className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-3 pb-4 border-t border-amber-100 bg-amber-50">
          <div className="flex items-center px-5 py-2">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-semibold shadow-md">
                {isAuthenticated ? getUserInitials() : '?'}
              </div>
            </div>
            <div className="ml-3">
              {isAuthenticated ? (
                <>
                  <div className="text-base font-medium text-gray-800">{getUserDisplayName()}</div>
                  <div className="text-sm font-medium text-gray-600">{user.email}</div>
                </>
              ) : (
                <div className="text-base font-medium text-gray-800">Invitado</div>
              )}
            </div>
            <Link href="/cart" className="ml-auto p-2 text-amber-700 hover:text-red-600 relative">
              <CartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          <div className="mt-2 px-2 space-y-1">
            {isAuthenticated ? (
              <>
                {isVendor() ? (
                  <>
                    <Link 
                      href="/vendor/dashboard" 
                      className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard Vendedor
                    </Link>
                    <Link 
                      href="/vendor/products" 
                      className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mis productos
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/customer/profile" 
                      className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <Link 
                      href="/customer/orders" 
                      className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mis pedidos
                    </Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-100 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;