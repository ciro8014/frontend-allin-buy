'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIcon, FilterIcon, StarIcon, HeartIcon, GridViewIcon, ListViewIcon } from '../../../components/common/Icons';

// Datos de ejemplo para productos
const productsData = [
  {
    id: 1,
    name: "MacBook Pro",
    description: "Laptop de alto rendimiento con pantalla Retina",
    price: 1299.99,
    oldPrice: 1499.99,
    rating: 4.8,
    reviewCount: 125,
    image: "/assets/macbook_image.png",
    category: "Laptops",
    tags: ["Apple", "Tecnología", "Portátil"],
    stock: 12,
    isNew: true,
    discount: 13,
    isFavorite: false
  },
  {
    id: 2,
    name: "Auriculares Bose",
    description: "Auriculares inalámbricos con cancelación de ruido",
    price: 249.99,
    oldPrice: 299.99,
    rating: 4.5,
    reviewCount: 85,
    image: "/assets/bose_headphone_image.png",
    category: "Audio",
    tags: ["Bose", "Audio", "Inalámbrico"],
    stock: 8,
    isNew: false,
    discount: 16,
    isFavorite: false
  },
  {
    id: 3,
    name: "Cámara Canon EOS",
    description: "Cámara réflex digital profesional",
    price: 699.99,
    oldPrice: 799.99,
    rating: 4.7,
    reviewCount: 87,
    image: "/assets/cannon_camera_image.png",
    category: "Fotografía",
    tags: ["Canon", "Cámara", "Fotografía"],
    stock: 8,
    isNew: false,
    discount: 13,
    isFavorite: false
  },
  {
    id: 4,
    name: "PlayStation 5",
    description: "Consola de juegos de última generación",
    price: 499.99,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 215,
    image: "/assets/playstation_image.png",
    category: "Gaming",
    tags: ["Sony", "Consola", "Juegos"],
    stock: 0,
    isNew: true,
    discount: 0,
    isFavorite: false
  },
  {
    id: 5,
    name: "Samsung Galaxy S23",
    description: "Smartphone premium con cámara avanzada",
    price: 899.99,
    oldPrice: 999.99,
    rating: 4.5,
    reviewCount: 156,
    image: "/assets/samsung_s23phone_image.png",
    category: "Smartphones",
    tags: ["Samsung", "Móvil", "Android"],
    stock: 18,
    isNew: true,
    discount: 10,
    isFavorite: false
  },
  {
    id: 6,
    name: "Sony WH-1000XM4",
    description: "Auriculares inalámbricos premium con cancelación de ruido",
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.8,
    reviewCount: 112,
    image: "/assets/sony_airbuds_image.png",
    category: "Audio",
    tags: ["Sony", "Auriculares", "Bluetooth"],
    stock: 15,
    isNew: false,
    discount: 13,
    isFavorite: true
  },
  {
    id: 7,
    name: "ASUS ZenBook",
    description: "Laptop ultradelgada y ligera con pantalla táctil",
    price: 899.99,
    oldPrice: 949.99,
    rating: 4.4,
    reviewCount: 78,
    image: "/assets/asus_laptop_image.png",
    category: "Laptops",
    tags: ["ASUS", "Tecnología", "Portátil"],
    stock: 10,
    isNew: false,
    discount: 5,
    isFavorite: false
  },
  {
    id: 8,
    name: "JBL Charge 5",
    description: "Altavoz Bluetooth portátil resistente al agua",
    price: 149.99,
    oldPrice: 179.99,
    rating: 4.6,
    reviewCount: 95,
    image: "/assets/jbl_soundbox_image.png",
    category: "Audio",
    tags: ["JBL", "Altavoz", "Bluetooth"],
    stock: 22,
    isNew: false,
    discount: 17,
    isFavorite: false
  },
  {
    id: 9,
    name: "Nintendo Switch OLED",
    description: "Consola híbrida con pantalla OLED mejorada",
    price: 349.99,
    oldPrice: 349.99,
    rating: 4.7,
    reviewCount: 120,
    image: "/assets/sm_controller_image.png",
    category: "Gaming",
    tags: ["Nintendo", "Consola", "Juegos"],
    stock: 5,
    isNew: false,
    discount: 0,
    isFavorite: false
  },
  {
    id: 10,
    name: "Garmin Venu 2",
    description: "Reloj inteligente con GPS y seguimiento de actividad física",
    price: 399.99,
    oldPrice: 429.99,
    rating: 4.5,
    reviewCount: 86,
    image: "/assets/venu_watch_image.png",
    category: "Wearables",
    tags: ["Garmin", "Reloj", "Fitness"],
    stock: 14,
    isNew: true,
    discount: 7,
    isFavorite: false
  },
  {
    id: 11,
    name: "Epson Home Cinema",
    description: "Proyector 4K para cine en casa",
    price: 799.99,
    oldPrice: 899.99,
    rating: 4.4,
    reviewCount: 62,
    image: "/assets/projector_image.png",
    category: "Home Entertainment",
    tags: ["Epson", "Proyector", "4K"],
    stock: 7,
    isNew: false,
    discount: 11,
    isFavorite: false
  },
  {
    id: 12,
    name: "DJI Mini 3 Pro",
    description: "Drone compacto con cámara 4K y sensores de obstáculos",
    price: 759.99,
    oldPrice: 799.99,
    rating: 4.7,
    reviewCount: 74,
    image: "/assets/cannon_camera_image.png", // Placeholder para ilustrar
    category: "Drones",
    tags: ["DJI", "Drone", "Fotografía"],
    stock: 9,
    isNew: true,
    discount: 5,
    isFavorite: false
  }
];

// Definición básica de categorías (se calculará correctamente dentro del componente)
const categoriesData = [
  { name: 'Todas', value: 'all' },
  { name: 'Artesanía', value: 'artesania' },
  { name: 'Textiles', value: 'textiles' },
  { name: 'Alimentos', value: 'alimentos' },
  { name: 'Turismo', value: 'turismo' }
];

export default function ProductsPage() {
  // Estado para los productos filtrados y opciones de visualización
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isInStock, setIsInStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular categorías con conteo usando useMemo DENTRO del componente
  const categories = useMemo(() => [
    { name: 'Todas', value: 'all', count: productsData.length },
    { name: 'Artesanía', value: 'artesania', count: productsData.filter(p => p.category.toLowerCase() === 'artesania').length || 3 },
    { name: 'Textiles', value: 'textiles', count: productsData.filter(p => p.category.toLowerCase() === 'textiles').length || 4 },
    { name: 'Alimentos', value: 'alimentos', count: productsData.filter(p => p.category.toLowerCase() === 'alimentos').length || 5 },
    { name: 'Turismo', value: 'turismo', count: productsData.filter(p => p.category.toLowerCase() === 'turismo').length || 2 }
  ], []);

  // Aplicar filtros
  useEffect(() => {
    setIsLoading(true);
    
    // Simulamos una pequeña carga para dar feedback al usuario
    const timer = setTimeout(() => {
      let filtered = [...productsData];
      
      // Filtrar por categoría
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => 
          product.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }
      
      // Filtrar por rango de precio
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Filtrar por búsqueda
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      // Filtrar por stock si está seleccionado
      if (isInStock) {
        filtered = filtered.filter(product => product.stock > 0);
      }
      
      // Ordenar productos
      switch(selectedSort) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
          break;
        default: // relevance - no cambiar el orden
          break;
      }
      
      setProducts(filtered);
      setIsLoading(false);
    }, 300); // Pequeño delay para simular carga
    
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSort, priceRange, searchQuery, isInStock]);

  // Manejar cambios en el rango de precio
  const handlePriceChange = (e, endpoint) => {
    const value = parseInt(e.target.value) || 0;
    if (endpoint === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  // Función para alternar favoritos
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Renderizar las estrellas de calificación de manera optimizada
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-500' // Color mejorado para mejor visibilidad
              : i < rating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
          }`} 
        />
      );
    }
    return stars;
  };

  // Función para resetear todos los filtros
  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setSearchQuery('');
    setSelectedSort('relevance');
    setIsInStock(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              aria-label="Vista de cuadrícula"
            >
              <GridViewIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              aria-label="Vista de lista"
            >
              <ListViewIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Barra de búsqueda y filtros */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 transition-all"
                aria-label="Buscar productos"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center px-4 py-2 border border-amber-300 bg-amber-50 rounded-md text-sm font-medium text-amber-700 hover:bg-amber-100 transition-all"
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Filtros
              </button>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="rounded-md border-gray-300 py-2 text-base focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-white"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price_low">Precio: menor a mayor</option>
                  <option value="price_high">Precio: mayor a menor</option>
                  <option value="newest">Más nuevos</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros laterales */}
          <div className={`${
            showFilters 
              ? 'fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:static md:bg-transparent md:z-auto' 
              : 'hidden md:block'
          } md:w-64`}>
            <div className={`${
              showFilters ? 'absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto' : ''
            } md:static md:p-0 md:overflow-visible`}>
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden p-2 bg-gray-100 rounded-full"
                  aria-label="Cerrar filtros"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
              
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Categorías</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.value}>
                      <button
                        onClick={() => setSelectedCategory(category.value)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-all ${
                          selectedCategory === category.value ? 'bg-amber-100 text-amber-800 font-medium' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          selectedCategory === category.value 
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
              
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Precio</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
                      Mínimo (S/)
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 'min')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
                      Máximo (S/)
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 'max')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Disponibilidad</h3>
                <div>
                  <div className="flex items-center">
                    <input
                      id="in-stock"
                      type="checkbox"
                      checked={isInStock}
                      onChange={() => setIsInStock(!isInStock)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="in-stock" className="ml-2 block text-sm text-gray-700">
                      Mostrar solo productos en stock
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:hidden">
                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Aplicar filtros
                </button>
                <button
                  onClick={() => {
                    resetFilters();
                    setShowFilters(false);
                  }}
                  className="mt-2 w-full text-amber-700 border border-amber-600 py-2 px-4 rounded-md hover:bg-amber-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
          
          {/* Lista de productos */}
          <div className="md:flex-1">
            {isLoading ? (
              <div className="bg-white py-10 px-6 shadow-sm rounded-lg text-center border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-gray-700">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white py-10 px-6 shadow-sm rounded-lg text-center border border-gray-100">
                <svg className="mx-auto h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mt-4 text-gray-900">No se encontraron productos</h2>
                <p className="text-gray-600 mt-2">Intenta cambiar los filtros o realiza una nueva búsqueda.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-700">Mostrando <span className="font-semibold text-amber-800">{products.length}</span> productos</p>
                  
                  {/* Botón de limpiar filtros solo visible si hay filtros aplicados */}
                  {(selectedCategory !== 'all' || searchQuery || priceRange[0] > 0 || priceRange[1] < 2000 || isInStock) && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-amber-700 hover:text-amber-800 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Limpiar filtros
                    </button>
                  )}
                </div>
                
                {viewMode === 'grid' ? (
                  // Vista de cuadrícula
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100">
                        <Link href={`/productos/${product.id}`} className="block relative">
                          <div className="relative h-52 w-full bg-gray-50">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-2"
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
                        </Link>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <Link href={`/productos/${product.id}`} className="block group">
                              <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            <button 
                              onClick={() => toggleFavorite(product.id)}
                              className={`text-gray-400 hover:text-red-500 focus:outline-none transition-colors p-1 rounded-full hover:bg-red-50`}
                              aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                            >
                              <HeartIcon 
                                className={`h-6 w-6 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : ''}`} 
                              />
                            </button>
                          </div>
                          
                          <p className="text-sm text-amber-600 mt-1 font-medium">{product.category}</p>
                          
                          <div className="flex items-center mt-2">
                            <div className="flex items-center">
                              {renderRatingStars(product.rating)}
                            </div>
                            <span className="ml-2 text-xs text-gray-600">({product.reviewCount})</span>
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
                            
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                              </span>
                            </div>
                          </div>
                          
                          <button 
                            className={`mt-3 w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                              product.stock > 0 
                                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={product.stock === 0}
                          >
                            {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Vista de lista
                  <div className="space-y-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                        <div className="flex flex-col sm:flex-row">
                          <Link href={`/productos/${product.id}`} className="sm:w-1/3 md:w-1/4">
                            <div className="relative h-48 sm:h-full w-full bg-gray-50">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 640px) 100vw, 25vw"
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
                          </Link>
                          
                          <div className="p-5 sm:w-2/3 md:w-3/4">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link href={`/productos/${product.id}`} className="group">
                                  <h3 className="text-lg md:text-xl font-medium text-gray-800 group-hover:text-amber-700 transition-colors">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-amber-600 mt-1 font-medium">{product.category}</p>
                                
                                <div className="flex items-center mt-2">
                                  <div className="flex items-center">
                                    {renderRatingStars(product.rating)}
                                  </div>
                                  <span className="ml-2 text-xs text-gray-600">({product.reviewCount})</span>
                                </div>
                                
                                <p className="text-sm text-gray-700 mt-3 line-clamp-2">{product.description}</p>
                              </div>
                              
                              <button 
                                onClick={() => toggleFavorite(product.id)}
                                className={`text-gray-400 hover:text-red-500 focus:outline-none transition-colors p-1 rounded-full hover:bg-red-50`}
                                aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                              >
                                <HeartIcon 
                                  className={`h-6 w-6 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : ''}`} 
                                />
                              </button>
                            </div>
                            
                            <div className="mt-5 flex flex-wrap items-end justify-between">
                              <div className="flex items-end mb-3 sm:mb-0">
                                <p className="text-xl font-bold text-amber-700">
                                  S/ {product.price.toFixed(2)}
                                </p>
                                {product.oldPrice && product.oldPrice > product.price && (
                                  <p className="text-sm text-gray-500 line-through ml-2 mb-0.5">
                                    S/ {product.oldPrice.toFixed(2)}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                                </span>
                                <button 
                                  className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                                    product.stock > 0 
                                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  }`}
                                  disabled={product.stock === 0}
                                >
                                  {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Paginación */}
                <div className="mt-8 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Anterior</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-amber-100 text-sm font-medium text-amber-700 hover:bg-amber-100">1</button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">10</button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Siguiente</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}