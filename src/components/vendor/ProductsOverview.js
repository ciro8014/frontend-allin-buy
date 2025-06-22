// components/vendor/ProductsOverview.js
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductsOverview = ({ products, isFullView = false }) => {
  const formatCurrency = (amount) => {
    return `S/ ${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {isFullView ? 'Mis Productos' : 'Productos Más Vendidos'}
          </h3>
          <div className="flex items-center space-x-2">
            {!isFullView && (
              <Link 
                href="/vendor/products" 
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Ver todos
              </Link>
            )}
            {isFullView && (
              <button className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded transition">
                Agregar producto
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        {products.length === 0 ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza agregando tu primer producto.
            </p>
            <button className="mt-3 text-sm bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition">
              Agregar producto
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image
                      src={product.imagen || '/assets/placeholder.png'}
                      alt={product.nombre}
                      fill
                      className="object-contain rounded-lg"
                      sizes="64px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.nombre}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.ventas} ventas • {formatCurrency(product.ingresos)} ingresos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock} en stock
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">4.0</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Barra de progreso de ventas */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Rendimiento de ventas</span>
                        <span>{Math.round((product.ventas / 50) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((product.ventas / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones rápidas */}
                {isFullView && (
                  <div className="mt-4 flex items-center space-x-2">
                    <button className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded transition">
                      Editar
                    </button>
                    <button className="text-xs bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded transition">
                      Ver estadísticas
                    </button>
                    <button className="text-xs bg-gray-100 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded transition">
                      {product.stock > 0 ? 'Pausar' : 'Activar'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isFullView && products.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Mostrando {products.length} productos
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsOverview;