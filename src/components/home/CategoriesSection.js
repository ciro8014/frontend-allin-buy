// Archivo: src/components/home/CategoriesSection.js
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '../common/Icons';

const CategoriesSection = ({ categories, loading }) => {
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Categorías Destacadas
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Skeleton loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
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
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Categorías Destacadas
          </h2>
          <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
            Explora los diferentes tipos de productos y servicios ofrecidos por emprendedores de Cusco
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/categorias/${category.id}`}>
              <div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group border border-gray-100"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`h-48 ${category.imageClass} flex items-center justify-center relative overflow-hidden group-hover:bg-opacity-90 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <span className="text-5xl font-bold text-gray-600 opacity-70 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                    {category.icon || category.name.charAt(0)}
                  </span>
                  {category.productCount && (
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-800 shadow-sm">
                      {category.productCount} productos
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-xl mb-2 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <span className="text-amber-600 font-medium flex items-center">
                    Ver productos
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRightIcon />
                    </span>
                  </span>
                </div>
                <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;