// components/products/ProductGrid.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '../common/Icons';

const ProductGrid = ({ products, loading = false }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon 
        key={i} 
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'
        }`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-52 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">
          Mostrando <span className="font-semibold text-amber-800">{products.length}</span> productos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
            <Link href={`/productos/${product.id}`} className="block relative">
              <div className="relative h-52 w-full bg-gray-50">
                <Image
                  src={product.image || '/assets/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Nuevo
                  </span>
                )}
              </div>
            </Link>
            
            <div className="p-4">
              <Link href={`/productos/${product.id}`} className="block group">
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-amber-600 mt-1 font-medium">{product.category}</p>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {renderStars(product.rating || 4.5)}
                </div>
                <span className="ml-2 text-xs text-gray-600">({product.reviewCount || 0})</span>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <p className="text-lg font-bold text-amber-700">
                    S/ {product.price.toFixed(2)}
                  </p>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <p className="text-sm text-gray-500 line-through ml-2">
                      S/ {product.oldPrice.toFixed(2)}
                    </p>
                  )}
                </div>
                
                <span className={`text-xs font-medium ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                </span>
              </div>
              
              <button 
                className={`mt-3 w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  product.stock > 0 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={product.stock === 0}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Añadir al carrito:', product);
                }}
              >
                {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;