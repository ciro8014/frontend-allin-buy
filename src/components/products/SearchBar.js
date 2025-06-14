// components/products/SearchBar.js
'use client';

import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../common/Icons';

const SearchBar = ({ value, onSearch, onSortChange, currentSort }) => {
  const [searchInput, setSearchInput] = useState(value);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== value) {
        onSearch(searchInput);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, value, onSearch]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Barra de búsqueda */}
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="text-black pl-10 pr-4 py-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-amber-500" />
          </div>
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                onSearch('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">
            Ordenar por:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-black rounded-md border-gray-300 py-2 text-base focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-white min-w-[180px]"
          >
            <option value="relevance">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="newest">Más nuevos</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>
      </div>

      {/* Indicador de búsqueda activa */}
      {value && (
        <div className="mt-3 flex items-center">
          <span className="text-sm text-gray-600">Buscando: </span>
          <span className="ml-1 px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
            "{value}"
          </span>
          <button
            onClick={() => {
              setSearchInput('');
              onSearch('');
            }}
            className="ml-2 text-xs text-amber-600 hover:text-amber-800"
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;