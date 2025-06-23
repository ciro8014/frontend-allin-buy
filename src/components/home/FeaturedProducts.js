// Archivo: src/components/home/FeaturedProducts.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '../common/Icons';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useGlobalNotification } from '../common/ClientNotifications';

const FeaturedProducts = ({ products, loading, onAddToCart }) => {

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { success, error } = useGlobalNotification();

  // Renderizar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  // Manejar añadir al carrito
  const handleAddToCart = async (product) => {
    try {
      if (!isAuthenticated) {
        error('Debes iniciar sesión para añadir productos al carrito');
        return;
      }

      await addToCart(product.id, 1);
      success(`${product.name} añadido al carrito`);
    } catch (err) {
      error(err.message || 'Error al añadir al carrito');
    }
  };
  
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Productos Destacados
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Skeleton loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
            Descubre los productos más populares de nuestros emprendedores
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <Link 
              key={product.id} 
              href={`/productos/${product.id}`} 
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
            >
              <div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1.5 h-full flex flex-col"
                style={{animationDelay: `${index * 120}ms`}}
              >
                <div className={`h-52 ${product.imageClass || 'bg-gray-50'} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/5 group-hover:opacity-0 transition-opacity"></div>
                  <Image 
                    src={product.image || '/assets/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    width={220}
                    height={200}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.discount > 0 && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        Nuevo
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {product.seller}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2 text-amber-400">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount} reseñas)
                    </span>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-amber-700">
                        S/ {product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          S/ {product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(product.id);
                      }}
                      aria-label="Agregar al carrito"
                      className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors duration-300 transform hover:scale-110 shadow-sm hover:shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-300 ease-out"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link 
            href="/productos" 
            className="inline-flex items-center px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300 hover:shadow group"
          >
            Ver todos los productos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;