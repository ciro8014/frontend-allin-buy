'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoIcon, SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from '../common/Icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <LogoIcon />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
              Inicio
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
              Productos
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
              Quiénes Somos
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
              Contacto
            </Link>
          </nav>

          /* Search, Cart and User Profile */
                <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                  />
                  <div className="absolute left-3 top-2.5">
                  <SearchIcon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <Link href="/cart" className="p-2 text-gray-700 hover:text-amber-600 relative">
                  <CartIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-amber-600 rounded-full">3</span>
                </Link>
                <Link href="/login" className="p-2 text-gray-700 hover:text-amber-600">
                  <UserIcon className="h-6 w-6" />
                </Link>
                </div>

                {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
              Inicio
            </Link>
            <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
              Productos
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
              Quiénes Somos
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
              Contacto
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Usuario</div>
                <div className="text-sm font-medium text-gray-500">usuario@ejemplo.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                Iniciar sesión
              </Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                Registrarse
              </Link>
              <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">
                Carrito
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;