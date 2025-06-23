// src/app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { productosAPI, categoriasAPI, carritoAPI } from '../../services/api';
import { useAuth } from '../contexts/AuthContext';
import TestConnection from '../components/TestConection';

// Importar componentes modulares
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BenefitsSection from '../components/home/BenefitsSection';
import VendorCTA from '../components/home/VendorCTA';
import ErrorMessage from '../components/home/ErrorMessage';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  // Estados para datos dinámicos
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Cargando datos desde la API...');
      
      // Cargar categorías y productos en paralelo
      const [categoriasResponse, productosResponse] = await Promise.all([
        categoriasAPI.getDestacadas(),
        productosAPI.getDestacados()
      ]);

      console.log('📦 Respuesta categorías:', categoriasResponse);
      console.log('🛍️ Respuesta productos:', productosResponse);

      // Verificar respuestas y actualizar estados
      if (categoriasResponse.success) {
        setCategories(categoriasResponse.data || []);
        console.log('✅ Categorías cargadas:', categoriasResponse.data?.length || 0);
      } else {
        throw new Error('Error cargando categorías: ' + categoriasResponse.error);
      }

      if (productosResponse.success) {
        setFeaturedProducts(productosResponse.data || []);
        console.log('✅ Productos cargados:', productosResponse.data?.length || 0);
      } else {
        throw new Error('Error cargando productos: ' + productosResponse.error);
      }
      
    } catch (err) {
      console.error('❌ Error cargando datos:', err);
      setError('Error al cargar los datos: ' + err.message);
      
      // Datos de fallback si falla la API
      console.log('🔄 Cargando datos de fallback...');
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

  // Función para reintentar cargar datos
  const retryLoad = () => {
    setError(null);
    cargarDatos();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Mostrar mensaje de error si hay problemas con la API */}
      <ErrorMessage message={error} onRetry={retryLoad} />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection 
        categories={categories} 
        loading={loading} 
      />

      {/* Featured Products */}
      <FeaturedProducts 
        products={featuredProducts} 
        loading={loading}
      />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Call to Action for Vendors */}
      <VendorCTA />

      {/* Sección de estadísticas */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Únete a la Comunidad Allin Buy</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sé parte del movimiento que está transformando el comercio local en Cusco
          </p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">
                {loading ? '...' : featuredProducts.length * 125}+
              </div>
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

      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>API: {process.env.NEXT_PUBLIC_API_URL}</div>
          <div>Usuario: {isAuthenticated ? user?.nombre : 'No autenticado'}</div>
          <div>Categorías: {categories.length}</div>
          <div>Productos: {featuredProducts.length}</div>
          <div>Estado: {loading ? 'Cargando...' : error ? 'Error' : 'OK'}</div>
        </div>
      )}

      {process.env.NODE_ENV === 'development' && <TestConnection />}
    </main>
  );
}