'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '../../../components/common/Icons';
import { categoriasAPI } from '../../../../services/api';

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const response = await categoriasAPI.getAll();
        
        if (response.success) {
          setCategories(response.data);
        } else {
          setError('Error al cargar categorías');
        }
      } catch (error) {
        console.error('Error cargando categorías:', error);
        setError('Error de conexión al servidor');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12 text-center">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
            <div className="w-20 h-1 bg-gray-200 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar categorías</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Categorías</span>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Categorías de Productos
          </h1>
          <p className="text-lg text-gray-700/90 mb-6 max-w-3xl mx-auto">
            Explora nuestra selección de productos artesanales y servicios organizados por categorías, 
            todos creados por emprendedores cusqueños con pasión por su cultura y tradiciones.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay categorías disponibles</h2>
            <p className="text-gray-600">Las categorías se cargarán pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/categorias/${category.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group border border-gray-100 flex flex-col h-full"
                style={{animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease forwards'}}
              >
                <div className={`h-48 ${category.imageClass} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {category.icon ? (
                      <span className="text-6xl opacity-80 group-hover:scale-105 transition-transform duration-300">
                        {category.icon}
                      </span>
                    ) : (
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-800 shadow-sm">
                    {category.productCount} productos
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h2 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{category.description}</p>
                </div>
                <div className="px-5 pb-5 mt-auto">
                  <span className="text-amber-600 font-medium flex items-center">
                    Ver productos de esta categoría
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRightIcon />
                    </span>
                  </span>
                </div>
                <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        )}

        {/* Sección de CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-amber-800">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-amber-700 max-w-2xl">
                Contamos con un catálogo en constante crecimiento. Si tienes alguna solicitud especial 
                o estás buscando un producto artesanal específico, no dudes en contactarnos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/productos" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-sm text-center"
              >
                Ver todos los productos
              </Link>
              <Link 
                href="/contacto" 
                className="border-2 border-amber-600 text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition text-center"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}