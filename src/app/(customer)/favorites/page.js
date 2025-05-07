'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FavoritesPage() {
  // Datos de ejemplo para los productos favoritos (en una app real, vendría de una API)
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Cerámica artesanal Inca",
      description: "Réplica auténtica de cerámica inca elaborada por artesanos cusqueños con técnicas ancestrales.",
      price: 120.00,
      rating: 4.8,
      reviews: 24,
      image: "/assets/cannon_camera_image.png",
      vendor: "Artesanías del Valle",
      category: "Cerámica",
      inStock: true
    },
    {
      id: 2,
      name: "Chal de alpaca trenzado",
      description: "Chal tejido a mano con lana de alpaca 100% natural. Diseño exclusivo con motivos andinos.",
      price: 89.90,
      rating: 4.9,
      reviews: 56,
      image: "/assets/macbook_image.png",
      vendor: "Textiles Andinos",
      category: "Textil",
      inStock: true
    },
    {
      id: 3,
      name: "Retablo ayacuchano",
      description: "Obra de arte tradicional ayacuchana que representa escenas costumbristas de los Andes peruanos.",
      price: 85.50,
      rating: 4.7,
      reviews: 18,
      image: "/assets/bose_headphone_image.png",
      vendor: "Arte Popular Peruano",
      category: "Artesanía",
      inStock: false
    },
    {
      id: 4,
      name: "Café orgánico de altura",
      description: "Café de especialidad cultivado a más de 1800 msnm en parcelas orgánicas de la selva cusqueña.",
      price: 35.50,
      rating: 5.0,
      reviews: 42,
      image: "/assets/venu_watch_image.png",
      vendor: "Café del Valle",
      category: "Alimentos",
      inStock: true
    }
  ]);

  // Estado para manejar la vista de cuadrícula o lista
  const [viewType, setViewType] = useState('grid');

  // Función para manejar la eliminación de un producto de favoritos
  const handleRemoveFavorite = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  // Función para alternar entre vista de cuadrícula y lista
  const toggleViewType = (type) => {
    setViewType(type);
  };

  // Render de estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Mis Favoritos</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-amber-600 to-amber-400 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white">Mis Favoritos</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => toggleViewType('grid')}
                className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
                aria-label="Vista de cuadrícula"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => toggleViewType('list')}
                className={`p-2 rounded-md ${viewType === 'list' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
                aria-label="Vista de lista"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Tu lista de favoritos está vacía</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Explora nuestros productos y marca tus favoritos para guardarlos aquí.
                </p>
                <div className="mt-6">
                  <Link
                    href="/productos"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Explorar Productos
                  </Link>
                </div>
              </div>
            ) : viewType === 'grid' ? (
              // Vista de cuadrícula
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                  <div key={product.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
                    <div className="absolute top-3 right-3 z-10">
                      <button 
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:text-red-700 hover:bg-white shadow-sm"
                        aria-label="Eliminar de favoritos"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <Link href={`/productos/${product.id}`} className="block">
                      <div className="relative h-64">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-white/90 text-gray-800 font-medium text-sm rounded">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600">
                            {product.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex">
                            {renderStars(product.rating)}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{product.vendor}</span>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-medium text-gray-900">
                            S/ {product.price.toFixed(2)}
                          </p>
                          
                          {product.inStock ? (
                            <button 
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                            >
                              Añadir al carrito
                            </button>
                          ) : (
                            <button
                              disabled
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                            >
                              Agotado
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              // Vista de lista
              <div className="space-y-4">
                {favorites.map((product) => (
                  <div key={product.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-48 h-40 sm:h-auto">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-white/90 text-gray-800 font-medium text-sm rounded">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <Link href={`/productos/${product.id}`} className="block">
                              <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.description}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleRemoveFavorite(product.id)}
                            className="p-1.5 h-fit bg-white/90 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                            aria-label="Eliminar de favoritos"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex">
                            {renderStars(product.rating)}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{product.vendor}</span>
                        </div>
                        
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                          <p className="text-lg font-medium text-gray-900">
                            S/ {product.price.toFixed(2)}
                          </p>
                          
                          <div className="flex space-x-3">
                            {product.inStock ? (
                              <button 
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                              >
                                Añadir al carrito
                              </button>
                            ) : (
                              <button
                                disabled
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                              >
                                Agotado
                              </button>
                            )}
                            
                            <Link
                              href={`/productos/${product.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Ver detalles
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recomendados para ti</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={`/assets/${item === 1 ? 'bose_headphone_image' : item === 2 ? 'sony_airbuds_image' : item === 3 ? 'samsung_s23phone_image' : 'projector_image'}.png`}
                    alt={`Producto recomendado ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">Producto recomendado {item}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">S/ {(50 + item * 20).toFixed(2)}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}