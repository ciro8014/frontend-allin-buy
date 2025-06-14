'use client';

import React, { useState, useEffect } from 'react';
import { productosAPI, categoriasAPI } from '../../../../services/api';
import ProductGrid from '../../../components/products/ProductGrid';
import ProductFilters from '../../../components/products/ProductFilters';
import SearchBar from '../../../components/products/SearchBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import EmptyState from '../../../components/common/EmptyState';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'relevance',
    priceMin: 0,
    priceMax: 2000,
    inStock: false,
    page: 1
  });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Cargar categorías al inicializar
  useEffect(() => {
    loadCategories();
  }, []);

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    try {
      const response = await categoriasAPI.getAll();
      if (response.success) {
        const allCategories = [
          { id: 'all', name: 'Todas', count: 0 },
          ...response.data.map(cat => ({
            id: cat.id,
            name: cat.name,
            count: cat.productCount
          }))
        ];
        setCategories(allCategories);
      }
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      const apiFilters = {
        page: filters.page,
        limit: 12,
        orden: filters.sort,
        precio_min: filters.priceMin,
        precio_max: filters.priceMax,
        solo_stock: filters.inStock
      };

      if (filters.category !== 'all') {
        apiFilters.categoria = filters.category;
      }

      if (filters.search.trim()) {
        apiFilters.buscar = filters.search.trim();
      }

      const response = await productosAPI.getAll(apiFilters);
      
      if (response.success) {
        setProducts(response.data);
        setPagination(response.pagination || { total: 0, pages: 1 });
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset a primera página al cambiar filtros
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        </div>

        {/* Barra de búsqueda */}
        <SearchBar 
          value={filters.search}
          onSearch={(search) => handleFilterChange({ search })}
          onSortChange={(sort) => handleFilterChange({ sort })}
          currentSort={filters.sort}
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros laterales */}
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Lista de productos */}
          <div className="md:flex-1">
            {loading ? (
              <div className="bg-white py-10 px-6 shadow-sm rounded-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-gray-700">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No se encontraron productos"
                description="Intenta cambiar los filtros o realizar una nueva búsqueda."
                actionText="Limpiar filtros"
                onAction={() => setFilters({
                  search: '',
                  category: 'all',
                  sort: 'relevance',
                  priceMin: 0,
                  priceMax: 2000,
                  inStock: false,
                  page: 1
                })}
              />
            ) : (
              <>
                <ProductGrid 
                  products={products} 
                  loading={loading}
                />
                
                {/* Paginación */}
                {pagination.pages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button 
                        onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
                        disabled={filters.page === 1}
                        className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      
                      {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 rounded-md border ${
                              filters.page === pageNum 
                                ? 'bg-amber-500 text-white border-amber-500' 
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button 
                        onClick={() => handlePageChange(Math.min(pagination.pages, filters.page + 1))}
                        disabled={filters.page === pagination.pages}
                        className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Siguiente
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}