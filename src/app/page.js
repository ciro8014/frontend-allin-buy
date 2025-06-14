'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '../components/common/Icons';
import { productosAPI, categoriasAPI } from '../../services/api';

export default function Home() {
  // Estados para datos dinámicos
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías y productos en paralelo
        const [categoriasResponse, productosResponse] = await Promise.all([
          categoriasAPI.getDestacadas(),
          productosAPI.getDestacados()
        ]);

        // Actualizar estados
        setCategories(categoriasResponse.data || []);
        setFeaturedProducts(productosResponse.data || []);
        
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar los datos. Mostrando datos de ejemplo.');
        
        // Datos de fallback si falla la API
        setCategories([
          {
            id: 'artesania',
            name: 'Artesanía',
            description: 'Piezas únicas elaboradas por artesanos locales',
            imageClass: 'bg-amber-100',
            icon: '🏺',
            productCount: 45
          },
          {
            id: 'textiles',
            name: 'Textiles',
            description: 'Tejidos tradicionales con técnicas ancestrales',
            imageClass: 'bg-blue-100',
            icon: '🧶',
            productCount: 32
          },
          {
            id: 'alimentos',
            name: 'Alimentos',
            description: 'Productos orgánicos y tradicionales de la región',
            imageClass: 'bg-green-100',
            icon: '🌿',
            productCount: 28
          },
          {
            id: 'turismo',
            name: 'Turismo',
            description: 'Experiencias auténticas con emprendedores locales',
            imageClass: 'bg-purple-100',
            icon: '⛰️',
            productCount: 18
          },
        ]);

        setFeaturedProducts([
          {
            id: 1,
            name: 'Chal de alpaca trenzado',
            price: 89.99,
            oldPrice: 120.00,
            category: 'Textiles',
            seller: 'Textiles Andinos',
            rating: 4.5,
            reviewCount: 27,
            imageClass: 'bg-amber-50',
            image: '/assets/macbook_image.png',
            discount: 25,
            isNew: false
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
            image: '/assets/cannon_camera_image.png',
            discount: 0,
            isNew: true
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
            image: '/assets/venu_watch_image.png',
            discount: 0,
            isNew: false
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
            image: '/assets/jbl_soundbox_image.png',
            discount: 0,
            isNew: false
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Función para manejar añadir al carrito
  const handleAddToCart = async (productId) => {
    try {
      // TODO: Implementar con carrito real cuando tengas autenticación
      console.log('Añadir al carrito:', productId);
      alert(`Producto ${productId} añadido al carrito (Demo)`);
      
      // Aquí iría la llamada real a la API:
      // const userId = getCurrentUserId(); // Función para obtener ID del usuario logueado
      // await carritoAPI.addItem(userId, productId, 1);
    } catch (error) {
      console.error('Error añadiendo al carrito:', error);
      alert('Error al añadir al carrito');
    }
  };

  // Renderizar estrellas para la calificación
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conectando Cusco a través del comercio local
            </h1>
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

      {/* Mensaje de error si hay problemas con la API */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

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

          {loading ? (
            // Skeleton loading para categorías
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                        {category.icon || category.name.charAt(0)}
                      </span>
                      {category.productCount && (
                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-800 shadow-sm">
                          {category.productCount} productos
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-xl mb-2 text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                      <span className="text-amber-600 font-medium flex items-center">
                        Ver productos
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </span>
                    </div>
                    <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
              Descubre los productos más populares de nuestros emprendedores
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            // Skeleton loading para productos
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <Link key={product.id} href={`/productos/${product.id}`} className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl">
                  <div 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1.5 h-full flex flex-col"
                    style={{animationDelay: `${index * 120}ms`, animation: 'fadeInUp 0.6s ease-out forwards'}}
                  >
                    <div className={`h-52 ${product.imageClass || 'bg-gray-50'} relative`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/5 group-hover:opacity-0 transition-opacity"></div>
                      <Image 
                        src={product.image || '/assets/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        width={220}
                        height={200}
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.discount > 0 && (
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            -{product.discount}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            Nuevo
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        {product.seller}
                      </p>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex mr-2 text-amber-400">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviewCount} reseñas)
                        </span>
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-bold text-lg text-amber-700">
                            S/ {product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && product.oldPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              S/ {product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product.id);
                          }}
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
          )}

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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
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
            <div className="bg-white group relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
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
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white group relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Envíos Seguros</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ofrecemos envíos a todo el Perú con seguimiento en tiempo real y embalaje seguro para proteger tus compras.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white group relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-50 hover:border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="m22 12-3-3 3-3" stroke="currentColor" strokeWidth="2"/>
                      <path d="m19 12h-9.5" stroke="currentColor" strokeWidth="2"/>
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
        </div>
      </section>

      {/* Call to Action for Vendors */}
      <section className="py-20 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ¿Eres Emprendedor Cusqueño?
              </span>
            </h2>
            
            <p className="text-lg text-amber-800 mb-10 max-w-2xl mx-auto leading-relaxed">
              Conecta con clientes a nivel nacional y muestra tus productos en nuestra plataforma digital. 
              <span className="block mt-2 font-medium">¡Impulsa tus ventas hoy mismo!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/register?type=vendor" 
                className="inline-block px-8 py-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg 
                          font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                          shadow-lg active:scale-95"
              >
                🛍️ Registrar mi negocio
              </Link>
              
              <Link 
                href="/info/vendedores" 
                className="inline-block px-8 py-4 bg-white text-amber-700 rounded-lg 
                          font-semibold text-lg hover:shadow-lg border border-amber-200
                          hover:bg-amber-50 transition-all duration-300"
              >
                📋 Más información
              </Link>
            </div>
            
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Adicional */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Únete a la Comunidad Allin Buy</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sé parte del movimiento que está transformando el comercio local en Cusco
          </p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">500+</div>
              <div className="text-sm text-gray-400">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">150+</div>
              <div className="text-sm text-gray-400">Emprendedores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">2000+</div>
              <div className="text-sm text-gray-400">Clientes Felices</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Estilos CSS adicionales para las animaciones
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}