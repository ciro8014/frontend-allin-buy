// components/products/ProductFilters.js
'use client';

import React, { useState } from 'react';

const ProductFilters = ({ categories, filters, onFilterChange }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handlePriceChange = (field, value) => {
    const newValue = parseInt(value) || 0;
    if (field === 'min') {
      onFilterChange({ 
        priceMin: Math.min(newValue, filters.priceMax),
        priceMax: filters.priceMax 
      });
    } else {
      onFilterChange({ 
        priceMin: filters.priceMin,
        priceMax: Math.max(newValue, filters.priceMin) 
      });
    }
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      category: 'all',
      sort: 'relevance',
      priceMin: 0,
      priceMax: 2000,
      inStock: false
    });
  };

  const hasActiveFilters = filters.category !== 'all' || 
                          filters.search || 
                          filters.priceMin > 0 || 
                          filters.priceMax < 2000 || 
                          filters.inStock;

  return (
    <>
      {/* Botón para móvil */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="md:hidden mb-4 flex items-center px-4 py-2 border border-amber-300 bg-amber-50 rounded-md text-sm font-medium text-amber-700 hover:bg-amber-100"
      >
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.414V4z" />
        </svg>
        Filtros
      </button>

      {/* Panel de filtros */}
      <div className={`${
        showMobileFilters 
          ? 'fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:static md:bg-transparent' 
          : 'hidden md:block'
      } md:w-64`}>
        
        <div className={`${
          showMobileFilters 
            ? 'absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto' 
            : ''
        } md:static md:p-0`}>
          
          {/* Cerrar móvil */}
          {showMobileFilters && (
            <button
              onClick={() => setShowMobileFilters(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Categorías */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => onFilterChange({ category: category.id })}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition ${
                      filters.category === category.id 
                        ? 'bg-amber-100 text-amber-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      filters.category === category.id 
                        ? 'bg-amber-200 text-amber-800' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Precio */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Precio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mínimo (S/)
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.priceMin}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="text-black w-full rounded-md border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Máximo (S/)
                </label>
                <input
                  type="number"
                  min={filters.priceMin}
                  value={filters.priceMax}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="text-black w-full rounded-md border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Disponibilidad</h3>
            <div className="flex items-center">
              <input
                id="in-stock"
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onFilterChange({ inStock: e.target.checked })}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">
                Solo productos en stock
              </label>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
              >
                Limpiar filtros
              </button>
            )}
            
            {showMobileFilters && (
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition font-medium text-sm"
              >
                Aplicar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;