'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '../../../../components/common/Icons';

// Base de datos ficticia de categorías para coincidencia
const categoriesData = {
  'artesania': {
    id: 'artesania',
    name: 'Artesanía',
    description: 'Piezas únicas elaboradas por artesanos locales que reflejan la rica herencia cultural cusqueña. Cada artículo cuenta una historia y representa técnicas tradicionales transmitidas a través de generaciones.',
    imageClass: 'bg-amber-100',
    bannerImage: '/assets/header_playstation_image.png'
  },
  'textiles': {
    id: 'textiles',
    name: 'Textiles',
    description: 'Tejidos tradicionales con técnicas ancestrales que representan la iconografía andina. Elaborados principalmente con lana de alpaca y algodón orgánico, estos textiles destacan por sus colores vibrantes y patrones únicos.',
    imageClass: 'bg-blue-100',
    bannerImage: '/assets/macbook_image.png'
  },
  'alimentos': {
    id: 'alimentos',
    name: 'Alimentos',
    description: 'Productos orgánicos y tradicionales de la región con sabores auténticos del Perú. Desde café orgánico de altura hasta chocolates artesanales y productos derivados de superalimentos andinos como la quinua y la maca.',
    imageClass: 'bg-green-100',
    bannerImage: '/assets/bose_headphone_image.png'
  },
  'turismo': {
    id: 'turismo',
    name: 'Turismo',
    description: 'Experiencias auténticas con emprendedores locales que te permiten conocer el verdadero Cusco. Tours personalizados, visitas a comunidades indígenas y experiencias gastronómicas que van más allá del turismo convencional.',
    imageClass: 'bg-purple-100',
    bannerImage: '/assets/cannon_camera_image.png'
  },
  'joyeria': {
    id: 'joyeria',
    name: 'Joyería',
    description: 'Piezas de joyería artesanal cusqueña elaboradas con plata, oro y piedras semipreciosas. Cada pieza combina técnicas ancestrales con diseños contemporáneos inspirados en la iconografía inca.',
    imageClass: 'bg-red-100',
    bannerImage: '/assets/venu_watch_image.png'
  },
  'ceramica': {
    id: 'ceramica',
    name: 'Cerámica',
    description: 'Cerámica artística que sigue tradiciones que han existido por siglos en la región. Desde utensilios funcionales hasta piezas decorativas con diseños incas, cada artículo es único y hecho a mano.',
    imageClass: 'bg-yellow-100',
    bannerImage: '/assets/jbl_soundbox_image.png'
  },
  'moda': {
    id: 'moda',
    name: 'Moda Andina',
    description: 'Prendas contemporáneas con toques tradicionales que fusionan lo moderno con las técnicas textiles ancestrales. Ropa y accesorios que llevan la estética andina a la moda actual.',
    imageClass: 'bg-indigo-100',
    bannerImage: '/assets/samsung_s23phone_image.png'
  },
  'decoracion': {
    id: 'decoracion',
    name: 'Decoración',
    description: 'Artículos decorativos para el hogar que traen la riqueza cultural de los Andes a cualquier espacio. Desde tapices hasta lámparas y elementos decorativos inspirados en la cultura local.',
    imageClass: 'bg-pink-100',
    bannerImage: '/assets/sony_airbuds_image.png'
  }
};

// Productos de ejemplo ordenados por categoría (en una app real esto vendría de una API)
const getProductsByCategory = (categoryId) => {
  const productsMap = {
    'artesania': [
      {
        id: 101,
        name: "Cerámica artesanal Inca",
        price: 120.00,
        category: "Artesanía",
        seller: "ArteCusco",
        rating: 5.0,
        reviewCount: 18,
        image: "/assets/cannon_camera_image.png"
      },
      {
        id: 102,
        name: "Retablo ayacuchano",
        price: 85.50,
        category: "Artesanía",
        seller: "TallerAndes",
        rating: 4.7,
        reviewCount: 12,
        image: "/assets/bose_headphone_image.png"
      },
      {
        id: 103,
        name: "Mate burilado decorativo",
        price: 45.00,
        category: "Artesanía",
        seller: "ArtesanosPeru",
        rating: 4.5,
        reviewCount: 8,
        image: "/assets/jbl_soundbox_image.png"
      },
      {
        id: 104,
        name: "Figura de piedra de Huamanga",
        price: 67.90,
        category: "Artesanía",
        seller: "ArteCusco",
        rating: 4.8,
        reviewCount: 15,
        image: "/assets/sony_airbuds_image.png"
      },
      {
        id: 105,
        name: "Máscara decorativa andina",
        price: 58.00,
        category: "Artesanía",
        seller: "TallerAndes",
        rating: 4.6,
        reviewCount: 9,
        image: "/assets/venu_watch_image.png"
      },
      {
        id: 106,
        name: "Réplica de Intihuatana",
        price: 75.50,
        category: "Artesanía",
        seller: "ArtesanosPeru",
        rating: 4.9,
        reviewCount: 21,
        image: "/assets/projector_image.png"
      }
    ],
    'textiles': [
      {
        id: 201,
        name: "Chal de alpaca trenzado",
        price: 89.99,
        category: "Textiles",
        seller: "Textiles Andinos",
        rating: 4.5,
        reviewCount: 27,
        image: "/assets/macbook_image.png"
      },
      {
        id: 202,
        name: "Poncho tradicional de lana",
        price: 125.00,
        category: "Textiles",
        seller: "TejePerú",
        rating: 4.8,
        reviewCount: 16,
        image: "/assets/header_playstation_image.png"
      },
      {
        id: 203,
        name: "Tapiz de pared hecho a mano",
        price: 150.00,
        category: "Textiles",
        seller: "Textiles Andinos",
        rating: 5.0,
        reviewCount: 11,
        image: "/assets/md_controller_image.png"
      },
      {
        id: 204,
        name: "Guantes de alpaca baby",
        price: 35.00,
        category: "Textiles",
        seller: "TejePerú",
        rating: 4.7,
        reviewCount: 9,
        image: "/assets/sm_controller_image.png"
      },
      {
        id: 205,
        name: "Bufanda de lana de alpaca",
        price: 48.90,
        category: "Textiles",
        seller: "Textiles Andinos",
        rating: 4.6,
        reviewCount: 14,
        image: "/assets/playstation_image.png"
      }
    ],
    'alimentos': [
      {
        id: 301,
        name: "Café orgánico de altura",
        price: 35.50,
        category: "Alimentos",
        seller: "Café Qosqo",
        rating: 4.8,
        reviewCount: 42,
        image: "/assets/venu_watch_image.png"
      },
      {
        id: 302,
        name: "Chocolate artesanal 72% cacao",
        price: 25.00,
        category: "Alimentos",
        seller: "ChocolArte",
        rating: 4.9,
        reviewCount: 38,
        image: "/assets/projector_image.png"
      },
      {
        id: 303,
        name: "Miel de abeja andina",
        price: 28.50,
        category: "Alimentos",
        seller: "Orgánicos Cusco",
        rating: 4.7,
        reviewCount: 22,
        image: "/assets/apple_earphone_image.png"
      },
      {
        id: 304,
        name: "Mermelada de aguaymanto",
        price: 18.90,
        category: "Alimentos",
        seller: "Café Qosqo",
        rating: 4.6,
        reviewCount: 17,
        image: "/assets/cannon_camera_image.png"
      }
    ],
    'turismo': [
      {
        id: 401,
        name: "Tour Valle Sagrado",
        price: 150.00,
        category: "Turismo",
        seller: "Andean Tours",
        rating: 4.9,
        reviewCount: 73,
        image: "/assets/jbl_soundbox_image.png"
      },
      {
        id: 402,
        name: "Experiencia gastronómica local",
        price: 85.00,
        category: "Turismo",
        seller: "Culinary Cusco",
        rating: 5.0,
        reviewCount: 48,
        image: "/assets/asus_laptop_image.png"
      },
      {
        id: 403,
        name: "Tour textil en comunidad",
        price: 120.00,
        category: "Turismo",
        seller: "Andean Tours",
        rating: 4.8,
        reviewCount: 32,
        image: "/assets/samsung_s23phone_image.png"
      }
    ],
    'joyeria': [
      {
        id: 501,
        name: "Collar de plata con piedra turquesa",
        price: 135.00,
        category: "Joyería",
        seller: "Joyas Andinas",
        rating: 4.7,
        reviewCount: 19,
        image: "/assets/bose_headphone_image.png"
      },
      {
        id: 502,
        name: "Aretes de plata con diseño inca",
        price: 65.00,
        category: "Joyería",
        seller: "QoriQolqe",
        rating: 4.9,
        reviewCount: 24,
        image: "/assets/sony_airbuds_image.png"
      }
    ],
    'ceramica': [
      {
        id: 601,
        name: "Jarrón decorativo inca",
        price: 89.00,
        category: "Cerámica",
        seller: "Ceramistas Cusco",
        rating: 4.8,
        reviewCount: 15,
        image: "/assets/header_macbook_image.png"
      }
    ],
    'moda': [
      {
        id: 701,
        name: "Chaleco con bordados andinos",
        price: 110.00,
        category: "Moda Andina",
        seller: "Andean Design",
        rating: 4.6,
        reviewCount: 12,
        image: "/assets/girl_with_headphone_image.png"
      }
    ],
    'decoracion': [
      {
        id: 801,
        name: "Cuadro artesanal de Machu Picchu",
        price: 85.00,
        category: "Decoración",
        seller: "DecorAndes",
        rating: 4.7,
        reviewCount: 11,
        image: "/assets/venu_watch_image.png"
      }
    ]
  };

  return productsMap[categoryId] || [];
};

export default function CategoryPage({ params }) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('relevancia');
  const [viewMode, setViewMode] = useState('grid');
  
  // Calcular valores mínimos y máximos para filtrar por precio
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  // Resolver los parámetros usando React.use
  const resolvedParams = React.use(params);
  const categoryId = resolvedParams.id;

  useEffect(() => {
    // En una app real, estos datos vendrían de una API basada en el ID de la categoría
    const categoryInfo = categoriesData[categoryId];
    const categoryProducts = getProductsByCategory(categoryId);
    
    // Simular carga de datos
    const timer = setTimeout(() => {
      setCategory(categoryInfo || null);
      setProducts(categoryProducts || []);
      setLoading(false);

      // Establecer rango de precios basado en los productos
      if (categoryProducts && categoryProducts.length > 0) {
        const prices = categoryProducts.map(product => product.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [categoryId]);

  // Renderizar estrellas para la calificación de manera optimizada
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

  // Ordenar productos según el filtro seleccionado
  const sortProducts = (products) => {
    switch (selectedFilter) {
      case 'precio-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'precio-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'relevancia':
      default:
        return products; // Asumimos que los productos ya vienen ordenados por relevancia
    }
  };

  // Aplicar filtros de precio
  const filteredProducts = sortProducts(products).filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Si la categoría no existe
  if (!loading && !category) {
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
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
                <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
                <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
                <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <div className="mb-4 relative pt-1">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
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
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Vendedor</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...new Set(products.map(product => product.seller))].map(seller => (
                    <div key={seller} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`seller-${seller.toLowerCase().replace(/\s+/g, '-')}`}
                        className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <label 
                        htmlFor={`seller-${seller.toLowerCase().replace(/\s+/g, '-')}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-amber-600"
                      >
                        {seller}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full bg-amber-100 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-medium text-sm">
                Aplicar filtros
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
                      onChange={(e) => setSelectedFilter(e.target.value)}
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
                  onClick={() => setPriceRange([minPrice, maxPrice])}
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
                          <span className="font-bold text-amber-700">S/ {product.price.toFixed(2)}</span>
                          <button 
                            className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
                            aria-label="Añadir al carrito"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                          </button>
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
                            <span className="font-bold text-lg text-amber-700">S/ {product.price.toFixed(2)}</span>
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
                  </Link>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button className="p-2 rounded-l-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="py-2 px-4 border-t border-b border-gray-300 bg-amber-100 text-amber-700 font-medium">1</button>
                  <button className="py-2 px-4 border-t border-b border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                  <button className="p-2 rounded-r-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
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