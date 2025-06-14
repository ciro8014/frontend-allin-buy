'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '../../../../components/common/Icons';
import { categoriasAPI, productosAPI } from '../../../../../services/api';

export default function CategoryPage({ params }) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('relevancia');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Resolver los parámetros usando React.use
  const resolvedParams = React.use(params);
  const categorySlug = resolvedParams.id;

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Primero obtener todas las categorías para encontrar la que coincida con el slug
        const categoriesResponse = await categoriasAPI.getAll();
        
        if (!categoriesResponse.success) {
          throw new Error('Error al cargar categorías');
        }

        // Buscar la categoría por slug
        const foundCategory = categoriesResponse.data.find(
          cat => cat.slug === categorySlug || cat.id.toString() === categorySlug
        );

        if (!foundCategory) {
          setError('Categoría no encontrada');
          setLoading(false);
          return;
        }

        setCategory(foundCategory);

        // Luego cargar productos de esa categoría
        await loadProductsForCategory(foundCategory.id);

      } catch (error) {
        console.error('Error cargando datos de categoría:', error);
        setError('Error de conexión al servidor');
        setLoading(false);
      }
    };

    if (categorySlug) {
      loadCategoryData();
    }
  }, [categorySlug]);

  const loadProductsForCategory = async (categoryId) => {
    try {
      const filters = {
        categoria: categoryId,
        page: currentPage,
        limit: 12,
        orden: selectedFilter,
        precio_min: priceRange[0],
        precio_max: priceRange[1]
      };

      const response = await productosAPI.getAll(filters);
      
      if (response.success) {
        setProducts(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }

        // Actualizar rango de precios basado en productos cargados
        if (response.data.length > 0) {
          const prices = response.data.map(p => p.price);
          const calculatedMin = Math.floor(Math.min(...prices));
          const calculatedMax = Math.ceil(Math.max(...prices));
          
          if (priceRange[0] === 0 && priceRange[1] === 200) {
            setMinPrice(calculatedMin);
            setMaxPrice(calculatedMax);
            setPriceRange([calculatedMin, calculatedMax]);
          }
        }
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar productos cuando cambien los filtros
  useEffect(() => {
    if (category) {
      loadProductsForCategory(category.id);
    }
  }, [selectedFilter, priceRange, currentPage]);

  // Renderizar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
        <p className="mb-8">Lo sentimos, la categoría que estás buscando no existe.</p>
        <Link 
          href="/categorias" 
          className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            
            <div className="flex flex-wrap gap-6">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
                  <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  const filteredProducts = products.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner de categoría */}
      <div className={`${category.imageClass} bg-opacity-80`}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {category.name}
            </h1>
            <p className="text-lg text-gray-800 mb-6 max-w-2xl">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/categorias" 
                className="bg-white/80 backdrop-blur-sm text-amber-700 px-6 py-2 rounded-lg font-medium hover:bg-white transition shadow-sm"
              >
                Ver todas las categorías
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/categorias" className="hover:text-amber-600">Categorías</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{category.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros laterales */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Filtros</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Precio</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">S/ {priceRange[0]}</span>
                  <span className="text-sm text-gray-600">S/ {priceRange[1]}</span>
                </div>
                <div className="text-black flex justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="text-sm text-gray-500 mb-1 block">Min</label>
                    <input
                      type="number"
                      min={minPrice}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value <= priceRange[1]) {
                          setPriceRange([value, priceRange[1]]);
                          setCurrentPage(1);
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="text-black w-1/2 pl-2">
                    <label className="text-sm text-gray-500 mb-1 block">Max</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= priceRange[0]) {
                          setPriceRange([priceRange[0], value]);
                          setCurrentPage(1);
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Calificación</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button 
                      key={rating}
                      className="flex items-center w-full py-1 px-2 hover:bg-amber-50 rounded transition text-left"
                    >
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                            <StarIcon />
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-700">
                        {rating === 5 ? 'Solo 5 estrellas' : `${rating}+ estrellas`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setPriceRange([minPrice, maxPrice]);
                  setCurrentPage(1);
                }}
                className="mt-4 w-full bg-amber-100 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-medium text-sm"
              >
                Restablecer filtros
              </button>
            </div>
          </div>
          
          {/* Lista de productos */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">{filteredProducts.length}</span> productos encontrados
                  </p>
                </div>
                <div className="text-black flex flex-wrap gap-4 items-center">
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-600 mr-2 whitespace-nowrap">Ordenar por:</label>
                    <select
                      id="sort"
                      value={selectedFilter}
                      onChange={(e) => {
                        setSelectedFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded-lg py-1.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="relevancia">Relevancia</option>
                      <option value="precio-asc">Precio: menor a mayor</option>
                      <option value="precio-desc">Precio: mayor a menor</option>
                      <option value="rating">Mejor calificados</option>
                    </select>
                  </div>
                  
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Ver como cuadrícula"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewMode('list')}
                      aria-label="Ver como lista"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-amber-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o busca en otra categoría.</p>
                <button 
                  onClick={() => {
                    setPriceRange([minPrice, maxPrice]);
                    setCurrentPage(1);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link key={product.id} href={`/productos/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full flex flex-col">
                      <div className="relative h-52">
                        <Image 
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {product.discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            -{product.discount}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            Nuevo
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <h3 className="font-bold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
                          <div className="flex mb-2">
                            <div className="flex mr-2">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviewCount})</span>
                          </div>
                        </div>
                        <div className="mt-auto pt-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-bold text-amber-700">S/ {product.price.toFixed(2)}</span>
                            {product.oldPrice && product.oldPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                S/ {product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button 
                            className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
                            aria-label="Añadir al carrito"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Añadir al carrito:', product);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-2">
                          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <Link key={product.id} href={`/productos/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48">
                          <Image 
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                          {product.discount > 0 && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                              -{product.discount}%
                            </span>
                          )}
                          {product.isNew && (
                            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                              Nuevo
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-amber-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
                            <div className="flex mb-2">
                              <div className="flex mr-2">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-sm text-gray-500">({product.reviewCount} reseñas)</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              Categoría: <span className="font-medium">{product.category}</span>
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-bold text-lg text-amber-700">S/ {product.price.toFixed(2)}</span>
                              {product.oldPrice && product.oldPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  S/ {product.oldPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                              </span>
                              <button 
                                className="bg-amber-100 hover:bg-amber-200 text-amber-700 py-2 px-4 rounded-lg transition-colors flex items-center text-sm font-medium"
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log('Añadir al carrito:', product);
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                                Añadir al carrito
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-l-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`py-2 px-4 border-t border-b border-gray-300 font-medium ${
                          currentPage === pageNumber 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-r-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}