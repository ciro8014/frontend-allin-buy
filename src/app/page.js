'use client';

import React from 'react';
import Link from 'next/link';
import { BoxIcon, ParcelIcon, LocationIcon, ArrowRightIcon, StarIcon, PlaceholderImage } from '../components/common/Icons';

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
      imageClass: 'bg-amber-50'
    },
    {
      id: 2,
      name: 'Cerámica artesanal Inca',
      price: 120.00,
      category: 'Artesanía',
      seller: 'ArteCusco',
      rating: 5.0,
      reviewCount: 18,
      imageClass: 'bg-blue-50'
    },
    {
      id: 3,
      name: 'Café orgánico de altura',
      price: 35.50,
      category: 'Alimentos',
      seller: 'Café Qosqo',
      rating: 4.8,
      reviewCount: 42,
      imageClass: 'bg-green-50'
    },
    {
      id: 4,
      name: 'Tour Valle Sagrado',
      price: 150.00,
      category: 'Turismo',
      seller: 'Andean Tours',
      rating: 4.9,
      reviewCount: 73,
      imageClass: 'bg-purple-50'
    },
  ];

  // Renderizar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? '' : 'opacity-30'}>
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-400 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Conectando Cusco a través del comercio local</h1>
            <p className="text-lg mb-8">
              Descubre productos únicos elaborados por emprendedores cusqueños y apoya la economía local.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/products" 
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
              >
                Explorar productos
              </Link>
              <Link 
                href="/(auth)/register" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Registrarse
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative h-80">
            <div className="absolute inset-0 bg-white/10 rounded-lg">
              <PlaceholderImage 
                name="Productos Artesanales de Cusco"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Categorías Destacadas</h2>
          <p className="text-gray-600 text-center mb-10">Explora los diferentes tipos de productos y servicios ofrecidos por emprendedores de Cusco</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className={`h-40 ${category.imageClass} flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-gray-400 opacity-50">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <span className="text-amber-600 text-sm font-medium flex items-center">
                      Ver productos
                      <span className="ml-2">
                        <ArrowRightIcon />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Productos Destacados</h2>
          <p className="text-gray-600 text-center mb-10">Descubre los productos más populares de nuestros emprendedores</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
                  <div className={`h-48 ${product.imageClass} flex items-center justify-center`}>
                    <PlaceholderImage 
                      name={product.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-amber-600 font-medium">{product.category}</span>
                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-amber-700">S/ {product.price.toFixed(2)}</span>
                      <button className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/products" 
              className="inline-block px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">¿Por qué comprar en Allin Buy?</h2>
          <p className="text-gray-600 text-center mb-12">Compra con confianza y apoya a emprendedores locales</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                <BoxIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3">Productos Auténticos</h3>
              <p className="text-gray-600">
                Todos nuestros productos son elaborados por artesanos y emprendedores cusqueños, garantizando autenticidad y calidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                <ParcelIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3">Envíos Seguros</h3>
              <p className="text-gray-600">
                Ofrecemos envíos a todo el Perú con seguimiento en tiempo real y embalaje seguro para proteger tus compras.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                <LocationIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apoyo Local</h3>
              <p className="text-gray-600">
                Al comprar en Allin Buy, contribuyes directamente al desarrollo económico de las comunidades cusqueñas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action for Vendors */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Eres emprendedor en Cusco?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y lleva tu negocio al siguiente nivel. 
            Conecta con clientes de todo el país y haz crecer tu emprendimiento.
          </p>
          <Link 
            href="/vendor/register" 
            className="inline-block px-8 py-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition shadow-md"
          >
            Registra tu negocio
          </Link>
        </div>
      </section>
    </main>
  );
}
