'use client';

import React, { useState, useEffect } from 'react';
import { usuariosAPI } from '../../../../services/api';
import DashboardStats from '../../../components/vendor/DashboardStats';
import RecentOrders from '../../../components/vendor/RecentOrders';
import ProductsOverview from '../../../components/vendor/ProductsOverview';
import VendorProfile from '../../../components/vendor/VendorProfile';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { VendorGuard } from '../../../components/auth/AuthGuard';

export default function VendorDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener usuario actual
      const user = usuariosAPI.getCurrentUser();
      if (!user) {
        setError('Debes iniciar sesión para acceder al dashboard');
        return;
      }

      setCurrentUser(user);

      // Simular datos del dashboard (en producción vendría de la API)
      const mockDashboardData = {
        stats: {
          totalVentas: 15420.50,
          ventasEsteMes: 3250.75,
          totalProductos: 24,
          productosActivos: 22,
          pedidosRecientes: 18,
          pedidosPendientes: 3,
          calificacionPromedio: 4.8,
          totalResenas: 156
        },
        recentOrders: [
          {
            id: 1,
            numero: 'PED-20250622-001',
            cliente: 'María García',
            fecha: '2025-06-22',
            total: 125.50,
            estado: 'pendiente',
            productos: ['Chal de alpaca', 'Gorro de lana']
          },
          {
            id: 2,
            numero: 'PED-20250621-045',
            cliente: 'Carlos Ruiz',
            fecha: '2025-06-21',
            total: 89.99,
            estado: 'enviado',
            productos: ['Poncho tradicional']
          },
          {
            id: 3,
            numero: 'PED-20250621-032',
            cliente: 'Ana López',
            fecha: '2025-06-21',
            total: 45.00,
            estado: 'entregado',
            productos: ['Bufanda de alpaca']
          }
        ],
        topProducts: [
          {
            id: 1,
            nombre: 'Chal de alpaca trenzado',
            imagen: '/assets/macbook_image.png',
            ventas: 35,
            ingresos: 3149.65,
            stock: 8
          },
          {
            id: 2,
            nombre: 'Poncho tradicional',
            imagen: '/assets/header_playstation_image.png',
            ventas: 22,
            ingresos: 2750.00,
            stock: 12
          },
          {
            id: 3,
            nombre: 'Gorro de lana',
            imagen: '/assets/bose_headphone_image.png',
            ventas: 18,
            ingresos: 1080.00,
            stock: 25
          }
        ]
      };

      setDashboardData(mockDashboardData);
    } catch (error) {
      console.error('Error cargando dashboard:', error);
      setError('Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando dashboard..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
          <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de acceso</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <VendorGuard>
    <div className="min-h-screen bg-gray-50">
      {/* Header del Dashboard */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard del Vendedor</h1>
              <p className="text-gray-600">
                Bienvenido, {currentUser?.nombre} {currentUser?.apellido}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString()}
              </span>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
                Ver tienda
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pedidos
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Perfil
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido del Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardStats stats={dashboardData.stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentOrders orders={dashboardData.recentOrders} />
              <ProductsOverview products={dashboardData.topProducts} />
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductsOverview products={dashboardData.topProducts} isFullView={true} />
        )}

        {activeTab === 'orders' && (
          <RecentOrders orders={dashboardData.recentOrders} isFullView={true} />
        )}

        {activeTab === 'profile' && (
          <VendorProfile user={currentUser} />
        )}
      </div>
    </div>
    </VendorGuard>
  );
}