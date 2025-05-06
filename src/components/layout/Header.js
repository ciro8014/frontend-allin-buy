'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoIcon, SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from '../common/Icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-amber-50 via-white to-amber-50 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <LogoIcon className="h-11 w-11 mr-2 text-amber-700 group-hover:text-red-600 transition-colors duration-200" />
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-red-600 font-arial tracking-tight">
              AllinBuy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {['Inicio', 'Productos', 'Quiénes Somos', 'Contacto'].map((item, index) => (
              <Link 
                key={index}
                href={item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium border-b-2 border-transparent hover:border-amber-500 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Search, Cart and User Profile */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-56 pl-10 pr-4 py-2.5 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 group-hover:border-amber-400 transition-all duration-200 text-gray-800 placeholder-gray-500"
              />
              <div className="absolute left-3 top-3">
                <SearchIcon className="h-5 w-5 text-amber-600 group-hover:text-red-600 transition-colors" />
              </div>
            </div>
            <Link href="/cart" className="p-2 text-amber-700 hover:text-red-600 relative hover:scale-105 transition-all">
              <CartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-sm transform transition-transform">3</span>
            </Link>
            <Link href="/login" className="p-2 text-amber-700 hover:text-red-600 hover:scale-105 transition-all">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-amber-50 p-2 rounded-lg text-amber-700 hover:text-red-600 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
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

      {/* Mobile menu with animation */}
      <div 
        className={`md:hidden bg-white shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 py-4 space-y-2">
          {['Inicio', 'Productos', 'Quiénes Somos', 'Contacto'].map((item, index) => (
            <Link 
              key={index}
              href={item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-50 transition-all"
            >
              {item}
            </Link>
          ))}
          
          {/* Mobile search */}
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2.5 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
              />
              <div className="absolute left-3 top-3">
                <SearchIcon className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-3 pb-4 border-t border-amber-100 bg-gradient-to-r from-amber-50 to-white">
          <div className="flex items-center px-5 py-2">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-semibold shadow-md">
                U
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 font-['Montserrat']">Usuario</div>
              <div className="text-sm font-medium text-gray-600">usuario@ejemplo.com</div>
            </div>
            <Link href="/cart" className="ml-auto p-2 text-amber-700 hover:text-red-600 relative">
              <CartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full">3</span>
            </Link>
          </div>
          <div className="mt-2 px-2 space-y-1">
            <Link href="/login" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-50 transition-all">
              Iniciar sesión
            </Link>
            <Link href="/register" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-800 hover:text-red-600 hover:bg-amber-50 transition-all">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;