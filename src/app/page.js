'use client';

import React from 'react';
import Link from 'next/link';
import { BoxIcon, ParcelIcon, LocationIcon, ArrowRightIcon, StarIcon, PlaceholderImage } from '../components/common/Icons';
import Image from 'next/image';

export default function Home() {
  // Datos de ejemplo para las categorías
  const categories = [
    {
      id: 'artesania',
      name: 'Artesanía',
      description: 'Piezas únicas elaboradas por artesanos locales',
      imageClass: 'bg-amber-100'
    },
    {
      id: 'textiles',
      name: 'Textiles',
      description: 'Tejidos tradicionales con técnicas ancestrales',
      imageClass: 'bg-blue-100'
    },
    {
      id: 'alimentos',
      name: 'Alimentos',
      description: 'Productos orgánicos y tradicionales de la región',
      imageClass: 'bg-green-100'
    },
    {
      id: 'turismo',
      name: 'Turismo',
      description: 'Experiencias auténticas con emprendedores locales',
      imageClass: 'bg-purple-100'
    },
  ];

  // Datos de ejemplo para productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Chal de alpaca trenzado',
      price: 89.99,
      category: 'Textiles',
      seller: 'Textiles Andinos',
      rating: 4.5,
      reviewCount: 27,
      imageClass: 'bg-amber-50',
      image: '/assets/macbook_image.png'
    },
    {
      id: 2,
      name: 'Cerámica artesanal Inca',
      price: 120.00,
      category: 'Artesanía',
      seller: 'ArteCusco',
      rating: 5.0,
      reviewCount: 18,
      imageClass: 'bg-blue-50',
      image: '/assets/cannon_camera_image.png'
    },
    {
      id: 3,
      name: 'Café orgánico de altura',
      price: 35.50,
      category: 'Alimentos',
      seller: 'Café Qosqo',
      rating: 4.8,
      reviewCount: 42,
      imageClass: 'bg-green-50',
      image: '/assets/venu_watch_image.png'
    },
    {
      id: 4,
      name: 'Tour Valle Sagrado',
      price: 150.00,
      category: 'Turismo',
      seller: 'Andean Tours',
      rating: 4.9,
      reviewCount: 73,
      imageClass: 'bg-purple-50',
      image: '/assets/jbl_soundbox_image.png'
    },
  ];

  // Renderizar estrellas para la calificación de manera optimizada
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Conectando Cusco a través del comercio local</h1>
            <p className="text-lg mb-8">
              Descubre productos únicos elaborados por emprendedores cusqueños y apoya la economía local.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/productos" 
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
              >
                Explorar productos
              </Link>
              <Link 
                href="/register" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Registrarse
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative h-80">
            <div className="absolute inset-0 bg-white/20 rounded-lg">
              <Image 
                src="/assets/banner.jpg"
                alt="Productos Artesanales de Cusco"
                className="w-full h-full rounded-lg object-contain p-4"
                width={608}
                height={320}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              style={{animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease forwards'}}
            >
              <div className={`h-48 ${category.imageClass} flex items-center justify-center relative overflow-hidden group-hover:bg-opacity-90 transition-all duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <span className="text-5xl font-bold text-gray-600 opacity-70 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            {category.name.charAt(0)}
                </span>
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

            {/* Featured Products */}
        <section className="py-16 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Productos Destacados</h2>
              <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
                Descubre los productos más populares de nuestros emprendedores
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <Link key={product.id} href={`/productos/${product.id}`} className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl">
              <div 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1.5 h-full flex flex-col"
            style={{animationDelay: `${index * 120}ms`, animation: 'fadeInUp 0.6s ease-out forwards'}}
              >
            <div className={`h-52 ${product.imageClass} relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/5 group-hover:opacity-0 transition-opacity"></div>
              <Image 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                width={220}
                height={200}
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
              Popular
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">{product.category}</span>
              <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {product.seller}
              </p>
              <div className="flex items-center mb-4">
                <div className="flex mr-2 text-amber-400">
              {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-500">({product.reviewCount} reseñas)</span>
              </div>
              <div className="mt-auto flex justify-between items-center">
                <span className="font-bold text-lg text-amber-700">S/ {product.price.toFixed(2)}</span>
                <button 
              aria-label="Agregar al carrito"
              className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors duration-300 transform hover:scale-110 shadow-sm hover:shadow"
                >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
                </button>
              </div>
            </div>
            <div className="h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-300 ease-out"></div>
              </div>
            </Link>
          ))}
            </div>

            <div className="mt-14 text-center">
          <Link 
            href="/productos" 
            className="inline-flex items-center px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300 hover:shadow group"
          >
            Ver todos los productos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              ¿Por qué comprar en Allin Buy?
            </h2>
            <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
              Compra con confianza y apoya a emprendedores locales
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 9V20H21V9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Productos Auténticos</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros productos son elaborados por artesanos y emprendedores cusqueños, garantizando autenticidad y calidad.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L3 10V21H21V10L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M16 11H8V13H16V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M12 15V17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Envíos Seguros</h3>
              <p className="text-gray-600 leading-relaxed">
                Ofrecemos envíos a todo el Perú con seguimiento en tiempo real y embalaje seguro para proteger tus compras.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 22V20C20 17.7909 18.2091 16 16 16H8C5.79086 16 4 17.7909 4 20V22" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Apoyo Local</h3>
              <p className="text-gray-600 leading-relaxed">
                Al comprar en Allin Buy, contribuyes directamente al desarrollo económico de las comunidades cusqueñas.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Call to Action for Vendors */}
        <section className="py-20 bg-gradient-to-b from-amber-50 to-amber-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Emprendedores Cusqueños
              </span>
            </h2>
            
            <p className="text-lg text-amber-800 mb-10 max-w-2xl mx-auto leading-relaxed">
              Conecta con clientes a nivel nacional y muestra tus productos en nuestra plataforma digital. 
              <span className="block mt-2 font-medium">¡Impulsa tus ventas hoy mismo!</span>
            </p>
            
            <Link 
              href="/register?type=vendor" 
              className="inline-block px-8 py-3.5 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-lg 
                        font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 
                        shadow-md active:scale-95"
            >
              🛍️ Registrar mi negocio
            </Link>
            
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-amber-300 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </section>
    </main>
  );
}
