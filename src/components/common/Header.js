// components/common/Header.js - Actualización para autenticación
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    alert('Has cerrado sesión correctamente');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-amber-600">
            AllinBuy
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition">
              Inicio
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-amber-600 transition">
              Productos
            </Link>
            <Link href="/categorias" className="text-gray-700 hover:text-amber-600 transition">
              Categorías
            </Link>
            <Link href="/quienes-somos" className="text-gray-700 hover:text-amber-600 transition">
              Nosotros
            </Link>
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-amber-600 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden lg:inline">Carrito</span>
              <span className="ml-1 bg-amber-500 text-white text-xs rounded-full px-2 py-1">0</span>
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-gray-700 hover:text-amber-600 transition"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-amber-600 font-medium text-sm">
                      {user.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:inline">{user.nombre}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                        {user.email}
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mi perfil
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mis pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-amber-600 transition px-3 py-2"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-700 hover:text-amber-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-amber-600">
                Inicio
              </Link>
              <Link href="/productos" className="block py-2 text-gray-700 hover:text-amber-600">
                Productos
              </Link>
              <Link href="/categorias" className="block py-2 text-gray-700 hover:text-amber-600">
                Categorías
              </Link>
              <Link href="/quienes-somos" className="block py-2 text-gray-700 hover:text-amber-600">
                Nosotros
              </Link>
              <Link href="/cart" className="block py-2 text-gray-700 hover:text-amber-600">
                Carrito (0)
              </Link>
            </nav>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center py-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-amber-600 font-medium text-sm">
                        {user.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700">{user.nombre}</span>
                  </div>
                  <Link href="/profile" className="block py-2 text-gray-700 hover:text-amber-600">
                    Mi perfil
                  </Link>
                  <Link href="/orders" className="block py-2 text-gray-700 hover:text-amber-600">
                    Mis pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-red-600 hover:text-red-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" className="block py-2 text-gray-700 hover:text-amber-600">
                    Iniciar sesión
                  </Link>
                  <Link href="/register" className="block py-2 bg-amber-600 text-white text-center rounded-md hover:bg-amber-700">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close menus */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;